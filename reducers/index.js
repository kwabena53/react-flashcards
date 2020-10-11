import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_CARD:
      const { card, title } = action;
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: {
            title: title,
            questions: state.decks[title].questions.concat([card]),
          },
        },
      };
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck,
        },
      };

    default:
      return state;
  }
}

export default decks;
