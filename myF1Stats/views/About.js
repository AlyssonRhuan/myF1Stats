import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import React, { useState, useEffect } from 'react';
import Assets from '../assets/AssetsService';

const GLOBAL = require('../Global');

export default function About(props) {
  const [themeChecked, setThemeChecked] = useState(GLOBAL.MAIN_THEME);

  useEffect(() => {
  }, [GLOBAL.MAIN_THEME])

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  function onCheckTheme(theme, setThemeChecked) {
    GLOBAL.MAIN_THEME = theme;
    setThemeChecked(theme);
    props.onDetails('HOME', undefined);
  }

  return (
    <ScrollView style={styles["container" + GLOBAL.MAIN_THEME]}>
      <View style={styles["cardAbout" + GLOBAL.MAIN_THEME]}>
        <Text style={styles['content' + GLOBAL.MAIN_THEME]}>App created by Alysson Rhuan</Text>
        <Text style={styles['content' + GLOBAL.MAIN_THEME]}>Contact: alysson_salgado@hotmail.com</Text>
        <Text style={styles['content' + GLOBAL.MAIN_THEME]}>API information: ergast.com</Text>
        <Text style={styles['content' + GLOBAL.MAIN_THEME]}>Images: Wikipedia</Text>
        <Text style={styles['content' + GLOBAL.MAIN_THEME]}>Icons: fontawesome.com</Text>
      </View>
      <View style={styles["cardAbout" + GLOBAL.MAIN_THEME]}>
        <Text style={styles['title' + GLOBAL.MAIN_THEME]}>Theme</Text>
        <View style={styles.contentBetween}>
          <Text style={styles['content' + GLOBAL.MAIN_THEME]}>{GLOBAL.MAIN_THEME}</Text>
          <TouchableOpacity onPress={() => onCheckTheme((themeChecked == 'Light' ? 'Dark' : 'Light'), setThemeChecked)}>
            <Image style={styles.tinyLogo} source={Assets.icon.theme[GLOBAL.MAIN_THEME]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        /> */}

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    padding: 15,
  },
  containerDark: {
    flex: 1,
    padding: 15,
  },
  titleDark: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginBottom: 20
  },
  titleLight: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginBottom: 20
  },
  contentDark: {
    textAlign: 'center',
    color: 'white',
  },
  contentLight: {
    textAlign: 'center',
    color: 'black',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  cardAboutDark: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  cardAboutLight: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  contentBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 5
  }
});