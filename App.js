import React from "react"
import {  View  } from 'react-native';

export default function App() {
  return (
    <View style= {{flex: 1, flexDirection: 'row'}}>
      <View style = {{flex: 1, backgroundColor: 'red'}}></View>
      <View style = {{flex: 1, backgroundColor: 'teal'}}></View>
      <View style = {{flex: 1, backgroundColor: 'orange'}}></View>
    </View>
  );
}

