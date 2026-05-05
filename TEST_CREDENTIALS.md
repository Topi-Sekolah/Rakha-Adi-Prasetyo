# Test Credentials

Gunakan kredensial berikut untuk testing login:

## User Test 1
- **NIM:** 0320240062
- **Password:** 123456
- **Prodi:** Manajemen Informatika

## Catatan Backend

Pastikan backend Java Spring Boot sudah berjalan dengan:
- Database SQLite sudah di-seed dengan data user
- Server berjalan di port 9000
- Endpoint `/api/user/login` sudah tersedia

## Cara Test

1. Jalankan backend Java Spring Boot
2. Cek IP address komputer: `ipconfig` (Windows) atau `ifconfig` (Mac/Linux)
3. Update IP di `LoginScreen.js`
4. Jalankan aplikasi React Native
5. Login dengan kredensial di atas
