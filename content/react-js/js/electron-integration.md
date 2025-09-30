# Integrasi Electron Agar React JS Bisa Jadi Desktop App
1. Install Electron: `npm install --save-dev electron`.
2. Buat `main.js` untuk Electron main process.
3. Update `package.json` dengan script `"electron": "electron ."` dan `"electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\""`.
4. Jalankan: `npm run electron-dev`.