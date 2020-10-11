import React, { Component } from "react";

import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { connect } from "react-redux";

import { handleInitialData } from "../actions";

import Deck from "./Deck";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        {decks &&
          Object.keys(decks).map((key) => {
            const { title, questions } = decks[key];
            console.log(title);
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  navigation.navigate("DeckDisplay", { title: key })
                }
              >
                <Deck title={title} count={questions.length} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: 10,
  },
});

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
