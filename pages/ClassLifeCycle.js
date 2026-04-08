import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';

class TimerLifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = { detik: 0 };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({ detik: prevState.detik + 1 }));
    }, 1000);
    console.log(`[TIMER] Berjalan: ${this.state.detik + 1} detik`);
  }

  componentDidUpdate(prevProps, prevState) {
    // opsional: debug log
     console.log(`2. [UPDATING] ${prevState.detik} → ${this.state.detik} detik`);
  }

  componentWillUnmount() {
   console.log("3. [UNMOUNTING] Timer dimatikan.");
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{this.state.detik}</Text>
        <Text>Detik Berjalan</Text>
      </View>
    );
  }
}

export default class ClassLifeCycle extends Component {
  state = { tampilkanTimer: false };

  toggleTimer = () => {
    this.setState(prevState => ({ tampilkanTimer: !prevState.tampilkanTimer }));
  };

  render() {
    const SafeAreaView = View; // Use View instead for web compatibility
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Demo Lifecycle dan Timer</Text>

        <View style={styles.content}>
          {this.state.tampilkanTimer ? (
            <TimerLifecycle />
          ) : (
            <Text style={styles.infoText}>Komponen Anak Belum Lahir</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={this.state.tampilkanTimer ? 'Hancurkan Komponen' : 'Lahirkan Komponen'}
            color={this.state.tampilkanTimer ? '#D32F2F' : '#0056A0'}
            onPress={this.toggleTimer}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  content: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerBox: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    } : {
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
    }),
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 40,
    width: '80%',
  },
});