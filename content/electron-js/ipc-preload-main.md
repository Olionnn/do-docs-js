# Pemahaman IPC dan Preload dan Main
- **Main Process**: Jalankan di Node.js, kontrol window.
- **Renderer Process**: HTML/CSS/JS, seperti web app.
- **Preload Script**: Bridge aman antara main dan renderer.
- **IPC**: Komunikasi antar process via `ipcMain` dan `ipcRenderer`.