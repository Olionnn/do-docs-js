# Integrasi Electron Agar React JS Bisa Jadi Desktop App
1. Install Electron: `npm install --save-dev electron`.
2. Install types: `npm install -D @types/electron`.
3. Buat `main.ts` untuk Electron main process.
4. Update `package.json` dengan script `"electron": "electron ."` dan `"electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\""`.
5. Jalankan: `npm run electron-dev`.