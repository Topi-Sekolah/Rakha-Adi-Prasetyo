# Setup Login dengan REST API Backend

## Fitur yang Ditambahkan

1. **LoginScreen.js** - Halaman login dengan form NIM dan Password
2. **AuthContext.js** - Context untuk mengelola state autentikasi
3. **Modifikasi App.js** - Navigasi berbasis status login
4. **Modifikasi HomeScreen.js** - Menampilkan data user dan tombol logout

## Struktur File

```
AttendanceApp/
├── context/
│   └── AuthContext.js          # Context untuk autentikasi
├── pages/
│   ├── LoginScreen.js          # Halaman login
│   ├── HomeScreen.js           # Halaman utama (dengan logout)
│   ├── HistoryScreen.js
│   └── DetailScreen.js
└── App.js                      # Root component dengan auth flow
```

## Cara Kerja

### 1. AuthContext
- Menyimpan data user di AsyncStorage
- Menyediakan fungsi `login()` dan `logout()`
- Mengecek status login saat aplikasi dimulai

### 2. LoginScreen
- Form input NIM dan Password
- Mengirim POST request ke backend: `http://10.9.x.x:9000/api/user/login`
- Menyimpan data user jika login berhasil

### 3. App.js
- Menampilkan LoginScreen jika user belum login
- Menampilkan TabNavigator (Home & History) jika sudah login
- Loading indicator saat mengecek status autentikasi

### 4. HomeScreen
- Menampilkan data user dari context
- Tombol logout di header
- Konfirmasi sebelum logout

## API Backend

### Endpoint Login
```
POST http://10.9.x.x:9000/api/user/login
Content-Type: application/json

Body:
{
  "nim": "0320240062",
  "password": "123456"
}

Response (Success):
{
  "message": "Data Found",
  "data": {
    "nim": "0320240062",
    "password": "123456",
    "prodi": "Manajemen Informatika"
  }
}
```

## Cara Menggunakan

1. **Install dependencies:**
   ```bash
   cd AttendanceApp
   npm install
   ```

2. **Ubah URL Backend:**
   Edit file `pages/LoginScreen.js`, ganti IP address:
   ```javascript
   const BASE_URL = "http://10.9.x.x:9000/api/user";
   ```
   Ganti `10.9.x.x` dengan IP komputer yang menjalankan backend.

3. **Jalankan aplikasi:**
   ```bash
   npm start
   ```

4. **Test Login:**
   - Buka aplikasi di Expo Go
   - Masukkan NIM dan Password
   - Jika berhasil, akan masuk ke halaman Home
   - Klik icon logout untuk keluar

## Dependencies Baru

- `@react-native-async-storage/async-storage` - Untuk menyimpan data login

## Catatan

- Data login disimpan di AsyncStorage (persistent)
- Saat aplikasi dibuka kembali, user tetap login
- Logout akan menghapus data dari AsyncStorage
- Pastikan backend sudah berjalan sebelum test login
