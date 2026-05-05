import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator } from 'react-native';

import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import HistoryScreen from './pages/HistoryScreen';
import DetailScreen from './pages/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Membuat sub-rute Stack untuk area History
function HistoryStack() {
  return (
    <Stack.Navigator>
      {/* Layar pertama di tab history adalah daftar absensi */}
      <Stack.Screen 
        name="HistoryList" 
        component={HistoryScreen} 
        options={{ title: 'Riwayat Absensi' }}
      />
      {/* Layar kedua adalah detail (menumpuk di atas list) */}
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Detail Informasi' }}
      />
    </Stack.Navigator>
  );
}

// =============== TAB NAVIGATOR ===============
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#0056A0', headerShown: false }}>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="HistoryTab" 
        component={HistoryStack} 
        options={{
          tabBarLabel: 'Riwayat',
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

// =============== AUTH STACK ===============
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// =============== MAIN APP ===============
function MainApp() {
  const { userData, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0056A0" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userData ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

// =============== ROOT ===============
export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
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
