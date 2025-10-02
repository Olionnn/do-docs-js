# Installasi Prerequisite - Laravel

## 📋 Daftar Kebutuhan

### Software Wajib
- **PHP** (versi 8.1 atau lebih tinggi)
- **Composer** (PHP dependency manager)
- **Web Server** (Apache/Nginx) atau built-in server
- **Database** (MySQL/PostgreSQL/SQLite)

### Software Opsional
- **Node.js** (untuk frontend assets)
- **Git**
- **VS Code** dengan PHP extensions

## 🪟 Windows

### 1. Install PHP
```bash
# Download dari https://windows.php.net/
# Pilih thread-safe version
# Extract ke C:\php

# Tambahkan ke PATH environment variable
# System Properties > Environment Variables > Path > Edit
# Tambahkan: C:\php

# Verifikasi
php --version
```

### 2. Install Composer
```bash
# Download dari https://getcomposer.org/
# Jalankan installer

# Verifikasi
composer --version
```

### 3. Install XAMPP (Apache + MySQL + PHP)
```bash
# Download dari https://www.apachefriends.org/
# Install dan start Apache + MySQL

# Akses phpMyAdmin di http://localhost/phpmyadmin
```

### 4. Install Git (Opsional)
```bash
# Download dari https://git-scm.com/
git --version
```

## 🍎 Mac

### 1. Install PHP via Homebrew
```bash
# Install Homebrew jika belum ada
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP
brew install php

# Start PHP service
brew services start php

# Verifikasi
php --version
```

### 2. Install Composer
```bash
brew install composer
composer --version
```

### 3. Install Database
```bash
# MySQL
brew install mysql
brew services start mysql

# Atau PostgreSQL
brew install postgresql
brew services start postgresql
```

### 4. Install MAMP (Opsional)
```bash
# Download dari https://www.mamp.info/
# Untuk Apache + MySQL + PHP GUI
```

## 🐧 Linux (Ubuntu/Debian)

### 1. Install PHP dan Extensions
```bash
# Update package list
sudo apt update

# Install PHP dan extensions yang dibutuhkan Laravel
sudo apt install php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath

# Verifikasi
php --version
```

### 2. Install Composer
```bash
# Download installer
curl -sS https://getcomposer.org/installer | php

# Move ke global path
sudo mv composer.phar /usr/local/bin/composer

# Verifikasi
composer --version
```

### 3. Install Apache dan MySQL
```bash
# Install Apache
sudo apt install apache2
sudo systemctl start apache2
sudo systemctl enable apache2

# Install MySQL
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# Setup MySQL secure installation
sudo mysql_secure_installation
```

### 4. Konfigurasi PHP untuk Apache
```bash
# Enable PHP module
sudo a2enmod php8.1  # Sesuaikan dengan versi PHP

# Restart Apache
sudo systemctl restart apache2
```

## 🔧 Konfigurasi PHP

### Cek PHP Configuration
```bash
php -i | grep -i "configuration file"
# Akan menampilkan path php.ini
```

### Extensions yang Dibutuhkan Laravel
Pastikan extensions berikut aktif di `php.ini`:

```ini
extension=php_mbstring.dll
extension=php_openssl.dll
extension=php_pdo_mysql.dll
extension=php_tokenizer.dll
extension=php_xml.dll
extension=php_fileinfo.dll
extension=php_zip.dll
extension=php_bcmath.dll
```

### Tingkatkan PHP Limits (Opsional)
```ini
memory_limit = 256M
upload_max_filesize = 100M
post_max_size = 100M
max_execution_time = 300
```

## 🗄️ Setup Database

### MySQL
```bash
# Login ke MySQL
mysql -u root -p

# Buat database untuk Laravel
CREATE DATABASE laravel_app;
CREATE USER 'laravel_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laravel_app.* TO 'laravel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### PostgreSQL
```bash
# Login sebagai postgres user
sudo -u postgres psql

# Buat database dan user
CREATE DATABASE laravel_app;
CREATE USER laravel_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE laravel_app TO laravel_user;
\q
```

## ✅ Verifikasi Instalasi

```bash
# Cek semua komponen
php --version
composer --version

# Test Laravel installer
composer global require laravel/installer

# Buat project test
laravel new test-app
cd test-app

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Jalankan server
php artisan serve
```

## 🚨 Troubleshooting

### Composer memory limit
```bash
# Tingkatkan memory limit
php -d memory_limit=-1 composer install
```

### Permission denied
```bash
# Fix storage permissions
sudo chown -R www-data:www-data storage/
sudo chown -R www-data:www-data bootstrap/cache/
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

### PHP extension missing
```bash
# Ubuntu/Debian
sudo apt install php8.1-mbstring php8.1-xml php8.1-zip

# Restart web server
sudo systemctl restart apache2
```

### Database connection failed
```bash
# Cek MySQL service
sudo systemctl status mysql

# Cek credentials di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=laravel_user
DB_PASSWORD=password
```

## 📚 Resources Tambahan

- [Laravel Documentation](https://laravel.com/docs)
- [Composer Documentation](https://getcomposer.org/doc/)
- [PHP Manual](https://www.php.net/manual/)

## 🎯 Selanjutnya

Setelah semua prerequisite siap:
- [Instalasi Project](./instalasi-project.md)
- [Struktur Folder](./struktur-folder.md)