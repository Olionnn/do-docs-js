# Instalasi Awal Membuat Project

## Menggunakan Vite
1. Install Vite: `npm create vite@latest my-react-app -- --template react-ts`.
2. Pilih template React (TypeScript).
3. Cd ke folder: `cd my-react-app`.
4. Install dependencies: `npm install`.
5. Jalankan: `npm run dev`.

## Install Tailwind CSS
1. Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`.
2. Init: `npx tailwindcss init -p`.
3. Konfigurasi `tailwind.config.js` dan `index.css`.
4. Tambahkan class Tailwind di komponen.

## Add React Router DOM
1. Install: `npm install react-router-dom`.
2. Install types: `npm install -D @types/react-router-dom`.
3. Setup routing di `App.tsx` dengan `<BrowserRouter>`, `<Routes>`, `<Route>`.