import "react-native-gesture-handler";

import React, { Component } from "react";

import { createStore } from "redux";

import { StatusBar, Platform, View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { setLocalNotification } from "./utils/helper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Constants from "expo-constants";

import DeckList from "./components/DeckList";

import AddDeck from "./components/AddDeck";

import { white, black } from "./utils/colors";

import middleware from "./middleware";

import Quiz from "./components/Quiz";

import DeckDisplay from "./components/DeckDisplay";

import reducer from "./reducers";

import AddCard from "./components/AddCard";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

const RouteConfigs = {
  DeckList: {
    name: "Decks",
    component: DeckList,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: "Decks",
    },
  },
  AddDeck: {
    component: AddDeck,
    name: "Add Deck",
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
      title: "New Deck",
    },
  },
};

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : black,
    },
  },
};

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs["DeckList"]} />
    <Tab.Screen {...RouteConfigs["AddDeck"]} />
  </Tab.Navigator>
);

const StackConfig = {
  TabNavigator: {
    name: "Home",
    component: TabNavigator,
    options: { headerShown: false },
  },

  DeckDisplay: {
    name: "DeckDisplay",
    component: DeckDisplay,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
      title: "Deck View",
    },
  },

  Quiz: {
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },

  AddCard: {
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
};

const StackNavigatorConfig = {
  headerMode: "screen",
};

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig["TabNavigator"]} />
    <Stack.Screen {...StackConfig["Quiz"]} />
    <Stack.Screen {...StackConfig["DeckDisplay"]} />
    <Stack.Screen {...StackConfig["AddCard"]} />
  </Stack.Navigator>
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, middleware);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashcardStatusBar backgroundColor={black} />
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
