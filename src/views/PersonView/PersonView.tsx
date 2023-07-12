import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function PersonView() {
  return (
    <View style={PersonViewStyle.whole}>
      <View style={{ backgroundColor: "rgb(225,225,225)" }}>
        <HeaderBarWrapper alignMethod="c">
          <Text>Person</Text>
        </HeaderBarWrapper>
      </View>

      <ScrollView style={PersonViewStyle.content}>
        <Text>content</Text>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const PersonViewStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  whole: {
    flex: 1,
  },
});
