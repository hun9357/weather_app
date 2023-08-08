import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react"
import {  View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator  } from 'react-native';
import * as Location from 'expo-location'
import {Fontisto} from '@expo/vector-icons';

const {width:SCREEN_WIDTH} = Dimensions.get("window")



const icons = {
  "Clouds" : "cloudy",
  "Clear"  : "day-sunny"
}

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getweather = async()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
    setCity(location[0].city)
    const {list} = await(
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)).json();
    // console.log(list[0])
    const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith("00:00:00"));    
    setDays(filteredList)
    console.log(days[0].main.temp)
  };
  useEffect(()=>{
    getweather();
  },[]);
  return (
    <View style = {styles.container}>
      <View style = {styles.city}>
        <Text style={styles.cityName}>
          {city}
        </Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle = {styles.weather}>
        {days.length ===0 ?(<View style={styles.day}><ActivityIndicator color="white" size="large"/></View>) : (
          days.map((day,index) => 
          <View key={index} style={styles.day}>
            <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
              <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text><Fontisto name={icons[day.weather[0].main]} size={68} color="white"/>
            </View>
            <Text style={styles.weather}>
              {day.weather[0].main}
            </Text>
            <Text style={styles.desc}>
              {day.weather[0].description}
            </Text>
          </View>)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor:'tomato'
  },
  city:{
    flex:1.2, justifyContent: "center",alignItems:"center",
  },
  cityName:{
    color:"black", fontSize: 68, fontWeight: "500",    color: "white"

  },
  weather:{
    marginTop: -30,
    fontSize: 50,
    color: "white"
  },
  day:{
    width: SCREEN_WIDTH,
    alignItems:"center"
  },
  temp:{
    fontSize: 100,
    marginTop: 50,
    color: "white"
  },
  desc:{
    marginTop: -5,
    fontSize: 20,
    color: "white"

  }
})

