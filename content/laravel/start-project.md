# Start Project dari yang Sudah Ada
1. Clone repo: `git clone <repo-url>`.
2. Install dependencies: `composer install && npm install`.
3. Setup .env: `cp .env.example .env && php artisan key:generate`.
4. Jalankan migrations: `php artisan migrate`.
5. Jalankan: `php artisan serve` dan `npm run dev`.