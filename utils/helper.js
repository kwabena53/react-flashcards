import React from "react";

import { AsyncStorage, Text } from "react-native";

import * as Permissions from "expo-permissions";

import { Notifications } from "expo";

const NOTIFICATION_KEY = "Flashcards:notifications";

export function removeLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Flashcards!",
    body: "Wanna take some quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();

            tomorrow.setDate(tomorrow.getDate() + 1);

            tomorrow.setHours(20);

            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,

              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export const cardsCount = (num) => {
  if (num === 0 || num > 1) {
    return <Text>{num} Cards</Text>;
  } else {
    return <Text>Only 1 Card</Text>;
  }
};
