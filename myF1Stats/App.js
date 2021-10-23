import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import appConfiguration from './data/appconfiguration.json';
import ConstructorDetails from './views/ConstructorDetails';
import React, { useState, useEffect } from 'react';
import PilotDetails from "./views/PilotDetails";
import Constructors from "./views/Constructors";
import Circuits from "./views/Circuits";
import Pilots from "./views/Pilots";
import Home from './views/Home';
import CircuitDetails from './views/CircuitDetails';

const GLOBAL = require('./Global');

export default function App() {
  const [themeChecked, setThemeChecked] = useState(GLOBAL.MAIN_THEME);
  const [dataDetails, setDataDetails] = useState();
  const [view, setView] = useState('HOME');

  useEffect(() => {

  }, [GLOBAL.MAIN_THEME])

  function setActiveView(viewId) {
    setView(viewId);
  }

  function onDetails(viewId, data) {
    setDataDetails(data);
    setView(viewId);
  }

  function onCheckTheme(theme, setThemeChecked) {
    GLOBAL.MAIN_THEME = theme;
    setThemeChecked(theme);
  }

  return (
    <View style={styles["container" + GLOBAL.MAIN_THEME]}>
      <View style={styles.body}>
        
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image style={styles.tinyLogo} source={require('./assets/icons/scoreboard.png')} />
            <Text style={styles["logoTitle" + GLOBAL.MAIN_THEME]}>MY F1 STATS</Text>
          </View>
          <TouchableOpacity onPress={() => onCheckTheme((themeChecked == 'Light' ? 'Dark' : 'Light'), setThemeChecked)}>
            {
              GLOBAL.MAIN_THEME == 'Light'
                ? <Image style={styles.tinyLogo} source={require('./assets/icons/Dark.png')} />
                : <Image style={styles.tinyLogo} source={require('./assets/icons/Light.png')} />
            }
          </TouchableOpacity>
        </View>

        {view == 'HOME' && <Home onDetails={onDetails} />}

        {view == 'PILOTS' && <Pilots onDetails={onDetails} />}
        {view == 'PILOTDETAILS' && <PilotDetails data={dataDetails} />}

        {view == 'CONSTRUCTORS' && <Constructors onDetails={onDetails} />}
        {view == 'CONSTRUCTORDETAILS' && <ConstructorDetails data={dataDetails} />}

        {view == 'CIRCUITS' && <Circuits onDetails={onDetails} />}
        {view == 'CIRCUITDETAILS' && <CircuitDetails data={dataDetails} />}


      </View>
      <View style={styles['menuBar' + GLOBAL.MAIN_THEME]}>
        <TouchableOpacity onPress={() => setActiveView('HOME')}>
          <Image style={styles.tinyLogo} source={require('./assets/icons/start.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('PILOTS')}>
          <Image style={styles.tinyLogo} source={require('./assets/icons/steering-wheel.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('CONSTRUCTORS')}>
          <Image style={styles.tinyLogo} source={require('./assets/icons/car.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('CIRCUITS')}>
          <Image style={styles.tinyLogo} source={require('./assets/icons/race.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    fontFamily: 'Formula1 Display Regular',
    backgroundColor: "#fff"
  },
  containerDark: {
    flex: 1,
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    fontFamily: 'Formula1 Display Regular',
    backgroundColor: "#000"
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  body: {
    flex: 0.92,
    paddingBottom: 0
  },
  logo: {
    display: "flex",
    flexDirection: "row"
  },
  logoTitleLight: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    color: "black"
  },
  logoTitleDark: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    color: "white"
  },
  menuBarLight: {
    flex: 0.08,
    backgroundColor: "#f2f2f2",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  menuBarDark: {
    flex: 0.08,
    backgroundColor: "#1a1a1a",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  header: {
    flex: 0.08,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 5
  },
  tinyLogoF1: {
    marginTop: 10,
    flex: 1,
    width: null,
    height: 20,
    resizeMode: 'contain',
    marginLeft: -240
  },
});