import React, { useState } from "react";

import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";

import { black } from "../utils/colors";

import { connect } from "react-redux";

import { TextInput } from "react-native-gesture-handler";

import { handleAddDeck } from "../actions";

import SubmitBtn from "./SubmitBtn";

const AddDeck = ({ dispatch, navigation }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (input) => {
    setInput(input);
  };

  const submit = () => {
    const deck = {
      title: input,
      questions: [],
    };
    dispatch(handleAddDeck(deck));
    setInput("");
    navigation.navigate("DeckDisplay", { title: input });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.heading}>Enter Deck Title</Text>
      <View style={{ flexDirection: "row", height: 40 }}>
        <TextInput
          value={input}
          style={styles.input}
          placeholder="Deck title"
          onChangeText={handleInputChange}
        />
      </View>
      <SubmitBtn
        onPress={submit}
        disabled={input.length === 0 ? true : false}
        text="Create Deck"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    padding: 30,
    color: black,
  },
  input: {
    marginTop: 10,
    marginBottom: 15,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: 300,
  },
});

export default connect()(AddDeck);
