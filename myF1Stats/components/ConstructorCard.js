import constructorsColor from '../data/constructorsColor.json';
import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from 'react';

const GLOBAL = require('../Global');

export default function ConstructorCard(props) {

  useEffect(() => {

  }, [GLOBAL.MAIN_THEME])

  return (
    <View style={styles(props)['container' + GLOBAL.MAIN_THEME]}>
      <Text style={styles(props)['title' + GLOBAL.MAIN_THEME]}>{props.constructor.Constructor.name}</Text>
      <View style={styles(props).inlineText}>
        <Text style={styles(props)['text' + GLOBAL.MAIN_THEME]}>{props.constructor.points} points</Text>
        <Text style={styles(props)['text' + GLOBAL.MAIN_THEME]}>{props.constructor.wins} wins</Text>
      </View>
      <View style={styles(props).triangleCornerTopRight} />
      <Text style={styles(props).position}>{props.constructor.position} º</Text>
    </View >
  );
}

const styles = (props) => StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderBottomColor: constructorsColor[props.constructor.Constructor.constructorId] || '#ff2801',
    borderRightColor: constructorsColor[props.constructor.Constructor.constructorId] || '#ff2801',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    minHeight: 100
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderBottomColor: constructorsColor[props.constructor.Constructor.constructorId] || '#ff2801',
    borderRightColor: constructorsColor[props.constructor.Constructor.constructorId] || '#ff2801',
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
  triangleCornerTopRight: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 68,
    borderTopWidth: 68,
    borderRightColor: "transparent",
    borderTopColor: constructorsColor[props.constructor.Constructor.constructorId] || '#ff2801',
    position: 'absolute',
    right: 0,
    transform: [{ rotate: "90deg" }],
  },
  inlineText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '70%'
  }
});