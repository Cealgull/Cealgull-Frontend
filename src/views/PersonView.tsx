import React from "react";
import { NavBar } from "@src/components/NavBar";
import { StyleSheet, Text, View } from "react-native";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { ScrollView } from "react-native-gesture-handler";

export const PersonView: React.FC = () => {
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
};

const PersonViewStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  whole: {
    flex: 1,
  },
});
