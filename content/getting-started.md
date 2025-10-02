# Getting Started - Panduan Awal

## 🎯 Tujuan Dokumentasi Ini

Dokumentasi ini dirancang untuk membantu developer dalam:

- **Belajar** teknologi JavaScript dari nol
- **Membangun** aplikasi full-stack dengan cepat
- **Memahami** best practices dan struktur project
- **Troubleshooting** masalah umum dalam development

## 📋 Persiapan Awal

### 1. Install Node.js (Wajib)
```bash
# Cek versi Node.js
node --version
npm --version

# Jika belum install, download dari https://nodejs.org/
```

### 2. Install Git
```bash
git --version
# Jika belum install, download dari https://git-scm.com/
```

### 3. Pelajari Git (PENTING!)
Git adalah version control system yang wajib dikuasai developer. Baca tutorial lengkapnya di:
- **[Tutorial Lengkap Git](./git/git-tutorial.md)**
- **[Best Practices Git](./git/best-practices.md)**
- **[Troubleshooting Git](./git/troubleshooting.md)**

### 3. Clone Repository Ini
```bash
git clone <repository-url>
cd do-docs-js
```

### 4. Install Dependencies
```bash
npm install
```

## 🚀 Menjalankan Dokumentasi

### Development Mode (Recommended)
```bash
npm run dev
```
Server akan berjalan di `http://localhost:8080`

### Production Build
```bash
npm run generate
npm run serve
```

## 📁 Struktur Dokumentasi

```
content/
├── README.md              # Overview semua teknologi
├── getting-started.md     # Panduan ini
├── nodejs-api/           # Backend dengan Node.js
├── react-js/             # Frontend React
├── electron-js/          # Desktop apps
├── react-native/         # Mobile apps
└── laravel/              # PHP Framework
```

## 🎓 Jalur Pembelajaran

### Untuk Pemula
1. **Node.js API** → Dasar backend development
2. **React.js** → Frontend development
3. **React Native** → Mobile development

### Untuk Developer Berpengalaman
- **Electron.js** → Desktop applications
- **Laravel** → Full-stack PHP development

### Productivity & AI Tools
- **AI Tools** → Searching techniques dan prompt engineering untuk AI coding assistants

## 🛠️ Tools yang Dibutuhkan

### Essential Tools
- **Node.js** (LTS version)
- **Git** (Version control)
- **VS Code** (Recommended editor)

### Database (Pilih salah satu)
- **MySQL** / **PostgreSQL** / **SQLite**
- **MongoDB** (untuk NoSQL)

### Testing Tools
- **Postman** / **Thunder Client** (API testing)
- **Jest** (Unit testing)

## 📖 Cara Membaca Dokumentasi

1. **Ikuti Urutan** dari prerequisite → setup → development
2. **Praktik Langsung** sambil membaca
3. **Jangan Skip** bagian prerequisite
4. **Coba Error Handling** untuk memahami troubleshooting

## ❓ Troubleshooting Umum

### Port 8080 Sudah Digunakan
```bash
# Kill process menggunakan port 8080
lsof -ti:8080 | xargs kill -9

# Atau gunakan port lain
npx http-server -p 3000
```

### Dependencies Error
```bash
# Clear cache dan reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Manifest Tidak Generate
```bash
# Regenerate manifest
npm run generate
```

## 🎯 Tips Sukses

- **Praktik Berkala** - Coding setiap hari
- **Baca Error Messages** - Error adalah guru terbaik
- **Join Community** - Diskusi dengan developer lain
- **Build Projects** - Terapkan yang dipelajari

## 📞 Bantuan

Jika mengalami kesulitan:
1. Cek dokumentasi spesifik teknologi
2. Lihat bagian troubleshooting
3. Search di Google/Stack Overflow
4. Tanyakan di forum developer

---

**Selamat belajar dan happy coding! 🚀**
