import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Assets from '../assets/AssetsService';
import React, { useState } from 'react';

const GLOBAL = require('../Global');

export default function ContentCard(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View style={styles['container' + GLOBAL.MAIN_THEME]}>
      <View style={styles.header}>
        <Text style={styles['title' + GLOBAL.MAIN_THEME]}>{props.title}</Text>
        {
          props.isCollapse && <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            {
              isOpen
                ? <Image style={styles.tinyLogo} source={Assets.icon.up[GLOBAL.MAIN_THEME]} />
                : <Image style={styles.tinyLogo} source={Assets.icon.down[GLOBAL.MAIN_THEME]} />
            }
          </TouchableOpacity>
        }
      </View >
      {
        props.isCollapse && isOpen && <Text style={styles['content' + GLOBAL.MAIN_THEME]}>{props.content}</Text>
      }
    </View >
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    padding: 15,
    paddingBottom: 0,
    transition: '.5s',
    margin: 10,
  },
  containerDark: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    padding: 15,
    transition: '.5s',
    margin: 10,
  },
  tinyLogo: {
    width: 27,
    height: 27
  },
  titleDark: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontSize: 20,
  },
  titleLight: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontSize: 20,
  },
  contentDark: {
    textAlign: 'justify',
    color: 'white',
  },
  contentLight: {
    textAlign: 'justify',
    color: 'black',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
  }
});