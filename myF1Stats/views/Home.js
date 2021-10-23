import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import * as HomeService from '../services/HomeService';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";

const GLOBAL = require('../Global');

export default function Home(props) {
  const [selectedYear, setSelectedYear] = useState(GLOBAL.YEAR);
  const [constructors, setConstructors] = useState();
  const [yearContent, setYearContent] = useState();
  const [years, setYears] = useState(undefined);
  const [pilots, setPilots] = useState();

  useEffect(() => {
    HomeService.getYears(setYears);
    HomeService.getPilots(undefined, setPilots);
    HomeService.getConstructors(undefined, setConstructors);
    HomeService.getYearContent(undefined, setYearContent);
  }, [GLOBAL.MAIN_THEME])

  function onDetails(page, data) {
    props.onDetails(page, data);
  }

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Picker
          selectedValue={selectedYear}
          style={styles['picker' + GLOBAL.MAIN_THEME]}
          onValueChange={(itemValue, itemIndex) =>
            HomeService.onSelectYear(itemValue, setSelectedYear, setConstructors, setPilots, setYearContent)
          }>
          {
            !years ? <Loading /> : years.map((year, key) => <Picker.Item style={styles['picker' + GLOBAL.MAIN_THEME]} key={key} label={year + ''} value={year + ''} />)
          }
        </Picker>
      </View>

      <Text style={styles['title' + GLOBAL.MAIN_THEME]}>Pilots</Text>

      {
        !pilots ? <Loading /> : <View style={styles.podium}>
          <View style={styles['podiumSecond' + GLOBAL.MAIN_THEME]} onClick={() => onDetails('PILOTDETAILS', pilots[1])}>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[1].Driver.givenName}</Text>
            <Text style={styles['podiumTitle' + GLOBAL.MAIN_THEME]}>{pilots[1].Driver.familyName}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[1].Constructors[0].name}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[1].points}</Text>
          </View>
          <View style={styles['podiumFirst' + GLOBAL.MAIN_THEME]} onClick={() => onDetails('PILOTDETAILS', pilots[0])}>
            <Image style={styles.podiumTinyLogo} source={require('../assets/icons/medal.png')} />
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[0].Driver.givenName}</Text>
            <Text style={styles['podiumTitle' + GLOBAL.MAIN_THEME]}>{pilots[0].Driver.familyName}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[0].Constructors[0].name}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[0].points}</Text>
          </View>
          <View style={styles['podiumThird' + GLOBAL.MAIN_THEME]} onClick={() => onDetails('PILOTDETAILS', pilots[2])}>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[2].Driver.givenName}</Text>
            <Text style={styles['podiumTitle' + GLOBAL.MAIN_THEME]}>{pilots[2].Driver.familyName}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[2].Constructors[0].name}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{pilots[2].points}</Text>
          </View>
        </View>
      }

      <Text style={styles['title' + GLOBAL.MAIN_THEME]}>{constructors && constructors.length > 2 ? 'Constructors' : ''}</Text>

      {
        !constructors ? <Loading /> : constructors.length > 2 ? <View style={styles.podium}>
          <View style={styles['podiumSecond' + GLOBAL.MAIN_THEME]} onClick={() => onDetails('CONSTRUCTORDETAILS', constructors[1])}>
            <Text style={styles['podiumTitle' + GLOBAL.MAIN_THEME]}>{constructors[1].Constructor.name}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{constructors[1].points}</Text>
          </View>
          <View style={styles['podiumFirst' + GLOBAL.MAIN_THEME]} onClick={() => onDetails('CONSTRUCTORDETAILS', constructors[0])}>
            <Image style={styles.podiumTinyLogo} source={require('../assets/icons/medal.png')} />
            <Text style={styles['podiumTitle' + GLOBAL.MAIN_THEME]}>{constructors[0].Constructor.name}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{constructors[0].points}</Text>
          </View>
          <View style={styles['podiumThird' + GLOBAL.MAIN_THEME]} onClick={() => onDetails('CONSTRUCTORDETAILS', constructors[2])}>
            <Text style={styles['podiumTitle' + GLOBAL.MAIN_THEME]}>{constructors[2].Constructor.name}</Text>
            <Text style={styles['text' + GLOBAL.MAIN_THEME]}>{constructors[2].points}</Text>
          </View>
        </View> : <View></View>
      }

      {
        !yearContent ? <Loading /> : <Text style={styles['content' + GLOBAL.MAIN_THEME]}>{yearContent}</Text>
      }

      <View>

      </View>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  podiumTinyLogo: {
    width: 40,
    height: 40,
    marginTop: -27,
    marginBottom: 10
  },
  titleDark: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  titleLight: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  textDark: {
    textAlign: 'center',
    color: 'white'
  },
  textLight: {
    textAlign: 'center',
    color: 'black'
  },
  contentDark: {
    marginTop: 20,
    textAlign: 'justify',
    color: 'white',
    marginBottom: 20
  },
  contentLight: {
    marginTop: 20,
    textAlign: 'justify',
    color: 'black',
    marginBottom: 20
  },
  podiumTitleLight: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20
  },
  podiumTitleDark: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  podium: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  podiumFirstDark: {
    borderWidth: 5,
    borderColor: '#C9B037',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
    flex: 0.4,
    width: '100%',
    textAlign: 'center',
    color: 'red',
    paddingTop: 20,
    backgroundColor: '#1a1a1a',
    alignItems: "center"
  },
  podiumFirstLight: {
    borderWidth: 5,
    borderColor: '#C9B037',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
    flex: 0.4,
    width: '100%',
    textAlign: 'center',
    color: 'red',
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
    alignItems: "center"
  },
  podiumSecondLight: {
    borderWidth: 5,
    borderColor: '#B4B4B4',
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
    marginTop: 20,
    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#f2f2f2'
  },
  podiumSecondDark: {
    borderWidth: 5,
    borderColor: '#B4B4B4',
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
    marginTop: 20,
    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#1a1a1a'
  },
  podiumThirdLight: {
    borderWidth: 5,
    borderColor: '#6A3805',
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    marginTop: 20,
    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#f2f2f2'
  },
  podiumThirdDark: {
    borderWidth: 5,
    borderColor: '#6A3805',
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    marginTop: 20,
    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#1a1a1a'
  },
  pickerLight: {
    color: 'black'
  },
  pickerDark: {
    color: 'white',
    backgroundColor: '#1a1a1a'
  }
});