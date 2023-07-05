import React from "react";
import { NavBar } from "@src/components/NavBar";
import { StyleSheet, Text, View } from "react-native";

export type PersonViewProps = undefined;

export const PersonView: React.FC = () => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>PersonView</Text>
      <Text style={HomeViewStyle.content}>Content</Text>
      <NavBar />
    </View>
  );
};

const HomeViewStyle = StyleSheet.create({
  content: {
    flex: 8,
  },
  head: {
    backgroundColor: "rgb(230, 230, 230)",
    flex: 1,
  },
  whole: {
    flex: 1,
  },
});
