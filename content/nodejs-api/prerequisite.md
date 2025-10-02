# Installasi Prerequisite

## Windows
1. Install Node.js (LTS) dari [nodejs.org](https://nodejs.org/)
2. Install Git dari [git-scm.com](https://git-scm.com/)
3. Install database (pilih salah satu):
   - **MySQL**: Download dari [mysql.com](https://dev.mysql.com/downloads/installer/)
   - **PostgreSQL**: Download dari [postgresql.org](https://www.postgresql.org/download/windows/)
   - **SQLite**: Otomatis terinstall dengan Sequelize
4. Install Postman atau Thunder Client untuk testing API
5. Opsional: Install VS Code dengan extension Node.js

## Mac
1. Install Node.js via Homebrew: `brew install node`
2. Install Git: `brew install git`
3. Install database:
   - **MySQL**: `brew install mysql`
   - **PostgreSQL**: `brew install postgresql`
4. Install Postman atau gunakan Thunder Client di VS Code

## Linux (Ubuntu/Debian)
1. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```
2. Install Git: `sudo apt install git`
3. Install database:
   - **MySQL**: `sudo apt install mysql-server`
   - **PostgreSQL**: `sudo apt install postgresql postgresql-contrib`
4. Install curl untuk testing: `sudo apt install curl`

## Verifikasi Instalasi
```bash
node --version
npm --version
git --version
```