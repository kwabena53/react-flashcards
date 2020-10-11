import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import { white, red, black, lightblc } from "../utils/colors";

import { removeLocalNotification, setLocalNotification } from "../utils/helper";

class Quiz extends Component {
  state = {
    showAns: false,
    isEnd: false,
    index: 0,

    score: 0,
    side: "Answer",
  };

  showAnswerFunc() {
    this.setState((curState) => ({
      showAns: !curState.showAns,
      side: curState.showAns ? "Answer" : "Question",
    }));
  }

  handleSelectClick = (answer) => {
    const { index } = this.state;

    const { questions } = this.props.deck;

    const { isCorrect } = questions[index];

    const isCorrectAns = answer === isCorrect;

    if (index + 1 === questions.length) {
      this.setState((curState) => ({
        isEnd: true,
        score: isCorrectAns ? curState.score + 1 : curState.score,
        showAns: false,
      }));

      removeLocalNotification().then(setLocalNotification);
    } else {
      this.setState((curState) => ({
        index: curState.index + 1,
        side: "Question",
        score: isCorrectAns ? curState.score + 1 : curState.score,
        showAns: false,
      }));
    }
  };

  restart = () => {
    this.setState({
      showAns: false,
      isEnd: false,
      index: 0,
      side: "Answer",
      score: 0,
    });
  };

  setTitle = (title) => {
    this.props.navigation.setOptions({
      title: title + " Quiz",
    });
  };

  render() {
    const { deck, navigation } = this.props;

    const { questions } = deck;

    const { isEnd, index, score, side, showAns } = this.state;

    this.setTitle(deck.title);

    return (
      <View style={styles.scoreSection}>
        {!isEnd ? (
          <View>
            <View style={styles.countSection}>
              <Text style={{ color: black }}>{`${index + 1} / ${
                questions.length
              }`}</Text>
            </View>

            <View style={styles.container}>
              {!showAns ? (
                <View style={[styles.card, styles.answerSide]}>
                  <Text style={styles.answerSideText}>
                    {questions[index].question}
                  </Text>
                </View>
              ) : (
                <View style={[styles.card, styles.questionSide]}>
                  <Text style={styles.questionSideText}>
                    {questions[index].answer}
                  </Text>
                </View>
              )}

              <TouchableOpacity onPress={() => this.showAnswerFunc()}>
                <Text style={{ textDecorationLine: "underline", color: red }}>
                  Show {side}!
                </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity
                  style={[styles.botton, styles.btnCorrect]}
                  onPress={() => this.handleSelectClick("true")}
                >
                  <Text style={styles.correctBtnText}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botton, styles.btnInCorrect]}
                  onPress={() => this.handleSelectClick("false")}
                >
                  <Text style={styles.incorrectBtnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.scoreSection}>
            <Text style={[styles.score]}>
              {((score / questions.length) * 100).toFixed(0)} %
            </Text>
            <Text style={styles.duText}>Correct!</Text>
            <TouchableOpacity
              style={[styles.botton, styles.btnInCorrect]}
              onPress={this.restart}
            >
              <Text style={styles.incorrectBtnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botton, styles.btnCorrect]}
              onPress={() => navigation.navigate("DeckDisplay")}
            >
              <Text style={styles.correctBtnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: 300,
    height: 150,
    marginTop: 1,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backfaceVisibility: "hidden",
  },
  questionSide: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 3,
  },
  answerSide: {
    backgroundColor: black,
  },
  duText: {
    color: lightblc,
    marginBottom: 30,
    fontSize: 20,
  },
  scoreSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  answerSideText: {
    fontSize: 20,
    color: "white",

    fontWeight: "bold",
    marginLeft: 6,
    marginRight: 6,
  },
  questionSideText: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    marginRight: 10,
  },
  btnCorrect: {
    backgroundColor: white,
    borderWidth: 2,
    color: black,
    borderColor: black,
  },
  countSection: {
    marginTop: 1,
    marginLeft: 10,
  },
  btnText: {
    color: white,
    fontWeight: "500",
  },
  btnInCorrect: {
    color: white,
    backgroundColor: black,
  },
  botton: {
    borderRadius: 5,
    height: 40,
    width: 200,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  correctBtnText: {
    color: black,
    fontWeight: "500",
  },
  incorrectBtnText: {
    color: white,
    fontWeight: "500",
  },
  score: {
    marginTop: 60,

    fontWeight: "bold",
    marginBottom: 30,
    fontSize: 60,
    color: black,
  },
});

function mapStateToProps({ decks }, { route }) {
  const { deckId } = route.params;

  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Quiz);
