import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react"
import {  View, StyleSheet, Text, ScrollView, Dimensions  } from 'react-native';
import * as Location from 'expo-location'

const {width:SCREEN_WIDTH} = Dimensions.get("window")

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [location,setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
    setCity(location[0].city)
  };
  useEffect(()=>{
    ask();
  },[]);
  return (
    <View style = {styles.container}>
      <View style = {styles.city}>
        <Text style={styles.cityName}>
          {city}
        </Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle = {styles.weather}>
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
    width: SCREEN_WIDTH,
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

