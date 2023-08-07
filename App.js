import { StatusBar } from "expo-status-bar";
import React from "react"
import {  View, StyleSheet, Text, ScrollView, Dimensions  } from 'react-native';

const {width} = Dimensions.get("window")

export default function App() {
  return (
    <View style = {styles.container}>
      <View style = {styles.city}>
        <Text style={styles.cityName}>
          Seoul
        </Text>
      </View>
      <ScrollView horizontal contentContainerStyle = {styles.weather}>
        <View style = {styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style = {styles.desc}> Sunny </Text>
        </View>
        <View style = {styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style = {styles.desc}> Sunny </Text>
        </View>
        <View style = {styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style = {styles.desc}> Sunny </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor:'tomato'
  },
  city:{
    flex:1.2, justifyContent: "center",alignItems:"center"
  },
  cityName:{
    color:"black", fontSize: 68, fontWeight: "500"
  },
  weather:{
  },
  day:{
    width: width,
    alignItems:"center"
  },
  temp:{
    fontSize: 168,
    marginTop: 50
  },
  desc:{
    marginTop: -30,
    fontSize: 60
  }
})

