import { View, StyleSheet, Image, Text } from "react-native";
import React, { useEffect } from 'react';
import coutries from '../data/countries.json'

const GLOBAL = require('../Global');

const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

export default function CircuitCard(props) {

  useEffect(() => {

  }, [GLOBAL.MAIN_THEME])

  return (
    <View style={props.isHome ? styles['containerHome' + GLOBAL.MAIN_THEME] : styles['container' + GLOBAL.MAIN_THEME]}>

      <View style={styles.inlineText}>
        <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{months[props.circuit.date.split('-')[1]] + ' ' + props.circuit.date.split('-')[2] + ' ' + props.circuit.date.split('-')[0]}</Text>
        {props.isNextRace && <Text style={styles['text' + GLOBAL.MAIN_THEME]}> ({props.circuit.time})</Text>}
        {props.isNextRace && <Text style={styles.textLastRace}>NEXT RACE</Text>}
        {props.isLastRace && <Text style={styles.textNextRace}>LAST RACE</Text>}
      </View>

      <Text style={styles['title' + GLOBAL.MAIN_THEME]}>{props.circuit.Circuit.Location.country}</Text>
      <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{props.circuit.Circuit.circuitName}</Text>
      <Image style={styles.flag} source={{ uri: 'https://www.worldometers.info/img/flags/' + coutries[props.circuit.Circuit.Location.country] + '-flag.gif' }} />
    </View >
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderBottomColor: '#ff2801',
    borderRightColor: '#ff2801',
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    margin: 10,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderBottomColor: '#ff2801',
    borderRightColor: '#ff2801',
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    margin: 10,
  },
  containerHomeLight: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    minHeight: 100
  },
  containerHomeDark: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    minHeight: 100
  },
  textDark: {
    color: 'white',
  },
  textLight: {
    color: 'black',
  },
  textNextRace: {
    color: 'red',
    marginLeft: 10
  },
  textLastRace: {
    color: 'green',
    marginLeft: 10
  },
  titleDark: {
    color: 'white',
    fontSize: 25
  },
  titleLight: {
    color: 'black',
    fontSize: 25
  },
  position: {
    color: 'white',
    position: 'absolute',
    right: 0,
    marginTop: 8,
    fontSize: 18,
    textAlign: "right"
  },
  tinyLogo: {
    width: 40,
    height: 40
  },
  inlineText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '45%'
  },
  flag: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
    marginTop: 23,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  }
});