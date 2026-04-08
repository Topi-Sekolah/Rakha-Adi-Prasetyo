import React, { useState, useEffect } from "react"; // Langkah 1: Import Hooks
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Langkah 2: Pindahkan Data Statis ke luar/atas komponen (Data Awal)
const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
];

const Home = () => {
  // Langkah 2: Inisialisasi State
  const [historyData, setHistoryData] = useState(initialHistory); // State untuk Riwayat
  const [isCheckedIn, setIsCheckedIn] = useState(false); // State untuk Status Tombol
  const [currentTime, setCurrentTime] = useState('Memuat jam...'); // State untuk Jam

  // Langkah 3: useEffect untuk Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    }, 1000);

    // Cleanup: Matikan timer jika layar ditutup
    return () => clearInterval(timer);
  }, []);

  // Langkah 4: Logika Tombol Check-In
  const handleCheckIn = () => {
    if (isCheckedIn) {
      Alert.alert("Perhatian", "Anda sudah melakukan Check In untuk kelas ini.");
      return;
    }

    // 1. Buat data presensi baru
    const newAttendance = {
      id: Date.now().toString(),
      course: "Mobile Programming",
      date: new Date().toLocaleDateString('id-ID'),
      status: "Present"
    };

    // 2. Masukkan data ke urutan paling atas
    setHistoryData([newAttendance, ...historyData]);

    // 3. Kunci tombol
    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  // Menghitung present & absent (diambil dari historyData yang baru)
  const presentCount = historyData.filter(item => item.status === "Present").length;
  const absentCount = historyData.filter(item => item.status === "Absent").length;

  const renderItem = ({ item }) => (
    <View style={styles.Item}>
      <View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <MaterialIcons
          name={item.status === "Present" ? "check-circle" : "cancel"}
          size={20}
          color={item.status === "Present" ? "green" : "red"}
        />
        <Text style={[item.status === "Present" ? styles.present : styles.absent]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  // Langkah 5: Update UI
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header dengan Jam Digital */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* STUDENT CARD */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <View>
            <Text style={styles.name}>Rakha Adi Prasetyo</Text>
            <Text>NIM : 0320240062</Text>
            <Text>Class : Informatika-2A</Text>
          </View>
        </View>

        {/* TODAY CLASS */}
        <View style={styles.classcard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {/* Tombol dengan Kondisi (Langkah 5) */}
          <TouchableOpacity 
            style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.subtitle}>Attendance Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.presentText}>Present : {presentCount}</Text>
            <Text style={styles.absentText}>Absent : {absentCount}</Text>
          </View>
        </View>

        {/* HISTORY */}
        <View style={styles.classcard}>
            <Text style={styles.subtitle}>Attendance History</Text>
            <FlatList
            data={historyData} // Gunakan historyData dari State
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20, paddingBottom: 40 },
  // Langkah 6: Tambahan Styling
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  clockText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    fontVariant: ['tabular-nums'],
  },
  buttonActive: { backgroundColor: "#007AFF" },
  buttonDisabled: { backgroundColor: "#ABC4FF" },
  
  title: { fontSize: 24, fontWeight: "bold" },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 15, borderRadius: 10, marginBottom: 20 },
  icon: { marginRight: 15, width: 60, height: 60, borderRadius: 30, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
  classcard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  button: { marginTop: 10, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  summary: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  Item: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#ffffff", borderRadius: 10, marginBottom: 8 },
  course: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 14, color: "gray" },
  statusContainer: { flexDirection: "row", alignItems: "center", gap: 5 },
  presentText: { color: "green", fontWeight: "bold" },
  absentText: { color: "red", fontWeight: "bold" },
  present: { color: "green", fontWeight: "bold" },
  absent: { color: "red", fontWeight: "bold" },
});