import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import ConstructorCard from "../components/ConstructorCard";
import React, { useState, useEffect } from 'react';
import Loading from "../components/Loading";
import api from "../services/api";

const GLOBAL = require('../Global');

export default function Constructors(props) {
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getConstructors();
  }, [])

  async function getConstructors() {
    try {
      setLoading(true);
      let response = await api.get(GLOBAL.YEAR + '/constructorStandings.json');
      setConstructors(response.data.MRData.total > 0
        ? response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        : undefined);
      setLoading(false);
    }
    catch (e) {
      error(e);
    }
  }

  function onDetails(constructor) {
    setLoading(true);
    props.onDetails('CONSTRUCTORDETAILS', constructor);
  }

  function error(e) {
    console.error(e.response ? e.response.data.message : e.message);
  }

  return (
    <ScrollView style={styles.container}>
      {
        loading || constructors == undefined ? <Loading />
          : constructors.map((constructor, key) => {
            return <TouchableOpacity key={key} onPress={() => onDetails(constructor)}>
              <View>
                <ConstructorCard constructor={constructor} />
              </View>
            </TouchableOpacity>
          })
      }
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});