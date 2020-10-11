import React from "react";

import { View, StyleSheet, Text } from "react-native";

import { white, black, lightwht } from "../utils/colors";

import { cardsCount } from "../utils/helper";

const Deck = ({ title, count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{cardsCount(count)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  count: {
    color: lightwht,
  },
  container: {
    backgroundColor: black,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    margin: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: white,
  },
});

export default Deck;
