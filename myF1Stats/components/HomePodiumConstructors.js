import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Assets from "../assets/AssetsService";
import React from 'react';

export default function HomePodiumConstructors(props) {

  function onDetails(page, data) {
    props.onDetails(page, data);
  }

  return (
    <View style={style.container}>
      {
        props.constructors.length > 2
          ? <View>
            <Text style={style.title}>Constructors</Text>
            <View style={style.podium}>
              <TouchableOpacity style={style.podiumSecond} onPress={() => onDetails('CONSTRUCTORDETAILS', props.constructors[1])}>
                <Text style={style.podiumTitle}>{props.constructors[1].Constructor.name}</Text>
                <Text style={style.text}>{props.constructors[1].points}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.podiumFirst} onPress={() => onDetails('CONSTRUCTORDETAILS', props.constructors[0])}>
                <Image style={style.podiumTinyLogo} source={Assets.icon.medal.Light} />
                <Text style={style.podiumTitle}>{props.constructors[0].Constructor.name}</Text>
                <Text style={style.text}>{props.constructors[0].points}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.podiumThird} onPress={() => onDetails('CONSTRUCTORDETAILS', props.constructors[2])}>
                <Text style={style.podiumTitle}>{props.constructors[2].Constructor.name}</Text>
                <Text style={style.text}>{props.constructors[2].points}</Text>
              </TouchableOpacity>
            </View>
          </View>
          : <View></View>
      }
    </View >
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  podiumTinyLogo: {
    width: 40,
    height: 40,
    marginTop: -24,
    marginBottom: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  text: {
    textAlign: 'center',
    color: 'black'
  },
  podiumTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20
  },
  podium: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20
  },
  podiumFirst: {
    alignItems: "center",
    borderRadius: 10,
    paddingBottom: 20,

    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#fff7cc',
  },
  podiumSecond: {
    borderRadius: 10,
    marginTop: 20,

    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#e6e6e6'
  },
  podiumThird: {
    borderRadius: 10,
    marginTop: 20,

    flex: 0.3,
    paddingTop: 20,
    backgroundColor: '#f5e6d6'
  }
});
