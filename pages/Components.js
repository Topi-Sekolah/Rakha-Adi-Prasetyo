import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native"

// 1, class component
export class KartuClass extends Component {
  render() {
    return (
      <View style={styles.cardClass}>
        <Text style={styles.textWhite}>class component</Text>
        <Text style={styles.textWhite}>Hallo</Text>
        <Text style={styles.textWhite}>Nama saya Adi</Text>
        <Text style={styles.textWhite}>Dari Bekasi</Text>
      </View>
    );
  }
}

// 2. functional component
export const KartuFunction = () => {
  return (
    <View style={styles.cardFunction}>
      <Text style={styles.textWhite}>functional component</Text>
      <Text style={styles.textWhite}>Hallo</Text>
      <Text style={styles.textWhite}>Nama saya Adi</Text>
      <Text style={styles.textWhite}>Dari Bekasi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#fff',
    alignItems : 'center',
    justifyContent : 'center', 
    padding : 20
  },
title:{
  fontSize : 24,
  fontWeight : 'bold',
  marginBottom : 20,
  color : '#333'
},
cardClass : {
  backgroundColor : 'blue',
  padding : 15,
  borderRadius : 10,
  marginBottom : 20,
  width : '100%',
  alignItems : 'center'
},
cardFunction: {
  backgroundColor : 'green',
  padding : 20,
  borderRadius : 10,
  width : '100%',
  alignItems : 'center'
},
textWhite : {
  color : 'white',
  fontSize : 16,
  fontWeight : 'bold'
},
textSub:{
  color : 'black',
  fontSize : 18,
  marginTop : 10,
  textAlign : 'center'
}
});
