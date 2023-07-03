import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Navbar } from "@src/Component/Navbar/Navbar";
import { HomeViewInterface } from "@src/Resources/RootStackData";
import {
  NavMyIcon,
  NavPublishIcon,
  NavHomeIcon,
} from "@src/Component/Navbar/NavIcon";

const HomeViewStyle = StyleSheet.create({
  whole: {
    flex: 1,
  },
  head: {
    flex: 1,
  },
  content: {
    flex: 8,
  },
});

export const HomeView = ({ route, navigation }: HomeViewInterface) => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>Header</Text>
      <Text style={HomeViewStyle.content}>Content</Text>
      <Navbar>
        <NavHomeIcon></NavHomeIcon>
        <NavPublishIcon></NavPublishIcon>
        <NavMyIcon></NavMyIcon>
      </Navbar>
    </View>
  );
};
