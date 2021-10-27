import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import Assets from "../assets/AssetsService";
import Loading from "../components/Loading";
import api from "../services/api";
import ContentCard from "../components/ContentCard";

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
            <Text style={styles.pilotCode}>{pilot.Driver.permanentNumber}</Text>
            <Text style={styles['pilotName' + GLOBAL.MAIN_THEME]}>{pilot.Driver.givenName + ' ' + pilot.Driver.familyName}</Text>
            <Text style={styles['pilotConstructorName' + GLOBAL.MAIN_THEME]}>{pilot.Constructors[0].name}</Text>

            <Text style={styles['year' + GLOBAL.MAIN_THEME]}>{GLOBAL.YEAR}</Text>
            <View style={styles.pilotInformations}>
              <View style={styles['pilotInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={Assets.icon.points[GLOBAL.MAIN_THEME]} />
                <Text style={styles['pilotInformationCardTitle' + GLOBAL.MAIN_THEME]}>Points</Text>
                <Text style={styles['pilotInformationCardInformation' + GLOBAL.MAIN_THEME]}>{pilot.points}</Text>
              </View>
              <View style={styles['pilotInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={Assets.icon.podium[GLOBAL.MAIN_THEME]} />
                <Text style={styles['pilotInformationCardTitle' + GLOBAL.MAIN_THEME]}>Position</Text>
                <Text style={styles['pilotInformationCardInformation' + GLOBAL.MAIN_THEME]}>{pilot.position}º</Text>
              </View>
              <View style={styles['pilotInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={Assets.icon.wins[GLOBAL.MAIN_THEME]} />
                <Text style={styles['pilotInformationCardTitle' + GLOBAL.MAIN_THEME]}>Wins</Text>
                <Text style={styles['pilotInformationCardInformation' + GLOBAL.MAIN_THEME]}>{pilot.wins}</Text>
              </View>
            </View>
            
            <ContentCard isCollapse={false} title={pilot.Driver.nationality + ' born in ' + months[pilot.Driver.dateOfBirth.split('-')[1]] + ' ' + pilot.Driver.dateOfBirth.split('-')[2] + ' ' + pilot.Driver.dateOfBirth.split('-')[0]}/>

            {
              pilotContent && <ContentCard isCollapse={true} title={'About'} content={pilotContent}/>
            }
          </View>
        }
      </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    margin: 10,
  },
  yearLight: {
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  yearDark: {
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  pilotNameLight: {
    color: 'black',
    paddingLeft: 10,
    paddingTop: 0,
    fontSize: 30
  },
  pilotNameDark: {
    color: 'white',
    paddingLeft: 10,
    paddingTop: 0,
    fontSize: 30
  },
  pilotConstructorNameLight: {
    color: 'black',
    paddingLeft: 10,
    paddingBottom: 20,
    fontSize: 15
  },
  pilotConstructorNameDark: {
    color: 'white',
    paddingLeft: 10,
    paddingBottom: 20,
    fontSize: 15
  },
  pilotInformationCardDark: {
    borderRadius: 10,
    padding: 15,
    height: 150,
    flex: 0.3,
    backgroundColor: '#1a1a1a'
  },
  pilotInformationCardLight: {
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