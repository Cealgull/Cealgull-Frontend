import React from "react";
import { Text, View } from "react-native";
import { TopicViewInterface } from "@src/Resources/RootStackData";

export const TopicView = ({ route, navigation }: TopicViewInterface) => {
  return (
    <View>
      <Text>Topic View </Text>
    </View>
  );
};
