import { addNewDeck, getDecks } from "../utils/api";

export const ADD_DECK = "ADD_DECK";

export const ADD_CARD = "ADD_CARD";

export const RECEIVE_DECKS = "RECEIVE_DECKS";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addCard(card, title) {
  return {
    type: ADD_CARD,
    card,
    title,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks({ decks }));
    });
  };
}

export function handleAddDeck(deck) {
  return (dispatch) => {
    dispatch(addDeck(deck));
    return addNewDeck(deck.title);
  };
}
