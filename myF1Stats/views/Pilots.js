import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import PilotCard from "../components/PilotCard";
import Loading from "../components/Loading";
import api from "../services/api";

const GLOBAL = require('../Global');

export default function Pilots(props) {
  const [loading, setLoading] = useState(false);
  const [pilots, setPilots] = useState();

  useEffect(() => {
    getPilots();
  }, [])

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
    <ScrollView style={styles.container}>
      {
        loading || pilots == undefined ? <Loading />
          : pilots.map((pilot, key) => {
            return <TouchableOpacity key={key} onPress={() => onDetails(pilot)}>
              <View>
                <PilotCard pilot={pilot} />
              </View>
            </TouchableOpacity>
          })
      }
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  }
});