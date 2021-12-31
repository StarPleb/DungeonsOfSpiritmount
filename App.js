import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect }from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import DungeonsOfSpiritmount from './DungeonsOfSpiritmount';

export default function App() {


  const [window, setWindow] = useState(Dimensions.get('screen'))

  const windowHandler = () =>{
    setWindow(Dimensions.get('screen'))
  }

  const windowListener = Dimensions.addEventListener("change", windowHandler)

  
  return (
    <View style={styles.container}>
      <DungeonsOfSpiritmount width = {window.width} height ={window.height} window ={window} layout={[]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

