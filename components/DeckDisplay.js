import React from "react";

import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

import { connect } from "react-redux";

import { white, red, black } from "../utils/colors";

import SubmitBtn from "./SubmitBtn";

import { cardsCount } from "../utils/helper";

const DeckDisplay = ({ questions, title, navigation }) => {
  const setTitle = (deckTitle) => {
    navigation.setOptions({
      title: deckTitle + " Deck",
    });
  };

  setTitle(title);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.cardNum}>{cardsCount(questions.length)}</Text>
      <TouchableOpacity
        style={styles.addCardBtn}
        onPress={() => navigation.navigate("AddCard", { deckId: title })}
      >
        <Text style={styles.cardBtnText}>Add Card</Text>
      </TouchableOpacity>

      <SubmitBtn
        onPress={() => navigation.navigate("Quiz", { deckId: title })}
        disabled={questions.length === 0 ? true : false}
        text="Start Quiz"
      />

      {questions.length === 0 ? (
        <View style={styles.incView}>
          <Text style={{ color: red }}>Must have at least one card</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBtnText: {
    color: black,
    fontWeight: "500",
  },

  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: black,
  },

  addCardBtn: {
    backgroundColor: white,
    borderRadius: 5,
    borderColor: black,
    width: 200,
    height: 40,
    marginTop: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardNum: {
    fontSize: 30,
    marginTop: 30,
    color: black,
    marginBottom: 30,
  },
  incView: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 3,
    padding: 5,
  },
});

function mapStateToProps({ decks }, { route }) {
  const { title } = route.params;

  return {
    title,
    questions: decks[title].questions,
  };
}

export default connect(mapStateToProps)(DeckDisplay);
