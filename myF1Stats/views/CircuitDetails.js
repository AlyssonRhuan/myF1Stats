import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import Assets from "../assets/AssetsService";
import Loading from "../components/Loading";
import api from "../services/api";
import ContentCard from "../components/ContentCard";

const GLOBAL = require('../Global');

export default function CircuitDetails(props) {
  const [circuit, setCircuit] = useState();
  const [circuitImage, setCircuitImage] = useState();
  const [circuitContent, setCircuitContent] = useState();
  const [circuitWinner, setCircuitWinner] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCircuit(props.data);
    getCircuitImage();
    getWinner(GLOBAL.YEAR, props.data.round)
    if (props.data.isRaceAlreadyHappened) {
    }
    getCircuitContent();
  }, [])

  async function getCircuitImage() {
    try {
      setLoading(true);

      let urlSplit = props.data.url.split('/');

      const url = 'https://en.wikipedia.org/w/api.php?format=json&action=parse&origin=*&prop=text&page=' + urlSplit[urlSplit.length - 1];
      let response = await api.get(url);

      const text = response.data.parse.text['*'];

      const imgTags = text.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));

      let constructorLogoImage = "";
      imgTags.map(imgTag => {
        if (!imgTag.toUpperCase().includes('FLAG') && constructorLogoImage === "") {
          constructorLogoImage = 'https:' + imgTag
        }
      })


      setCircuitImage(constructorLogoImage);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  async function getWinner(year, round) {
    try {
      setLoading(true);
      let response = await api.get(year + '/' + round + '/results.json');
      setCircuitWinner(response.data.MRData.RaceTable.Races[0].Results[0]);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  async function getCircuitContent() {
    try {
      setLoading(true);
      let urlSplit = props.data.Circuit.url.split('/');
      const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=' + urlSplit[urlSplit.length - 1];
      let response = await api.get(url);
      let keys = Object.keys(response.data.query.pages);
      setCircuitContent(response.data.query.pages[keys[0]].extract)
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    loading
      ? <Loading />
      : <ScrollView style={styles.container}>
        {
          circuit && <View>
            <Text style={styles['constructorName' + GLOBAL.MAIN_THEME]}>{circuit.raceName}</Text>
            <Text style={styles['constructorNationality' + GLOBAL.MAIN_THEME]}>{circuit.Circuit.Location.country}</Text>
            <View>
              {
                circuitImage && circuitImage !== "" && <Image style={styles.constructorImage} source={{ uri: circuitImage }} />
              }
            </View>
            <Text style={styles['year' + GLOBAL.MAIN_THEME]}>{GLOBAL.YEAR}</Text>
            {
              circuitWinner && <View style={styles.constructorInformations}>
                <View style={styles['constructorInformationCard' + GLOBAL.MAIN_THEME]}>
                  <Image style={styles.cardTinyLogo} source={Assets.icon.points[GLOBAL.MAIN_THEME]} />
                  <Text style={styles['constructornformationCardTitle' + GLOBAL.MAIN_THEME]}>Laps</Text>
                  <Text style={styles['constructorInformationCardInformation' + GLOBAL.MAIN_THEME]}>{circuitWinner.laps}</Text>
                </View>
                <View style={styles['constructorInformationCard' + GLOBAL.MAIN_THEME]}>
                  <Image style={styles.cardTinyLogo} source={Assets.icon.clock[GLOBAL.MAIN_THEME]} />
                  <Text style={styles['constructornformationCardTitle' + GLOBAL.MAIN_THEME]}>Time</Text>
                  <Text style={styles['constructorInformationCardInformation' + GLOBAL.MAIN_THEME]}>{circuitWinner.Time.time}º</Text>
                </View>
                <View style={styles['constructorInformationCard' + GLOBAL.MAIN_THEME]}>
                  <Image style={styles.cardTinyLogo} source={Assets.icon.wins[GLOBAL.MAIN_THEME]} />
                  <Text style={styles['constructornformationCardTitle' + GLOBAL.MAIN_THEME]}>Winner</Text>
                  <Text style={styles['constructorInformationCardInformation' + GLOBAL.MAIN_THEME]}>{circuitWinner.Driver.givenName + ' ' + circuitWinner.Driver.familyName}</Text>
                </View>
              </View>
            }

            {
              circuitContent && <ContentCard isCollapse={true} title={'About'} content={circuitContent} />
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
  constructorLogo: {
    width: '90%',
    height: 100,
    resizeMode: 'contain',
    margin: '5%'
  },
  constructorImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    margin: '5%'
  },
  constructorInformations: {
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
  constructorNameLight: {
    color: 'black',
    paddingLeft: 15,
    paddingTop: 0,
    fontSize: 30
  },
  constructorNameDark: {
    color: 'white',
    paddingLeft: 15,
    paddingTop: 0,
    fontSize: 30
  },
  constructorNationalityLight: {
    color: 'black',
    paddingLeft: 15,
    paddingBottom: 20,
    fontSize: 15
  },
  constructorNationalityDark: {
    color: 'white',
    paddingLeft: 15,
    paddingBottom: 20,
    fontSize: 15
  },
  constructorInformationCardDark: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    height: 150,
    flex: 0.3,
    backgroundColor: '#1a1a1a'
  },
  constructorInformationCardLight: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    height: 150,
    flex: 0.3,
    backgroundColor: '#f2f2f2'
  },
  constructornformationCardTitleLight: {
    color: 'black',
    fontSize: 15,
    marginTop: 30
  },
  constructornformationCardTitleDark: {
    color: 'white',
    fontSize: 15,
    marginTop: 30
  },
  cardTinyLogo: {
    width: 40,
    height: 40
  },
  constructorInformationCardInformationLight: {
    color: 'black',
  },
  constructorInformationCardInformationDark: {
    color: 'white',
  }
});