/* global marked, hljs */
const $ = (sel) => document.querySelector(sel);
const sidebarEl = $('#sidebar');
const contentEl = $('#content');
const breadcrumbEl = $('#breadcrumb');
const metaInfoEl = $('#metaInfo');
const searchInput = $('#searchInput');

let MANIFEST = null;
let FLAT_INDEX = []; // {title, path, hierarchyText}
let CURRENT_PATH = null;

async function loadManifest() {
	const res = await fetch('./manifest.json', { cache: 'no-store' });
	if (!res.ok) throw new Error('Gagal memuat manifest.json');
	MANIFEST = await res.json();
	metaInfoEl.textContent = `Generated: ${new Date(MANIFEST.generatedAt).toLocaleString()}`;
}

function buildSidebar(tree, parentEl, depth = 0) {
	const ul = document.createElement('ul');
	ul.className = depth === 0 ? 'space-y-1' : 'pl-3 space-y-1 border-l border-white/10 ml-2';

	tree.forEach(node => {
		const li = document.createElement('li');
		if (node.type === 'dir') {
			const summary = document.createElement('div');
			summary.className = 'flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer';
			summary.innerHTML = `<span>📁</span><span>${node.title}</span>`;
			const childContainer = document.createElement('div');
			childContainer.className = 'mt-1 hidden';
			summary.addEventListener('click', () => {
				childContainer.classList.toggle('hidden');
			});
			li.appendChild(summary);
			if (node.children?.length) {
				childContainer.appendChild(buildSidebar(node.children, childContainer, depth + 1));
			}
			li.appendChild(childContainer);
			ul.appendChild(li);
		} else {
			const a = document.createElement('a');
			a.href = `#${node.path}`;
			a.className = 'block text-sm text-slate-300 hover:text-white px-2 py-1 rounded';
			a.textContent = `📄 ${node.title}`;
			a.dataset.docPath = node.path;
			li.appendChild(a);
			ul.appendChild(li);
		}
	});

	if (parentEl) parentEl.appendChild(ul);
	return ul;
}

function flattenIndex(tree, trail = []) {
	for (const node of tree) {
		if (node.type === 'dir') {
			flattenIndex(node.children ?? [], [...trail, node.title]);
		} else {
			FLAT_INDEX.push({
				title: node.title,
				path: node.path,
				hierarchyText: [...trail, node.title].join(' / ').toLowerCase()
			});
		}
	}
}

function highlightActiveLink() {
	sidebarEl.querySelectorAll('a').forEach(a => {
		a.classList.remove('active-link');
		if (a.dataset.docPath === CURRENT_PATH) a.classList.add('active-link');
	});
}

async function renderMarkdown(mdPath) {
	const res = await fetch(mdPath);
	if (!res.ok) {
		contentEl.innerHTML = `<div class="text-red-400">Tidak bisa memuat: <code>${mdPath}</code></div>`;
		return;
	}
	const text = await res.text();
	const html = marked.parse(text, { mangle: false, headerIds: true });
	contentEl.innerHTML = html;

	// syntax highlight
	contentEl.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));

	// heading anchors breadcrumb
	const crumbs = mdPath.replace(/^\/?content\//, '').split('/');
	breadcrumbEl.innerHTML = crumbs.map((c, i) => {
		if (!c) return '';
		const isLast = i === crumbs.length - 1;
		const label = c.replace(/\.md$/i, '');
		return `<span class="${isLast ? 'text-slate-200' : 'text-slate-400'}">${label}</span>${isLast ? '' : ' / '}`;
	}).join('');
}

function router() {
	const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
	CURRENT_PATH = hash || MANIFEST.defaultDoc;
	highlightActiveLink();
	renderMarkdown(CURRENT_PATH);
}

function setupSearch() {
	searchInput.addEventListener('input', (e) => {
		const q = e.target.value.trim().toLowerCase();
		sidebarEl.querySelectorAll('a').forEach(a => a.parentElement.classList.remove('hidden'));
		if (!q) return;
		sidebarEl.querySelectorAll('a').forEach(a => {
			const p = a.dataset.docPath;
			const meta = FLAT_INDEX.find(x => x.path === p);
			const hay = (a.textContent + ' ' + (meta?.hierarchyText || '')).toLowerCase();
			if (!hay.includes(q)) a.parentElement.classList.add('hidden');
		});
	});
}

(async function init() {
	await loadManifest();
	sidebarEl.innerHTML = '';
	buildSidebar(MANIFEST.tree, sidebarEl);
	FLAT_INDEX = [];
	flattenIndex(MANIFEST.tree);
	setupSearch();

	window.addEventListener('hashchange', router);
	router(); // initial
})();

