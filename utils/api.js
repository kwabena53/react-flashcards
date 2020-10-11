import { AsyncStorage } from "react-native";

export const DECK_STORAGE = "UdaciFlashCards:data";

const data = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
        isCorrect: "true",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
        isCorrect: "true",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
        isCorrect: "true",
      },
    ],
  },
};

export function removeDecks() {
  return AsyncStorage.removeItem(DECK_STORAGE);
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE).then((response) => {
    if (response === null) {
      AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(data));
      return data;
    } else {
      return JSON.parse(response);
    }
  });
}

export function addNewDeck(title) {
  return getDecks()
    .then((data) => {
      return {
        ...data,
        [title]: {
          title,
          questions: [],
        },
      };
    })
    .then((newDecks) => {
      AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(newDecks));
    });
}

export function addCardToDeck(card, title) {
  getDecks()
    .then((decks) => {
      return {
        ...decks,
        [title]: {
          questions: decks[title].questions.concat([card]),
        },
      };
    })
    .then((newDecks) => {
      AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(newDecks));
    });
}
