import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import HomePodiumConstructors from "../components/HomePodiumConstructors";
import HomePodiumPilots from "../components/HomePodiumPilots";
import * as HomeService from '../services/HomeService';
import { Picker } from '@react-native-picker/picker';
import CircuitCard from "../components/CircuitCard";
import ContentCard from "../components/ContentCard";
import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";

const GLOBAL = require('../Global');

export default function Home(props) {
  const [selectedYear, setSelectedYear] = useState(GLOBAL.YEAR);
  const [constructors, setConstructors] = useState();
  const [yearContent, setYearContent] = useState();
  const [years, setYears] = useState(undefined);
  const [nextRace, setNextRace] = useState();
  const [pilots, setPilots] = useState();

  useEffect(() => {
    HomeService.getYears(setYears);
    HomeService.getPilots(undefined, setPilots);
    HomeService.getConstructors(undefined, setConstructors);
    HomeService.getYearContent(undefined, setYearContent);
    setNextRace(undefined);
    HomeService.getNextRace(setNextRace);
  }, [GLOBAL.MAIN_THEME])

  return (
    <ScrollView style={style.container}>
      <View>
        <Picker
          selectedValue={selectedYear}
          style={style['picker' + GLOBAL.MAIN_THEME]}
          onValueChange={itemValue =>
            HomeService.onSelectYear(itemValue, setSelectedYear, setConstructors, setPilots, setYearContent, setNextRace)
          }>
          {
            !years ? <Loading /> : years.map((year, key) => <Picker.Item style={style['picker' + GLOBAL.MAIN_THEME]} key={key} label={year + ''} value={year + ''} />)
          }
        </Picker>
      </View>

      {!pilots ? <Loading /> : <HomePodiumPilots onDetails={props.onDetails} pilots={pilots} />}
      {!constructors ? <Loading /> : <HomePodiumConstructors onDetails={props.onDetails} constructors={constructors} />}

      {
        nextRace === 'FINISHED_SEASON' || GLOBAL.YEAR != new Date().getFullYear()
          ? <ContentCard isCollapse={false} title={'Finished season'}/>
          : <View>
            {
              !nextRace
                ? <Loading />
                : <CircuitCard circuit={nextRace} isHome={true} isNextRace={true} isLastRace={false} />
            }
          </View>
      }

      {yearContent && <ContentCard isCollapse={true} title={'About'} content={yearContent} />}

    </ScrollView >
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  pickerLight: {
    color: 'black',
    backgroundColor: '#f2f2f2',
    margin: 10,
  },
  pickerDark: {
    color: 'white',
    backgroundColor: '#1a1a1a',
    margin: 10,
  }
});
