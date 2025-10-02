# Tutorial Lengkap Git

## 📋 Daftar Isi
- [Konfigurasi Awal](#konfigurasi-awal)
- [Perintah Dasar Git](#perintah-dasar-git)
- [Branching & Merging](#branching--merging)
- [File .gitignore](#file-gitignore)
- [Menyelesaikan Konflik](#menyelesaikan-konflik)
- [Best Practices](#best-practices)
- [Apa yang Harus Dihindari](#apa-yang-harus-dihindari)
- [Troubleshooting](#troubleshooting)

## ⚙️ Konfigurasi Awal

### Setup Identitas
```bash
# Set nama dan email (wajib)
git config --global user.name "Nama Lengkap Anda"
git config --global user.email "email@domain.com"

# Cek konfigurasi
git config --list
git config user.name
git config user.email
```

### Konfigurasi Default Editor
```bash
# Menggunakan VS Code
git config --global core.editor "code --wait"

# Menggunakan Vim
git config --global core.editor vim

# Menggunakan Nano
git config --global core.editor nano
```

### Konfigurasi Lainnya
```bash
# Auto correct commands
git config --global help.autocorrect 1

# Color output
git config --global color.ui auto

# Default branch name
git config --global init.defaultBranch main

# Line ending (penting untuk Windows/Mac/Linux collaboration)
git config --global core.autocrlf input  # Linux/Mac
# git config --global core.autocrlf true  # Windows
```

## 🚀 Perintah Dasar Git

### Inisialisasi Repository
```bash
# Buat repository baru
git init

# Clone repository existing
git clone https://github.com/username/repo.git
git clone git@github.com:username/repo.git  # SSH
```

### Workflow Dasar
```bash
# Cek status file
git status

# Tambah file ke staging area
git add nama-file.txt
git add .                    # Semua file
git add *.js                 # File dengan ekstensi tertentu
git add folder/              # Folder tertentu

# Commit perubahan
git commit -m "Pesan commit yang jelas"
git commit -am "Pesan commit"  # Add + commit untuk file tracked

# Lihat history commit
git log
git log --oneline           # Compact view
git log --graph --decorate  # Dengan branch graph
```

### Remote Repository
```bash
# Tambah remote
git remote add origin https://github.com/username/repo.git

# Lihat remote
git remote -v

# Push ke remote
git push -u origin main     # Push dan set upstream
git push                    # Push ke upstream yang sudah diset

# Pull dari remote
git pull                    # Fetch + merge
git fetch                   # Hanya fetch
git merge origin/main       # Manual merge
```

## 🌿 Branching & Merging

### Branch Management
```bash
# Lihat semua branch
git branch -a

# Buat branch baru
git branch nama-branch
git checkout -b nama-branch  # Buat dan pindah sekaligus

# Pindah branch
git checkout nama-branch
git switch nama-branch       # Git v2.23+

# Hapus branch
git branch -d nama-branch    # Safe delete (sudah merge)
git branch -D nama-branch    # Force delete
```

### Merging Branches
```bash
# Merge branch ke current branch
git merge nama-branch

# Rebase (lebih clean history)
git rebase main

# Interactive rebase
git rebase -i HEAD~3        # Edit 3 commit terakhir
```

### Stashing (Simpan perubahan sementara)
```bash
# Simpan perubahan
git stash
git stash save "pesan stash"

# Lihat stash
git stash list

# Apply stash
git stash apply
git stash pop               # Apply dan hapus

# Hapus stash
git stash drop stash@{0}
git stash clear             # Hapus semua stash
```

## 📁 File .gitignore

### Struktur .gitignore
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
.nuxt/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE/Editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temporary folders
tmp/
temp/
```

### Cara Menggunakan .gitignore

#### 1. Buat File .gitignore
```bash
# Di root project
touch .gitignore
```

#### 2. Isi dengan pola file yang ingin diabaikan
```gitignore
# Contoh untuk Node.js project
node_modules/
.env
*.log
```

#### 3. Cek apa yang akan di-ignore
```bash
git check-ignore -v nama-file.txt
git status --ignored
```

#### 4. Force add file yang sudah di-ignore
```bash
git add -f nama-file.txt
```

### Pola .gitignore yang Umum

#### File spesifik
```
nama-file.txt
folder/nama-file.js
```

#### Wildcard
```
*.log          # Semua file .log
temp/*         # Semua file di folder temp/
temp/**/*.txt  # Semua .txt di subfolder temp/
```

#### Negasi (kecuali)
```
!important.txt  # Kecuali file ini
```

#### Folder
```
node_modules/
build/
.cache/
```

## ⚠️ Menyelesaikan Konflik

### Saat Merge Conflict Terjadi
```bash
# Git akan menampilkan pesan seperti:
# CONFLICT (content): Merge conflict in nama-file.txt
# Automatic merge failed; fix conflicts and then commit the result.

# Cek file yang konflik
git status
```

### Cara Menyelesaikan Konflik

#### 1. Buka file yang konflik
Git akan menandai bagian konflik dengan:
```diff
<<<<<<< HEAD
Kode dari branch saat ini
=======
Kode dari branch yang di-merge
>>>>>>> nama-branch
```

#### 2. Edit file dan pilih kode yang benar
```javascript
// Pilih salah satu atau gabungkan:
<<<<<<< HEAD
const apiUrl = 'http://localhost:3000';
=======
const apiUrl = process.env.API_URL || 'http://localhost:3000';
>>>>>>> feature/api-config
```

#### 3. Hapus marker konflik
```javascript
// Hasil akhir:
const apiUrl = process.env.API_URL || 'http://localhost:3000';
```

#### 4. Add dan commit
```bash
git add nama-file.txt
git commit -m "Resolve merge conflict in nama-file.txt"
```

### Tools untuk Resolve Konflik

#### Menggunakan VS Code
```bash
# Install extension: GitLens atau Git Graph
# VS Code akan menampilkan UI untuk resolve konflik
```

#### Command line tools
```bash
# Gunakan mergetool
git mergetool

# Konfigurasi mergetool
git config --global merge.tool vimdiff
git config --global mergetool.vimdiff.cmd 'vimdiff $MERGED $LOCAL $BASE $REMOTE'
```

### Strategi Menghindari Konflik

#### 1. Pull sebelum push
```bash
git pull --rebase origin main
```

#### 2. Commit sering dengan pesan jelas
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login bug"
```

#### 3. Gunakan feature branches
```bash
git checkout -b feature/user-login
# Work on feature
git checkout main
git pull
git checkout feature/user-login
git rebase main
```

## ✅ Best Practices

### Commit Messages
```bash
# Format: type(scope): description
git commit -m "feat(auth): add login functionality"
git commit -m "fix(ui): resolve button alignment issue"
git commit -m "docs(readme): update installation guide"

# Types: feat, fix, docs, style, refactor, test, chore
```

### Branch Naming
```bash
# Feature branches
feature/add-user-profile
feature/implement-payment

# Bug fixes
bugfix/fix-login-error
hotfix/critical-security-patch

# Release branches
release/v1.2.0
```

### Workflow Git Flow
```bash
# Development workflow
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
# Work on feature
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-feature
# Create Pull Request
```

## 🚫 Apa yang Harus Dihindari

### ❌ Jangan Commit File Besar
```bash
# Hindari commit file > 100MB
# Gunakan .gitignore untuk file binary besar

# Jika sudah ter-commit, hapus dari history
git rm --cached large-file.zip
git commit -m "Remove large file"
```

### ❌ Jangan Force Push ke Branch Utama
```bash
# HINDARI: git push -f origin main
# Gunakan force push HANYA di branch pribadi
git push -f origin feature/my-branch
```

### ❌ Jangan Commit Credentials
```bash
# JANGAN commit file dengan password/API keys
# Gunakan environment variables
# Tambahkan ke .gitignore

# Jika sudah ter-commit:
git rm --cached config/secrets.json
git commit -m "Remove sensitive data"
```

### ❌ Jangan Rewrite History Public
```bash
# Jangan rebase commit yang sudah di-push
# Buat commit baru untuk perbaikan
git revert HEAD~1  # Buat commit baru yang undo perubahan
```

### ❌ File yang Tidak Perlu di Git
```gitignore
# Logs
*.log
logs/

# Dependencies
node_modules/
vendor/

# Build artifacts
dist/
build/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
```

## 🔧 Troubleshooting

### Reset Perubahan
```bash
# Unstage file (kembali ke modified)
git reset HEAD nama-file.txt

# Discard perubahan (kembali ke last commit)
git checkout -- nama-file.txt
git restore nama-file.txt  # Git v2.23+

# Reset ke commit tertentu
git reset --hard HEAD~1    # Hapus 1 commit terakhir
git reset --soft HEAD~1    # Keep changes di staging
```

### Mengembalikan File yang Terhapus
```bash
# Lihat file yang terhapus
git log --diff-filter=D --summary

# Restore file
git checkout HEAD~1 -- nama-file.txt
git restore --source=HEAD~1 nama-file.txt
```

### Fix "Detached HEAD" State
```bash
# Saat berada di detached HEAD
git checkout main  # Kembali ke branch
# Atau buat branch baru dari commit tersebut
git checkout -b new-branch
```

### Mengubah Commit Terakhir
```bash
# Ubah pesan commit
git commit --amend -m "New commit message"

# Tambah file ke commit terakhir
git add forgotten-file.txt
git commit --amend --no-edit
```

### Membersihkan Repository
```bash
# Hapus file untracked
git clean -fd

# Hapus file ignored juga
git clean -fdx

# Optimalkan repository
git gc
git prune
```

### Mengatasi "Repository Corrupt"
```bash
# Backup dulu
cp -r .git .git-backup

# Coba repair
git fsck
git reflog

# Jika gagal, clone ulang
git clone <remote-url> new-repo
```

## 📚 Resources Tambahan

- [Pro Git Book](https://git-scm.com/book/en/v2) - Buku resmi Git
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Learn Git Branching](https://learngitbranching.js.org/) - Interactive tutorial
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## 🎯 Quick Reference

### Status Commands
```bash
git status          # Status file
git log             # History commit
git diff            # Perubahan
git blame file.txt  # Siapa ubah baris tertentu
```

### Branch Commands
```bash
git branch          # List branches
git checkout -b new-branch  # Create & switch
git merge branch    # Merge branch
git rebase branch   # Rebase branch
```

### Remote Commands
```bash
git remote -v       # List remotes
git push origin branch  # Push branch
git pull            # Pull changes
git fetch           # Fetch tanpa merge
```

---

**Git adalah alat yang powerful, gunakan dengan bijak! 🚀**