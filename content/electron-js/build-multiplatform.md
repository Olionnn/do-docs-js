# Cara Build ke Windows, Mac, Linux di Semua Arch
1. Install electron-builder: `npm install --save-dev electron-builder`.
2. Update `package.json` dengan konfigurasi build.
3. Jalankan: `npx electron-builder --win --mac --linux`.
4. Untuk semua arch: tambahkan `--x64 --ia32 --arm64`.