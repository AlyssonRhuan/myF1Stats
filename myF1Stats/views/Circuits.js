import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import CircuitCard from "../components/CircuitCard";
import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import api from "../services/api";

const GLOBAL = require('../Global');

export default function Circuits(props) {
  const [lastRaceRound, setLastRaceRound] = useState();
  const [lastRaceSeason, setLastRaceSeason] = useState();
  const [loading, setLoading] = useState(false);
  const [circuits, setCircuits] = useState();

  useEffect(() => {
    getLastRound();
    getCircuits();
  }, [])

  async function getCircuits() {
    try {
      setLoading(true);
      let response = await api.get(GLOBAL.YEAR + '.json');
      setCircuits(response.data.MRData.RaceTable.Races);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  async function getLastRound() {
    try {
      setLoading(true);
      let response = await api.get('current/last/results.json');
      setLastRaceRound(response.data.MRData.RaceTable.Races[0].round);
      setLastRaceSeason(response.data.MRData.RaceTable.Races[0].season);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function onDetails(circuit) {
    setLoading(true);
    let isRaceAlreadyHappened = false;
    if(circuit.season < lastRaceSeason){
      isRaceAlreadyHappened = true;
    }
    else if(circuit.round <= lastRaceRound){
      isRaceAlreadyHappened = true;
    }

    circuit.isRaceAlreadyHappened = isRaceAlreadyHappened; 
    props.onDetails('CIRCUITDETAILS', circuit);
  }

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  function isNextRace(circuitRound) {
    return GLOBAL.YEAR == new Date().getFullYear() && (circuitRound - 1) == lastRaceRound
  }

  function isLastRound(circuitRound) {
    return GLOBAL.YEAR == new Date().getFullYear() && circuitRound == lastRaceRound
  }

  return (
    <ScrollView style={styles.container}>
      {
        loading || circuits == undefined ? <Loading />
          : circuits.map((circuit, key) => {
            return <TouchableOpacity key={key} onPress={() => onDetails(circuit)}>
              <View>
                <CircuitCard circuit={circuit} isNextRace={isNextRace(circuit.round)} isLastRace={isLastRound(circuit.round)} />
              </View>
            </TouchableOpacity>
          })
      }
      <View>

      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tinyLogo: {
    width: 40,
    height: 40
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
    color: 'white'
  },
  textLight: {
    color: 'black'
  },
  contentDark: {
    marginTop: 20,
    textAlign: 'justify',
    color: 'white'
  },
  contentLight: {
    marginTop: 20,
    textAlign: 'justify',
    color: 'black'
  },
  podium: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  podiumFirst: {
    borderWidth: 5,
    borderColor: '#C9B037',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 150,
    flex: 0.4,
    width: '100%',
    textAlign: 'center',
    color: 'red'
  },
  podiumSecond: {
    borderWidth: 5,
    borderColor: '#B4B4B4',
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
    marginTop: 20,
    minHeight: 180,
    flex: 0.3
  },
  podiumThird: {
    borderWidth: 5,
    borderColor: '#6A3805',
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    marginTop: 20,
    minHeight: 180,
    flex: 0.3
  },
  pickerLight: {
    color: 'black'
  },
  pickerDark: {
    color: 'white'
  }
});