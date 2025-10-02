# Memulai Development Project React.js

## 🚀 Menjalankan Project Baru

### 1. Setup Project
```bash
# Clone repository (jika ada)
git clone <repository-url>
cd nama-project

# Atau buat project baru
npm create vite@latest my-app -- --template react
cd my-app
```

### 2. Install Dependencies
```bash
# Install semua dependencies
npm install

# Jika menggunakan yarn
yarn install

# Jika menggunakan pnpm
pnpm install
```

### 3. Jalankan Development Server
```bash
# Menggunakan npm
npm run dev

# Menggunakan yarn
yarn dev

# Menggunakan pnpm
pnpm dev
```

**Server akan berjalan di:**
- Vite: `http://localhost:5173`
- CRA: `http://localhost:3000`
- Next.js: `http://localhost:3000`

### 4. Verifikasi Instalasi
Buka browser dan akses URL di atas. Anda akan melihat:
- Halaman welcome React
- Hot reload aktif (perubahan otomatis)
- Console browser tanpa error

## 🔧 Scripts yang Tersedia

### Development
```bash
npm run dev      # Jalankan dev server
npm run start    # Sama dengan dev (CRA)
```

### Build & Deploy
```bash
npm run build    # Build untuk production
npm run preview  # Preview production build
```

### Testing & Linting
```bash
npm run test     # Jalankan unit tests
npm run lint     # Cek kode dengan ESLint
npm run format   # Format kode dengan Prettier
```

## 📁 File yang Perlu Diketahui

### Entry Points
- `src/main.jsx` - Entry point aplikasi (Vite)
- `src/index.js` - Entry point aplikasi (CRA)
- `src/App.jsx` - Komponen root

### Konfigurasi
- `package.json` - Dependencies dan scripts
- `vite.config.js` - Konfigurasi Vite
- `tailwind.config.js` - Konfigurasi Tailwind (jika ada)

## 🎨 Membuat Komponen Pertama

### 1. Buat Komponen Sederhana
Buat file `src/components/HelloWorld.jsx`:

```jsx
import React from 'react';

function HelloWorld() {
  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Hello, React World! 🌍
      </h1>
      <p className="text-gray-700">
        Selamat datang di dunia React.js
      </p>
    </div>
  );
}

export default HelloWorld;
```

### 2. Import ke App.jsx
Edit `src/App.jsx`:

```jsx
import HelloWorld from './components/HelloWorld';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <HelloWorld />
    </div>
  );
}

export default App;
```

### 3. Lihat Hasil
Browser akan otomatis reload dan menampilkan komponen baru.

## 🔄 Hot Reload & Development

### Fitur Hot Reload
- **Perubahan otomatis** - Browser refresh otomatis saat save file
- **State preservation** - State komponen tetap terjaga
- **Error overlay** - Error ditampilkan langsung di browser

### Development Tools
- **React DevTools** - Inspect komponen React
- **Browser DevTools** - Debug JavaScript dan CSS
- **VS Code Extensions** - IntelliSense dan autocomplete

## 🚨 Troubleshooting Umum

### Port Sudah Digunakan
```bash
# Gunakan port berbeda
npm run dev -- --port 3001

# Atau kill process yang menggunakan port
lsof -ti:5173 | xargs kill -9
```

### Dependencies Error
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Gagal
```bash
# Clear cache Vite
rm -rf node_modules/.vite
npm run dev
```

### Module Not Found
```bash
# Cek import path
# Pastikan file ada di lokasi yang benar
# Gunakan absolute import jika perlu
```

## 📊 Monitoring Development

### Console Logs
```javascript
// Development logging
console.log('Component mounted');
console.log('State changed:', state);
console.log('API response:', data);
```

### Performance Monitoring
```javascript
// React DevTools Profiler
// Browser Performance tab
// Lighthouse untuk audit
```

## 🔐 Environment Variables

### Setup .env
Buat file `.env` di root project:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=My React App
VITE_DEBUG=true
```

### Menggunakan Environment Variables
```javascript
// Dalam komponen
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

## 🎯 Development Workflow

### 1. Feature Development
```bash
# Buat branch baru
git checkout -b feature/new-component

# Develop feature
# Test feature
# Commit changes
git add .
git commit -m "Add new component"

# Push dan buat PR
git push origin feature/new-component
```

### 2. Code Quality
```bash
# Jalankan linter
npm run lint

# Format kode
npm run format

# Jalankan tests
npm run test
```

### 3. Build Check
```bash
# Test production build
npm run build
npm run preview
```

## 📚 Resources Tambahan

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 🎯 Selanjutnya

- [Build Web](./build-web.md) - Build untuk production
- [Clean Project](./clean-project.md) - Optimasi project