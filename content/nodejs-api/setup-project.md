# Setup Project Awal

## Membuat Project Baru

### 1. Inisialisasi Project
```bash
mkdir my-api-project
cd my-api-project
npm init -y
```

### 2. Install Dependencies Utama
```bash
# Core dependencies
npm install express sequelize

# Database drivers (pilih sesuai database)
npm install mysql2        # untuk MySQL
npm install pg pg-hstore  # untuk PostgreSQL
npm install sqlite3       # untuk SQLite

# Utility dependencies
npm install dotenv cors helmet morgan
npm install bcryptjs jsonwebtoken
npm install express-validator
```

### 3. Install Development Dependencies
```bash
npm install --save-dev nodemon sequelize-cli
```

### 4. Setup Scripts di package.json
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:seed": "npx sequelize-cli db:seed:all",
    "db:reset": "npx sequelize-cli db:migrate:undo:all && npm run db:migrate && npm run db:seed"
  }
}
```

### 5. Struktur Folder Project
```
my-api-project/
├── app.js              # Entry point
├── config/
│   └── database.js     # Konfigurasi database
├── controllers/        # Business logic
├── middleware/         # Custom middleware
├── models/            # Database models
├── routes/            # API routes
├── migrations/        # Database migrations
├── seeders/          # Database seeders
├── utils/            # Helper functions
├── .env              # Environment variables
├── .gitignore        # Git ignore file
└── package.json      # Project configuration
```

### 6. Setup Environment Variables
Buat file `.env`:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=my_api_db
DB_USER=root
DB_PASS=password
JWT_SECRET=your-secret-key
```

### 7. Setup .gitignore
```
node_modules/
.env
*.log
dist/
build/
.DS_Store
```