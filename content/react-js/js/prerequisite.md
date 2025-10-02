# Installasi Prerequisite - React.js (JavaScript)

## 📋 Daftar Kebutuhan

### Software Wajib
- **Node.js** (versi 16 atau lebih tinggi)
- **npm** atau **yarn** (package manager)
- **Git** (version control)

### Software Opsional
- **VS Code** (editor recommended)
- **Browser** modern (Chrome, Firefox, Safari, Edge)

## 🪟 Windows

### 1. Install Node.js
```bash
# Download dan install dari website resmi
# Kunjungi: https://nodejs.org/
# Pilih versi LTS (Long Term Support)

# Verifikasi instalasi
node --version  # Harus menampilkan versi
npm --version   # Harus menampilkan versi
```

### 2. Install Git
```bash
# Download dari: https://git-scm.com/
# Ikuti installer wizard

# Verifikasi instalasi
git --version
```

### 3. Install VS Code (Opsional)
```bash
# Download dari: https://code.visualstudio.com/
# Install extensions:
# - ES7+ React/Redux/React-Native snippets
# - Auto Rename Tag
# - Bracket Pair Colorizer
# - Prettier - Code formatter
```

## 🍎 Mac

### 1. Install Node.js via Homebrew
```bash
# Install Homebrew jika belum ada
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verifikasi
node --version
npm --version
```

### 2. Install Git
```bash
brew install git
git --version
```

### 3. Install VS Code (Opsional)
```bash
brew install --cask visual-studio-code

# Atau download manual dari website
```

## 🐧 Linux (Ubuntu/Debian)

### 1. Install Node.js
```bash
# Menggunakan NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verifikasi
node --version
npm --version
```

### 2. Install Git
```bash
sudo apt update
sudo apt install git

git --version
```

### 3. Install VS Code (Opsional)
```bash
# Via snap
sudo snap install code --classic

# Atau via apt repository
# Ikuti panduan di: https://code.visualstudio.com/docs/setup/linux
```

## 🔧 Konfigurasi Tambahan

### Setup npm Global Packages
```bash
# Install create-react-app globally (opsional)
npm install -g create-react-app

# Install yarn (opsional)
npm install -g yarn
```

### Environment Variables (Opsional)
```bash
# Untuk development yang lebih baik
echo 'export NODE_OPTIONS="--max-old-space-size=4096"' >> ~/.bashrc
source ~/.bashrc
```

## ✅ Verifikasi Instalasi Lengkap

Jalankan command berikut untuk memastikan semua terinstall dengan benar:

```bash
# Cek versi software
node --version      # v16.0.0 atau lebih tinggi
npm --version       # 7.0.0 atau lebih tinggi
git --version       # 2.0.0 atau lebih tinggi

# Cek npm registry
npm config get registry  # https://registry.npmjs.org/

# Test instalasi dengan project sederhana
mkdir test-react && cd test-react
npm init -y
npm install react react-dom
ls node_modules    # Harus ada folder react dan react-dom
```

## 🚨 Troubleshooting

### Node.js tidak ditemukan
```bash
# Windows: Tambahkan ke PATH
# Mac/Linux: Restart terminal atau source ulang
source ~/.bashrc
```

### npm install lambat
```bash
# Gunakan registry Indonesia
npm config set registry https://registry.npmjs.org/

# Atau gunakan yarn
npm install -g yarn
```

### Permission denied pada Linux/Mac
```bash
# Gunakan sudo untuk global install
sudo npm install -g create-react-app

# Atau gunakan nvm untuk user-level install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

## 🎯 Selanjutnya

Setelah semua prerequisite terinstall, lanjut ke:
- [Instalasi Project React](./instalasi-project.md)
- [Struktur Folder Project](./struktur-folder.md)