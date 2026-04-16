import React, {
  useState,
  useEffect,
  useMemo,
  useRef } from "react";
import { View, Text, SafeAreaView, StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const HomeScreen = () => {
  // --- LOGIKA STATE & HOOKS ---
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('Memuat jam...');
  const [note, setNote] = useState('');
  const noteInputRef = useRef(null);

  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn) return Alert.alert("Perhatian", "Anda sudah Check In.");
    
    if (note.trim() === '') {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
      noteInputRef.current.focus();
      return;
    }

    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  // --- UI RENDER ---
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

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

        <View style={styles.classCard}>
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

        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: 'green' }]}>{attendanceStats.totalPresent}</Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: 'red' }]}>{attendanceStats.totalAbsent}</Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- DEFINISI STYLES (Agar tidak error styles is not defined) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  clockText: { fontSize: 16, color: '#666' },
  card: { flexDirection: 'row', padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 20, alignItems: 'center', elevation: 2 },
  icon: { marginRight: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  classCard: { padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  inputCatatan: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 10, backgroundColor: '#fff' },
  button: { marginTop: 15, padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonActive: { backgroundColor: '#0056A0' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  statsCard: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 1 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: 'gray' },
});

export default HomeScreen;