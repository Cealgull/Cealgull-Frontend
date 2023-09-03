/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";

const inset = {
  top: 47,
  right: 0,
  bottom: 34,
  left: 0,
};

export const SafeAreaProvider = ({ children }) => children;

export const SafeAreaConsumer = ({ children }) => children(inset);

export const SafeAreaView = ({ children }) => (
  <View style={inset}>{children}</View>
);

export const useSafeAreaInsets = () => inset;

export const useSafeAreaFrame = () => ({
  height: 844,
  with: 390,
  x: 0,
  y: 0,
});

export const SafeAreaInsetsContext = React.createContext(inset);
