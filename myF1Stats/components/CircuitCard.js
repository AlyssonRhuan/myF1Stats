import { View, StyleSheet, Image, Text } from "react-native";
import React, { useEffect } from 'react';
import coutries from '../data/countries.json'

const GLOBAL = require('../Global');

const months = {
  '01': 'Jan',
  '02': 'Fev',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'Mai',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Set',
  '10': 'Out',
  '11': 'Nov',
  '12': 'Dez'
};

export default function CircuitCard(props) {

  useEffect(() => {

  }, [GLOBAL.MAIN_THEME])

  return (
    <View style={styles(props)['container' + GLOBAL.MAIN_THEME]}>

      <View style={styles(props).inlineText}>
        <Text style={styles(props)['text' + GLOBAL.MAIN_THEME]}>{months[props.circuit.date.split('-')[1]] + ' ' + props.circuit.date.split('-')[2]}</Text>
        {props.isNextRace && <Text style={styles(props).textLastRace}>NEXT RACE</Text>}
        {props.isLastRace && <Text style={styles(props).textNextRace}>LAST RACE</Text>}
      </View>

      <Text style={styles(props)['title' + GLOBAL.MAIN_THEME]}>{props.circuit.Circuit.Location.country + ' ' + props.circuit.date.split('-')[0]}</Text>
      <Text style={styles(props)['text' + GLOBAL.MAIN_THEME]}>{props.circuit.Circuit.circuitName}</Text>
      <Image style={styles(props).flag} source={{ uri: 'https://www.countryflags.io/' + coutries[props.circuit.Circuit.Location.country] + '/flat/64.png' }} />
      <View style={styles(props)['triangleCornerTopRight' + GLOBAL.MAIN_THEME]} />
    </View >
  );
}

const styles = (props) => StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderBottomColor: '#ff2801',
    borderRightColor: '#ff2801',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    minHeight: 100
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderBottomColor: '#ff2801',
    borderRightColor: '#ff2801',
    padding: 15,
    marginBottom: 20,
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
  },
  textLastRace: {
    color: 'green',
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
  triangleCornerTopRightLight: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 49,
    borderTopWidth: 75,
    borderRightColor: "transparent",
    borderTopColor: '#f2f2f2',
    position: 'absolute',
    right: 0,
    marginRight: 13,
    marginTop: -11,
    transform: [{ rotate: "270deg" }],
  },
  triangleCornerTopRightDark: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 49,
    borderTopWidth: 75,
    borderRightColor: "transparent",
    borderTopColor: '#1a1a1a',
    position: 'absolute',
    right: 0,
    marginRight: 13,
    marginTop: -11,
    transform: [{ rotate: "270deg" }],
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
    marginTop: -15,
    marginRight: -3,
    height: 80,
    width: 80
  }
});