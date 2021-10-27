import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import ConstructorDetails from './views/ConstructorDetails';
import CircuitDetails from './views/CircuitDetails';
import React, { useState, useEffect } from 'react';
import PilotDetails from "./views/PilotDetails";
import Constructors from "./views/Constructors";
import Assets from './assets/AssetsService';
import Circuits from "./views/Circuits";
import Pilots from "./views/Pilots";
import About from './views/About';
import Home from './views/Home';

const GLOBAL = require('./Global');

const PAGE_TITLE = {
  "HOME": "My F1 Stats",
  "PILOTS": "Pilots",
  "CONSTRUCTORS": "Constructors",
  "CIRCUITS": "Circuits",
  "PILOTDETAILS": "Details",
  "CONSTRUCTORDETAILS": "Details",
  "CIRCUITDETAILS": "Details",
  "ABOUT": "About",
}

export default function App() {
  const [dataDetails, setDataDetails] = useState();
  const [view, setView] = useState('HOME');

  useEffect(() => {

  }, [])

  function setActiveView(viewId) {
    setView(viewId);
  }

  function onDetails(viewId, data) {
    setDataDetails(data);
    setView(viewId);
  }

  return (
    <View style={styles["container" + GLOBAL.MAIN_THEME]}>
      <View style={styles.body}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveView('HOME')}>
            <View style={styles.logo}>
              <Image style={styles.tinyLogo} source={Assets.icon.logo[GLOBAL.MAIN_THEME]} />
            </View>
          </TouchableOpacity>
          <Text style={styles["logoTitle" + GLOBAL.MAIN_THEME]}>{PAGE_TITLE[view]}</Text>
          <TouchableOpacity onPress={() => setView('ABOUT')}>
            <Image style={styles.tinyLogo} source={Assets.icon.settings[GLOBAL.MAIN_THEME]} />
          </TouchableOpacity>
        </View>

        {view == 'HOME' && <Home onDetails={onDetails} />}

        {view == 'PILOTS' && <Pilots onDetails={onDetails} />}
        {view == 'PILOTDETAILS' && <PilotDetails data={dataDetails} />}

        {view == 'CONSTRUCTORS' && <Constructors onDetails={onDetails} />}
        {view == 'CONSTRUCTORDETAILS' && <ConstructorDetails data={dataDetails} />}

        {view == 'CIRCUITS' && <Circuits onDetails={onDetails} />}
        {view == 'CIRCUITDETAILS' && <CircuitDetails data={dataDetails} />}

        {view == 'ABOUT' && <About onDetails={onDetails} />}


      </View>
      <View style={styles['menuBar' + GLOBAL.MAIN_THEME]}>
        <TouchableOpacity onPress={() => setActiveView('HOME')} style={styles.menuBarButton}>
          <Image style={styles.tinyLogoBar} source={Assets.icon.home[GLOBAL.MAIN_THEME]} />
          <Text style={styles['text' + GLOBAL.MAIN_THEME]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('PILOTS')} style={styles.menuBarButton}>
          <Image style={styles.tinyLogoBar} source={Assets.icon.pilots[GLOBAL.MAIN_THEME]} />
          <Text style={styles['text' + GLOBAL.MAIN_THEME]}>Pilots</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('CONSTRUCTORS')} style={styles.menuBarButton}>
          <Image style={styles.tinyLogoBar} source={Assets.icon.constructors[GLOBAL.MAIN_THEME]} />
          <Text style={styles['text' + GLOBAL.MAIN_THEME]}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('CIRCUITS')} style={styles.menuBarButton}>
          <Image style={styles.tinyLogoBar} source={Assets.icon.circuit[GLOBAL.MAIN_THEME]} />
          <Text style={styles['text' + GLOBAL.MAIN_THEME]}>Circuits</Text>
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
    backgroundColor: "#262626"
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  tinyLogoBar: {
    width: 30,
    height: 30,
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
    paddingTop: 5
  },
  menuBarDark: {
    flex: 0.08,
    backgroundColor: "#1a1a1a",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
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
  menuBarButton: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  textDark: {
    textAlign: 'center',
    color: 'white'
  },
  textLight: {
    textAlign: 'center',
    color: 'black'
  },
});