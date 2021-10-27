import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import Assets from "../assets/AssetsService";
import Loading from "../components/Loading";
import api from "../services/api";
import ContentCard from "../components/ContentCard";

const GLOBAL = require('../Global');

export default function ConstructorDetails(props) {
  const [constructor, setConstructor] = useState();
  const [constructorLogo, setConstructorLogo] = useState(undefined);
  const [constructorImage, setConstructorImage] = useState();
  const [constructorContent, setConstructorContent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setConstructor(props.data);
    getConstructorImage();
    getConstructorContent();
  }, [])

  async function getConstructorImage() {
    try {
      setLoading(true);

      let urlSplit = props.data.Constructor.url.split('/');

      const url = 'https://en.wikipedia.org/w/api.php?format=json&action=parse&origin=*&prop=text&page=' + urlSplit[urlSplit.length - 1];
      let response = await api.get(url);

      const text = response.data.parse.text['*'];

      const imgTags = text.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));

      let constructorLogoImage = "";
      let images = [];
      imgTags && imgTags.map(imgTag => {
        if (!imgTag.toUpperCase().includes('FLAG')) {
          if (imgTag.toUpperCase().includes('LOGO') && constructorLogoImage === "") {
            constructorLogoImage = 'https:' + imgTag
          }
          if (!imgTag.toUpperCase().includes('LOGO') && imgTag.toUpperCase().includes(GLOBAL.YEAR)) {
            images.push('https:' + imgTag)
          }
        }
      })

      setConstructorLogo(constructorLogoImage);
      setConstructorImage(images);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  async function getConstructorContent() {
    try {
      setLoading(true);
      let urlSplit = props.data.Constructor.url.split('/');
      const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=' + urlSplit[urlSplit.length - 1];
      let response = await api.get(url);
      let keys = Object.keys(response.data.query.pages);
      setConstructorContent(response.data.query.pages[keys[0]].extract)
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
          constructor && <View>
            {
              constructorLogo && constructorLogo != "" && <Image style={styles.constructorLogo} source={{ uri: constructorLogo }} />
            }
            <Text style={styles['constructorName' + GLOBAL.MAIN_THEME]}>{constructor.Constructor.name}</Text>
            <Text style={styles['constructorNationality' + GLOBAL.MAIN_THEME]}>{constructor.Constructor.nationality}</Text>

            <Text style={styles['year' + GLOBAL.MAIN_THEME]}>{GLOBAL.YEAR}</Text>
            <View style={styles.constructorInformations}>
              <View style={styles['constructorInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={Assets.icon.points[GLOBAL.MAIN_THEME]} />
                <Text style={styles['constructornformationCardTitle' + GLOBAL.MAIN_THEME]}>Points</Text>
                <Text style={styles['constructorInformationCardInformation' + GLOBAL.MAIN_THEME]}>{constructor.points}</Text>
              </View>
              <View style={styles['constructorInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={Assets.icon.podium[GLOBAL.MAIN_THEME]} />
                <Text style={styles['constructornformationCardTitle' + GLOBAL.MAIN_THEME]}>Position</Text>
                <Text style={styles['constructorInformationCardInformation' + GLOBAL.MAIN_THEME]}>{constructor.position}º</Text>
              </View>
              <View style={styles['constructorInformationCard' + GLOBAL.MAIN_THEME]}>
                <Image style={styles.cardTinyLogo} source={Assets.icon.wins[GLOBAL.MAIN_THEME]} />
                <Text style={styles['constructornformationCardTitle' + GLOBAL.MAIN_THEME]}>Wins</Text>
                <Text style={styles['constructorInformationCardInformation' + GLOBAL.MAIN_THEME]}>{constructor.wins}</Text>
              </View>
            </View>

            {
              constructorContent && <ContentCard isCollapse={true} title={'About'} content={constructorContent} />
            }

            <View>
              {
                constructorImage && constructorImage.map((image, key) => <Image key={key} style={styles.constructorImage} source={{ uri: image }} />)
              }
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
  constructorLogo: {
    width: '90%',
    height: 100,
    resizeMode: 'contain',
    margin: '5%'
  },
  constructorImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  constructorInformations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10,
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
    paddingLeft: 10,
    paddingTop: 0,
    fontSize: 30
  },
  constructorNameDark: {
    color: 'white',
    paddingLeft: 10,
    paddingTop: 0,
    fontSize: 30
  },
  constructorNationalityLight: {
    color: 'black',
    paddingLeft: 10,
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