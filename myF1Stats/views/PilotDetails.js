import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import api from "../services/api";

const GLOBAL = require('../Global');

export default function PilotDetails(props) {
  const [pilotImage, setPilotImage] = useState();
  const [pilotContent, setPilotContent] = useState();
  const [loading, setLoading] = useState(false);
  const [pilot, setPilot] = useState();

  useEffect(() => {
    setPilot(props.data);
    getPilotImage();
    getPilotContent();
  }, [])

  async function getPilotImage() {
    try {
      setLoading(true);
      let urlSplit = props.data.Driver.url.split('/');
      const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=pageimages&piprop=original&titles=' + urlSplit[urlSplit.length - 1];
      let response = await api.get(url);
      let keys = Object.keys(response.data.query.pages);
      setPilotImage(response.data.query.pages[keys[0]].original.source)
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  async function getPilotContent() {
    try {
      setLoading(true);
      let urlSplit = props.data.Driver.url.split('/');
      const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=' + urlSplit[urlSplit.length - 1];
      let response = await api.get(url);
      let keys = Object.keys(response.data.query.pages);
      setPilotContent(response.data.query.pages[keys[0]].extract)
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  async function getPilots() {
    try {
      setLoading(true);
      let response = await api.get(GLOBAL.YEAR + '/driverStandings.json');
      setPilots(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function onDetails(pilot) {
    setLoading(true);
    props.onDetails('PILOTDETAILS', pilot);
  }

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    loading
      ? <Loading />
      : <ScrollView style={styles.container}>
        {
          pilot && <View>
            <Image style={styles.pilotImage} source={{ uri: pilotImage }} />
            <Text style={styles.pilotCode}>{pilot.Driver.code}</Text>
            <Text style={styles['pilotName' + GLOBAL.MAIN_THEME]}>{pilot.Driver.givenName + ' ' + pilot.Driver.familyName}</Text>
            <Text style={styles['pilotConstructorName' + GLOBAL.MAIN_THEME]}>{pilot.Constructors[0].name}</Text>
            
            <Text style={styles['year' + GLOBAL.MAIN_THEME]}>{GLOBAL.YEAR}</Text>
            <View style={styles.pilotInformations}>
              <View style={styles['pilotInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={require('../assets/icons/speedometer.png')} />
                <Text style={styles['pilotInformationCardTitle' + GLOBAL.MAIN_THEME]}>Points</Text>
                <Text style={styles['pilotInformationCardInformation' + GLOBAL.MAIN_THEME]}>{pilot.points}</Text>
              </View>
              <View style={styles['pilotInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={require('../assets/icons/podium.png')} />
                <Text style={styles['pilotInformationCardTitle' + GLOBAL.MAIN_THEME]}>Position</Text>
                <Text style={styles['pilotInformationCardInformation' + GLOBAL.MAIN_THEME]}>{pilot.position}º</Text>
              </View>
              <View style={styles['pilotInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={require('../assets/icons/champagne.png')} />
                <Text style={styles['pilotInformationCardTitle' + GLOBAL.MAIN_THEME]}>Wins</Text>
                <Text style={styles['pilotInformationCardInformation' + GLOBAL.MAIN_THEME]}>{pilot.wins}</Text>
              </View>
            </View>
            <View>
              <Text style={styles['content' + GLOBAL.MAIN_THEME]}>{pilotContent && pilotContent}</Text>
            </View>
          </View>
        }
      </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentDark: {
    marginTop: 20,
    textAlign: 'justify',
    color: 'white',
    padding: 15
  },
  contentLight: {
    marginTop: 20,
    textAlign: 'justify',
    color: 'black',
    padding: 15
  },
  pilotImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  pilotInformations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 15
  },
  yearLight: {
    color: 'black',
    textAlign: 'center',
  },
  yearDark: {
    color: 'white',
    textAlign: 'center',
  },
  pilotNameLight: {
    color: 'black',
    paddingLeft: 15,
    paddingTop: 0,
    fontSize: 30
  },
  pilotNameDark: {
    color: 'white',
    paddingLeft: 15,
    paddingTop: 0,
    fontSize: 30
  },
  pilotConstructorNameLight: {
    color: 'black',
    paddingLeft: 15,
    paddingBottom: 20,
    fontSize: 15
  },
  pilotConstructorNameDark: {
    color: 'white',
    paddingLeft: 15,
    paddingBottom: 20,
    fontSize: 15
  },
  pilotInformationCardDark: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    height: 150,
    flex: 0.3,
    backgroundColor: '#1a1a1a'
  },
  pilotInformationCardLight: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    height: 150,
    flex: 0.3,
    backgroundColor: '#f2f2f2'
  },
  pilotInformationCardTitleLight: {
    color: 'black',
    fontSize: 15,
    marginTop: 30
  },
  pilotInformationCardTitleDark: {
    color: 'white',
    fontSize: 15,
    marginTop: 30
  },  
  cardTinyLogo: {
    width: 40,
    height: 40
  },
  pilotInformationCardInformationLight: {
    color: 'black',
  },
  pilotInformationCardInformationDark: {
    color: 'white',
  },
  pilotCode: {
    color: 'white',
    fontSize: 80,
    padding: 15,
    paddingBottom: 0,
    marginTop: -100,
    textAlign: 'right'
  }
});