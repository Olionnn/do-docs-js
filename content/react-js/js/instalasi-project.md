# Instalasi Project React.js (JavaScript)

## 🎯 Pilih Build Tool

### Opsi 1: Vite (Recommended - Lebih Cepat)
Vite adalah build tool modern yang sangat cepat untuk development.

### Opsi 2: Create React App (CRA)
Tool resmi dari Facebook untuk membuat React app.

### Opsi 3: Next.js
Framework React untuk production dengan SSR/SSG.

## 🚀 Instalasi dengan Vite

### 1. Buat Project Baru
```bash
# Menggunakan npm
npm create vite@latest my-react-app -- --template react

# Atau menggunakan yarn
yarn create vite my-react-app --template react

# Atau menggunakan pnpm
pnpm create vite my-react-app --template react
```

### 2. Masuk ke Folder Project
```bash
cd my-react-app
```

### 3. Install Dependencies
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 4. Jalankan Development Server
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Server akan berjalan di `http://localhost:5173/`

## 🛠️ Instalasi dengan Create React App

### 1. Buat Project
```bash
npx create-react-app my-react-app
cd my-react-app
```

### 2. Jalankan Development Server
```bash
npm start
```

Server akan berjalan di `http://localhost:3000/`

## ⚡ Instalasi dengan Next.js

### 1. Buat Project
```bash
npx create-next-app@latest my-next-app
# Pilih: JavaScript, No untuk TypeScript, Yes untuk App Router
```

### 2. Jalankan Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000/`

## 🎨 Setup Styling (Tailwind CSS)

### 1. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
```

### 2. Inisialisasi Tailwind
```bash
npx tailwindcss init -p
```

### 3. Konfigurasi `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Tambahkan Tailwind ke CSS
Edit `src/index.css` (untuk Vite/CRA) atau `app/globals.css` (untuk Next.js):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Test Tailwind
Edit `src/App.jsx` atau `app/page.js`:

```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello, Tailwind CSS! 🎉
      </h1>
    </div>
  );
}
```

## 🧭 Setup Routing (React Router)

### 1. Install React Router DOM
```bash
npm install react-router-dom
```

### 2. Setup Router di `src/App.jsx` (Vite/CRA)
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/about" className="hover:text-blue-200">About</Link>
            <Link to="/contact" className="hover:text-blue-200">Contact</Link>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

### 3. Buat Komponen Halaman
Buat folder `src/pages/` dan file:

`src/pages/Home.jsx`:
```jsx
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p>Welcome to our React application!</p>
    </div>
  );
}
```

`src/pages/About.jsx`:
```jsx
export default function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>Learn more about our company.</p>
    </div>
  );
}
```

`src/pages/Contact.jsx`:
```jsx
export default function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>Get in touch with us.</p>
    </div>
  );
}
```

## 📁 Struktur Project Akhir

```
my-react-app/
├── public/
│   ├── favicon.ico
│   └── index.html (hanya untuk CRA)
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js (hanya untuk Vite)
```

## 🔧 Scripts yang Tersedia

### Vite
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Create React App
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
npm run eject    # Eject from CRA (irreversible)
```

### Next.js
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
```

## 🚨 Troubleshooting

### Port sudah digunakan
```bash
# Vite/CRA
npm run dev -- --port 3001

# Next.js
npm run dev -- -p 3001
```

### Dependencies conflict
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build gagal
```bash
# Clear cache
npm run clean-install  # atau
yarn cache clean && yarn install
```

## 🎯 Selanjutnya

Setelah project berhasil dibuat, lanjut ke:
- [Struktur Folder](./struktur-folder.md)
- [Start Project](./start-project.md)
- [Build Web](./build-web.md)