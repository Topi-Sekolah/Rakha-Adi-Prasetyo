import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View, Text, SafeAreaView, StyleSheet, TouchableOpacity,
  ScrollView, FlatList, Alert, TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Absent " },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
];

const Home = () => {
  const [historyData, setHistoryData] = useState(initialHistory);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('Memuat jam...');
  
  // State untuk catatan dan referensi untuk input
  const [note, setNote] = useState('');
  const noteInputRef = useRef(null);

  // useMemo untuk menghitung statistik kehadiran secara efisien
  const attendanceStats = useMemo(() => {
    console.log("Menghitung ulang statistik kehadiran...");
    const presentCount = historyData.filter(item => item.status === 'Present').length;
    const absentCount = historyData.filter(item => item.status === 'Absent').length;
    return { totalPresent: presentCount, totalAbsent: absentCount };
  }, [historyData]);

  // useEffect untuk memperbarui jam setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Logika Check-In dengan validasi catatan menggunakan useRef
  const handleCheckIn = () => {
    if (isCheckedIn) return;

    if (note.trim() === '') {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
      noteInputRef.current.focus();
      return;
    }

    const newAttendance = {
      id: Date.now().toString(),
      course: "Mobile Programming",
      date: new Date().toLocaleDateString('id-ID'),
      status: "Present",
      note: note
    };

    setHistoryData([newAttendance, ...historyData]);
    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  // Render item untuk daftar riwayat
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* Profil Section */}
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

        {/* Today's Class Section */}
        <View style={styles.classcard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {!isCheckedIn && (
            <TextInput
              ref={noteInputRef}
              style={styles.inputCatatan}
              placeholder="Tulis catatan (cth: Hadir lab)"
              value={note}
              onChangeText={setNote}
            />
          )}

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

        {/* Statistik Section */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{attendanceStats.totalPresent}</Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: 'red' }]}>{attendanceStats.totalAbsent}</Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.classcard}>
            <Text style={styles.subtitle}>Attendance History</Text>
            <FlatList
              data={historyData}
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
  },
  buttonActive: { backgroundColor: "#007AFF" },
  buttonDisabled: { backgroundColor: "#ABC4FF" },
  title: { fontSize: 24, fontWeight: "bold" },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 15, borderRadius: 10, marginBottom: 20 },
  icon: { marginRight: 15, width: 60, height: 60, borderRadius: 30, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
  classcard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  button: { marginTop: 15, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  Item: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#ffffff", borderRadius: 10, marginBottom: 8 },
  course: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 14, color: "gray" },
  statusContainer: { flexDirection: "row", alignItems: "center", gap: 5 },
  present: { color: "green", fontWeight: "bold" },
  absent: { color: "red", fontWeight: "bold" },
  inputCatatan: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
});