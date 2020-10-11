import React, { useState } from "react";

import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { connect } from "react-redux";

import RadioForm from "react-native-simple-radio-button";

import { addCard } from "../actions";

import { red, black } from "../utils/colors";

import { addCardToDeck } from "../utils/api";

import SubmitBtn from "./SubmitBtn";

const AddCard = ({ title, dispatch, route, navigation }) => {
  const [questionData, setResponseData] = useState({
    question: "",
    answer: "",
    answerOption: null,
  });

  const answers = [
    { label: "Correct", value: 1 },
    { label: "Incorrect", value: 0 },
  ];
  const { question, answer, answerOption } = questionData;

  const handleOptOneChange = (value, name) => {
    setResponseData({
      ...questionData,
      [name]: value,
    });
  };

  const setTitle = (title) => {
    navigation.setOptions({
      title: title + " Add Card",
    });
  };

  const handleSubmit = () => {
    const { deckId } = route.params;

    const card = {
      question: question,
      answer: answer,
      isCorrect: answerOption ? "true" : "false",
    };
    dispatch(addCard(card, deckId));
    addCardToDeck(card, deckId);
    navigation.navigate("DeckDisplay", { title: deckId });
  };

  const isNotFilled =
    question.length === 0 || answerOption === null || answer.length === 0;

  setTitle(title);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.qtnView}>
          <TextInput
            style={styles.input}
            value={question}
            placeholder="Question"
            onChangeText={(value) => handleOptOneChange(value, "question")}
          />
        </View>

        <View style={styles.ansView}>
          <TextInput
            style={styles.input}
            value={answer}
            placeholder="Answer"
            onChangeText={(value) => handleOptOneChange(value, "answer")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.ans}>Is the answer correct or incorrect?</Text>
        </View>
        <View style={{ flexDirection: "row", height: 40 }}>
          <RadioForm
            radio_props={answers}
            initial={-1}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={black}
            labelStyle={{ color: black }}
            animation={true}
            onPress={(value) => handleOptOneChange(value, "answerOption")}
          />
        </View>
        <SubmitBtn
          onPress={handleSubmit}
          disabled={isNotFilled ? true : false}
          text="Submit"
        />

        {isNotFilled ? (
          <View
            style={{
              padding: 5,
              flexWrap: "wrap",
              margin: 3,

              flexDirection: "row",
            }}
          >
            <Text style={{ color: red }}>All fields required</Text>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ansView: {
    flexDirection: "row",
    height: 40,
    marginBottom: 30,
  },
  qtnView: {
    flexDirection: "row",
    height: 40,
    marginBottom: 30,
  },
  ans: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "500",
    color: black,
    marginTop: 8,
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    width: 300,

    height: 60,

    paddingLeft: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
});

function mapStateToProps(_, { route }) {
  const { deckId } = route.params;
  return {
    title: deckId,
  };
}
export default connect(mapStateToProps)(AddCard);
