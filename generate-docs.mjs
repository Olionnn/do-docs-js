import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, 'content');
const MANIFEST_PATH = path.join(ROOT, 'manifest.json');

const argWatch = process.argv.includes('--watch');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const e of entries) {
    if (e.name.startsWith('.')) continue; // skip hidden
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full).split(path.sep).join('/'); // posix
    if (e.isDirectory()) {
      files.push({
        type: 'dir',
        name: e.name,
        path: `${rel}/`,
        children: walk(full)
      });
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (ext === '.md' || ext === '.markdown') {
        files.push({
          type: 'file',
          name: e.name,
          path: `${rel}`
        });
      }
    }
  }

  // sort: dirs first, then files, alphabetic
  files.sort((a,b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name, 'en', { numeric: true });
  });

  return files;
}

function findDefaultDoc(tree) {
  // Prefer content/README.md anywhere in the tree. Otherwise return first .md found.
  let first = null;
  let readme = null;

  function traverse(nodes) {
    for (const node of nodes) {
      if (node.type === 'file') {
        if (!first) first = node.path;
        if (/(^|\/)content\/README\.md$/i.test(node.path)) readme = node.path;
      }
      if (node.children) traverse(node.children);
    }
  }

  traverse(tree);
  return readme || first || null;
}

function makeTitle(name) {
  const base = name.replace(/\.(md|markdown)$/i, '').replace(/[-_]/g, ' ');
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function attachTitles(node) {
  if (Array.isArray(node)) return node.map(attachTitles);
  const n = { ...node };
  n.title = node.type === 'dir' ? node.name : makeTitle(node.name);
  if (n.children) n.children = n.children.map(attachTitles);
  return n;
}

function generate() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    fs.writeFileSync(path.join(CONTENT_DIR, 'README.md'), '# Welcome\n\nTambahkan dokumen anda di folder **content/**.');
  }

  const tree = walk(CONTENT_DIR);
  const treeWithTitles = tree.map(attachTitles);
  const defaultDoc = findDefaultDoc(treeWithTitles);

  const manifest = {
    generatedAt: new Date().toISOString(),
    root: '/content/',
    defaultDoc: defaultDoc || '/content/README.md',
    tree: treeWithTitles
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`[docs] manifest generated → ${path.relative(ROOT, MANIFEST_PATH)}`);
}

generate();

if (argWatch) {
  console.log('[docs] watching content/ for changes…');
  const chokidar = await import('chokidar');
  const watcher = chokidar.default.watch(CONTENT_DIR, { ignoreInitial: true });
  watcher.on('all', () => {
    try { generate(); } catch (e) { console.error(e); }
  });
}
