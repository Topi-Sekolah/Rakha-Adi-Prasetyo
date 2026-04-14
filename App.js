import Home from './pages/Home';



import React from 'react';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* 2. Panggil komponen Home di sini */}
      <Home />
    </>
  );
}








// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.topContainer}>
//         <View style={styles.red}></View>
//         <View style={styles.blue}></View>
//         <View style={styles.green}></View>
//         <View style={styles.yellow}></View>
//       </View>

//       <View style={styles.middle}></View>

//       <View style={styles.bottom}></View>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   topContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     height: 200,
//     backgroundColor: "#dfeeee"
//   },

//   red: {
//     width: 40,
//     height: 40,
//     backgroundColor: "red"
//   },

//   blue: {
//     width: 131,
//     height: 60,
//     backgroundColor: "blue"
//   },

//   green: {
//     width: 120,
//     height: 120,
//     backgroundColor: "green"
//   },

//   yellow: {
//     width: 120,
//     height: 160,
//     backgroundColor: "orange"
//   },

//   middle: {
//     height: 10,
//     backgroundColor: "#dfeeee"
//   },

//   bottom: {
//     flex: 1,
//     backgroundColor: "gray"
//   }
// });
