import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Navbar } from "@src/Component/Navbar/Navbar";
import { PersonViewInterface } from "@src/Resources/RootStackData";
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
    backgroundColor: "rgb(230, 230, 230)",
    flex: 1,
  },
  content: {
    flex: 8,
  },
});

export const PersonView = ({ route, navigation }: PersonViewInterface) => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>PersonView</Text>
      <Text style={HomeViewStyle.content}>Content</Text>
      <Navbar>
        <NavHomeIcon></NavHomeIcon>
        <NavPublishIcon></NavPublishIcon>
        <NavMyIcon></NavMyIcon>
      </Navbar>
    </View>
  );
};
