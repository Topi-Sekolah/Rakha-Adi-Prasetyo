import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Platform, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// ---------------------------------------------------------
// 2. CLASS COMPONENT (Stateful & Lifecycle) -> Functional Component
// Bertugas mengelola memori dan logika
// ---------------------------------------------------------

export default function App() {
  // A. INISIALISASI STATE
  // 1. MENGGANTI this.state MENJADI useState
  const [kodeKelas, setKodeKelas] = useState('');
  const [isHadir, setIsHadir] = useState(false);
  const [waktuAbsen, setWaktuAbsen] = useState('');
  const [jamRealtime, setJamRealtime] = useState('Memuat jam...');

  // Data statis tidak butuh state
  const studentData = {
    nama: 'Rakha Adi Prasetyo',
    nim: '0320240062',
    prodi: 'MI - Politeknik Astra',
  };

  // 2. MENGGABUNGKAN MOUNTING & UNMOUNTING
  useEffect(() => {
    console.log('[MOUNTING] Aplikasi Dibuka (via useEffect). Jam menyala.');

    // Timer berjalan setiap detik
    const intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setJamRealtime(waktu); 
    }, 1000);

    // CLEANUP FUNCTION (Berfungsi layaknya componentWillUnmount)
    return () => {
      console.log('[UNMOUNTING] Aplikasi Ditutup. Membersihkan interval jam!');
      clearInterval(intervalJam);
    };
  }, []); // <-- ARRAY KOSONG: Dipanggil 1x di awal

  // 3. MENGGANTI componentDidUpdate
  useEffect(() => {
    // Hanya bereaksi jika state isHadir berubah menjadi true
    if (isHadir === true) {
      console.log(`[UPDATING] Sukses presensi pada pukul: ${waktuAbsen}`);
    }
  }, [isHadir, waktuAbsen]); // <-- ARRAY DEPENDENCIES: Pantau variabel ini

  // 4. EVENT HANDLER (Tanpa 'this')
  const handleAbsen = () => {
    if (kodeKelas.trim() === '') {
      alert('Masukkan kode kelas terlebih dahulu!');
      return;
    }

    // Ubah state secara langsung dengan fungsi setter-nya
    setIsHadir(true);
    setWaktuAbsen(jamRealtime);
  };

  // 5. LANGSUNG RETURN UI (Hapus tulisan render() { ... })
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER DENGAN JAM DIGITAL (Terhubung ke State) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sistem Presensi</Text>
          {/* Panggil state langsung tanpa this.state */}
          <Text style={styles.clockText}>{jamRealtime}</Text>
        </View>

        {/* Panggil variabel langsung tanpa this.studentData */}
        <KartuProfil student={studentData} />

        {/* SEKSI PRESENSI (CONDITIONAL RENDERING) */}
        <View style={styles.actionSection}>
          {isHadir ? (
            <View style={styles.successCard}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                style={styles.successIcon}
              />
              <Text style={styles.successText}>Presensi Berhasil!</Text>
              <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
              <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>
            </View>
          ) : (
            <View style={styles.inputCard}>
              <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
              <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

              <TextInput
                style={styles.input}
                placeholder="Contoh: MI-03"
                value={kodeKelas}
                // Jauh lebih ringkas dari sebelumnya!
                onChangeText={setKodeKelas}
                autoCapitalize="characters"
              />

              {/* Panggil fungsi handle tanpa this */}
              <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Komponen Pembantu (Stateless)
const KartuProfil = ({ student }) => (
  <View style={styles.profileCard}>
    <Text style={styles.profileName}>{student.nama}</Text>
    <Text style={styles.profileDetail}>{student.nim}</Text>
    <Text style={styles.profileDetail}>{student.prodi}</Text>
  </View>
);

// Style tetap sama seperti instruksi Anda (TIDAK BERUBAH)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 20, backgroundColor: '#0056A0', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  clockText: { color: '#FFF', fontSize: 24, marginTop: 5 },
  profileCard: { margin: 20, padding: 20, backgroundColor: '#FFF', borderRadius: 10, elevation: 3 },
  profileName: { fontSize: 20, fontWeight: 'bold' },
  profileDetail: { fontSize: 14, color: '#666' },
  actionSection: { paddingHorizontal: 20 },
  inputCard: { padding: 20, backgroundColor: '#FFF', borderRadius: 10, elevation: 3 },
  instructionText: { fontSize: 16, fontWeight: '600' },
  noteText: { fontSize: 12, color: '#888', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 15 },
  buttonSubmit: { backgroundColor: '#0056A0', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  successCard: { padding: 20, backgroundColor: '#E8F5E9', borderRadius: 10, alignItems: 'center' },
  successIcon: { width: 60, height: 60, marginBottom: 10 },
  successText: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  timeText: { fontSize: 14, color: '#444' },
  codeText: { fontSize: 12, color: '#666', marginTop: 5 }
});