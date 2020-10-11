import React from "react";

import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";

import { black, lightblc, gray, white } from "../utils/colors";

const SubmitBtn = ({ onPress, disabled, text }) => {
  return (
    <TouchableOpacity
      style={[
        Platform.OS === "ios" ? styles.iosButton : styles.androidButton,
        disabled ? styles.inactive : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[disabled ? { color: gray } : { color: white }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iosButton: {
    backgroundColor: black,
    borderRadius: 5,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 200,
    padding: 10,
  },
  androidButton: {
    backgroundColor: black,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    height: 40,
    width: 200,
    padding: 10,
  },
  inactive: {
    backgroundColor: lightblc,
  },
});

export default SubmitBtn;
