# Struktur Folder Project React.js

## 📁 Struktur Dasar Project

### Vite + React
```
my-react-app/
├── node_modules/          # Dependencies (jangan di-commit)
├── public/               # Asset statis
│   ├── favicon.ico       # Icon browser tab
│   └── index.html        # Template HTML utama
├── src/                  # Source code
│   ├── assets/          # Gambar, font, dll
│   ├── components/      # Komponen reusable
│   ├── pages/           # Halaman utama
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Helper functions
│   ├── contexts/        # React contexts
│   ├── services/        # API calls, external services
│   ├── styles/          # CSS modules, global styles
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global CSS
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies & scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

### Create React App
```
my-cra-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

## 📂 Penjelasan Detail Setiap Folder

### `public/`
Folder untuk file statis yang tidak diproses oleh build tool.

**Isi:**
- `index.html` - Template HTML utama
- `favicon.ico` - Icon browser
- `manifest.json` - PWA configuration
- `robots.txt` - SEO crawler instructions
- Gambar/logo perusahaan

**Penggunaan:**
```html
<!-- index.html -->
<link rel="icon" href="/favicon.ico" />
<link rel="manifest" href="/manifest.json" />
```

### `src/`
Folder utama untuk kode aplikasi.

#### `assets/`
```
src/assets/
├── images/
│   ├── logo.png
│   ├── hero-bg.jpg
│   └── icons/
├── fonts/
│   ├── inter.woff2
│   └── roboto.woff2
└── data/
    └── constants.js
```

#### `components/`
```
src/components/
├── common/           # Komponen reusable
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   └── Loading.jsx
├── layout/           # Layout components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── Navigation.jsx
└── forms/            # Form components
    ├── LoginForm.jsx
    ├── RegisterForm.jsx
    └── ContactForm.jsx
```

#### `pages/`
```
src/pages/
├── Home.jsx
├── About.jsx
├── Contact.jsx
├── auth/
│   ├── Login.jsx
│   └── Register.jsx
└── dashboard/
    ├── Dashboard.jsx
    ├── Profile.jsx
    └── Settings.jsx
```

#### `hooks/`
```
src/hooks/
├── useAuth.js        # Authentication hook
├── useApi.js         # API calls hook
├── useLocalStorage.js # Local storage hook
└── useDebounce.js    # Debounce hook
```

#### `utils/`
```
src/utils/
├── api.js            # API configuration
├── constants.js      # App constants
├── helpers.js        # Helper functions
├── validation.js     # Form validation
└── dateUtils.js      # Date utilities
```

#### `services/`
```
src/services/
├── authService.js    # Authentication API
├── userService.js    # User management API
├── productService.js # Product API
└── notificationService.js # Push notifications
```

#### `contexts/`
```
src/contexts/
├── AuthContext.jsx   # Authentication state
├── ThemeContext.jsx  # Theme management
└── CartContext.jsx   # Shopping cart state
```

## 🏗️ Struktur Project Skala Besar

Untuk project besar, gunakan struktur berikut:

```
src/
├── components/
│   ├── ui/           # Basic UI components (Button, Input, etc.)
│   ├── forms/        # Form components
│   ├── layout/       # Layout components
│   └── specific/     # Feature-specific components
├── pages/
│   ├── public/       # Public pages
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # Protected pages
│   └── admin/        # Admin pages
├── hooks/
├── contexts/
├── services/
├── utils/
├── types/            # TypeScript type definitions
├── constants/
├── styles/
│   ├── components/   # Component-specific styles
│   ├── pages/        # Page-specific styles
│   └── themes/       # Theme configurations
└── lib/              # Third-party library configurations
```

## 📋 File Konfigurasi

### `package.json`
```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx,ts,tsx",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx}"
  }
}
```

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### `.gitignore`
```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

## 🎯 Best Practices

### 1. Konsistensi Penamaan
- Gunakan **PascalCase** untuk komponen (`UserProfile.jsx`)
- Gunakan **camelCase** untuk file lain (`userService.js`)
- Gunakan **kebab-case** untuk folder (`user-profile/`)

### 2. Grouping berdasarkan Feature
```
src/features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── products/
└── cart/
```

### 3. Index Files
```javascript
// src/components/index.js
export { default as Button } from './Button'
export { default as Input } from './Input'
export { default as Modal } from './Modal'
```

### 4. Absolute Imports
```javascript
// ❌ Relative imports
import Button from '../../../components/Button'

// ✅ Absolute imports
import Button from '@/components/Button'
```

## 🚀 Evolusi Struktur

### Tahap Awal (Small Project)
```
src/
├── components/
├── pages/
├── utils/
└── App.jsx
```

### Tahap Pertumbuhan (Medium Project)
```
src/
├── components/
│   ├── common/
│   └── forms/
├── pages/
├── hooks/
├── services/
└── utils/
```

### Tahap Enterprise (Large Project)
```
src/
├── components/
├── features/
├── shared/
├── hooks/
├── contexts/
├── services/
├── utils/
├── types/
└── lib/
```

## 📝 Tips Organisasi

1. **Jaga konsistensi** struktur di seluruh tim
2. **Gunakan index files** untuk clean imports
3. **Pisahkan logic bisnis** dari UI components
4. **Group berdasarkan domain** bukan teknologi
5. **Dokumentasikan** struktur di README

## 🎯 Selanjutnya

- [Start Project](./start-project.md)
- [Build Web](./build-web.md)