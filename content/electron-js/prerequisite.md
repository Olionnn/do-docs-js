# Installasi Prerequisite - Electron.js

## 📋 Daftar Kebutuhan

### Software Wajib
- **Node.js** (versi 14 atau lebih tinggi)
- **npm** atau **yarn**
- **Git**

### Software Opsional
- **VS Code** dengan extension Electron
- **Python** (untuk native modules)

## 🪟 Windows

### 1. Install Node.js
```bash
# Download dari https://nodejs.org/
# Pilih versi LTS

# Verifikasi
node --version  # v14.0.0 atau lebih tinggi
npm --version
```

### 2. Install Git
```bash
# Download dari https://git-scm.com/
# Ikuti installer wizard

git --version
```

### 3. Install Windows Build Tools (untuk native modules)
```bash
npm install --global windows-build-tools
```

### 4. Install VS Code (Opsional)
```bash
# Download dari https://code.visualstudio.com/
# Install extension: Electron React
```

## 🍎 Mac

### 1. Install Node.js
```bash
# Via Homebrew
brew install node

# Atau download manual dari nodejs.org

node --version
npm --version
```

### 2. Install Git
```bash
brew install git
git --version
```

### 3. Install Xcode Command Line Tools
```bash
xcode-select --install
```

### 4. Install VS Code (Opsional)
```bash
brew install --cask visual-studio-code
```

## 🐧 Linux (Ubuntu/Debian)

### 1. Install Node.js
```bash
# Via NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

node --version
npm --version
```

### 2. Install Git
```bash
sudo apt update
sudo apt install git
git --version
```

### 3. Install Build Essentials
```bash
sudo apt install build-essential
```

### 4. Install VS Code (Opsional)
```bash
sudo snap install code --classic
```

## 🔧 Konfigurasi Environment

### Windows
```cmd
# Set environment variables jika diperlukan
set ELECTRON_IS_DEV=1
```

### Mac/Linux
```bash
# Tambahkan ke ~/.bashrc atau ~/.zshrc
export ELECTRON_IS_DEV=1
```

## ✅ Verifikasi Instalasi

```bash
# Test Electron installation
npm install -g electron
electron --version

# Test project creation
mkdir test-electron && cd test-electron
npm init -y
npm install electron --save-dev

# Buat file main.js
echo "const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});" > main.js

# Buat index.html
echo "<!DOCTYPE html><html><body><h1>Hello Electron!</h1></body></html>" > index.html

# Jalankan
npx electron .
```

## 🚨 Troubleshooting

### Build gagal di Windows
```bash
# Install Windows Build Tools
npm install --global windows-build-tools

# Atau install Visual Studio Build Tools
# Download dari Microsoft website
```

### Permission denied di Mac
```bash
# Fix permission untuk npm global
sudo chown -R $(whoami) ~/.npm
```

### Native modules gagal install
```bash
# Install Python 2.7 (untuk node-gyp)
# Windows: Download dari python.org
# Mac: brew install python@2
# Linux: sudo apt install python2.7
```

### Electron app tidak bisa dijalankan
```bash
# Cek versi Electron compatibility
npm ls electron

# Update ke versi terbaru
npm update electron
```

## 📚 Resources Tambahan

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Forge](https://www.electronforge.io/) - Build tools
- [Electron Builder](https://www.electron.build/) - Packaging

## 🎯 Selanjutnya

Setelah semua prerequisite siap:
- [Instalasi Project](./instalasi-project.md)
- [Struktur Folder](./struktur-folder.md)