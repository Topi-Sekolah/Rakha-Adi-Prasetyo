import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const Home = () => {

  // menghitung present & absent
  const presentCount = history.filter(item => item.status === "Present").length;
  const absentCount = history.filter(item => item.status === "Absent").length;

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
        <Text
          style={[
            item.status === "Present"
              ? styles.present
              : styles.absent
          ]}
        >
          {item.status}
        </Text>
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>AttendanceApp</Text>

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

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        </View>

        {/* UPCOMING CLASS */}
        <View style={styles.classcard}>
          <Text style={styles.subtitle}>Upcoming Class</Text>
          <Text>Database System</Text>
          <Text>10:30 - 12:00</Text>
          <Text>Room 204</Text>
        </View>

        {/* ATTENDANCE SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.subtitle}>Attendance Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.present}>Present : {presentCount}</Text>
            <Text style={styles.absent}>Absent : {absentCount}</Text>
          </View>
        </View>

        {/* HISTORY */}
        <Text style={styles.subtitle}>Attendance History</Text>

        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const history = [
  { id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Absent" },
  { id: "3", course: "Operating System", date: "2026-03-03", status: "Present" },
  { id: "4", course: "Computer Network", date: "2026-03-04", status: "Present" },
  { id: "5", course: "Artificial Intelligence", date: "2026-03-05", status: "Present" },
  { id: "6", course: "Web Programming", date: "2026-03-06", status: "Absent" },
  { id: "7", course: "Data Mining", date: "2026-03-07", status: "Present" },
  { id: "8", course: "Software Engineering", date: "2026-03-08", status: "Present" },
  { id: "9", course: "Computer Graphics", date: "2026-03-09", status: "Absent" },
  { id: "10", course: "Human Computer Interaction", date: "2026-03-10", status: "Present" },
  { id: "11", course: "Cyber Security", date: "2026-03-11", status: "Present" },
  { id: "12", course: "Algorithm Design", date: "2026-03-12", status: "Absent" },
  { id: "13", course: "Cloud Computing", date: "2026-03-13", status: "Present" },
  { id: "14", course: "Big Data", date: "2026-03-14", status: "Present" },
  { id: "15", course: "Parallel Computing", date: "2026-03-15", status: "Absent" },
  { id: "16", course: "Game Development", date: "2026-03-16", status: "Present" },
  { id: "17", course: "Mobile Programming", date: "2026-03-17", status: "Present" },
  { id: "18", course: "Database System", date: "2026-03-18", status: "Present" },
  { id: "19", course: "Operating System", date: "2026-03-19", status: "Absent" },
  { id: "20", course: "Computer Network", date: "2026-03-20", status: "Present" },
  { id: "21", course: "Artificial Intelligence", date: "2026-03-21", status: "Present" },
  { id: "22", course: "Web Programming", date: "2026-03-22", status: "Absent" },
  { id: "23", course: "Software Engineering", date: "2026-03-23", status: "Present" },
  { id: "24", course: "Cloud Computing", date: "2026-03-24", status: "Present" },
];

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classcard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 8,
  },
  course: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  present: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 5,
  },
  absent: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
  },
});