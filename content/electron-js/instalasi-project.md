# Instalasi Project

## Pure Electron
1. Buat folder: `mkdir my-electron-app && cd my-electron-app`.
2. Init npm: `npm init -y`.
3. Install Electron: `npm install --save-dev electron`.
4. Buat `main.js`: kode dasar Electron.
5. Update `package.json`: `"main": "main.js"`, script `"start": "electron ."`.
6. Jalankan: `npm start`.

## Dengan Vite
1. Buat project Vite: `npm create vite@latest my-electron-app -- --template vanilla`.
2. Install Electron: `npm install --save-dev electron`.
3. Buat `main.js` dan update scripts.
4. Jalankan: `npm run dev` untuk Vite, `npm run electron` untuk Electron.

## Dengan Vite dan React
1. Buat project Vite React: `npm create vite@latest my-electron-app -- --template react`.
2. Install Electron: `npm install --save-dev electron`.
3. Buat `main.js` yang load `index.html` dari Vite.
4. Jalankan: `npm run dev` untuk Vite, `npm run electron` untuk Electron.