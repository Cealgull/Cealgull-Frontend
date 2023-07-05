import React from "react";
import { Text, View } from "react-native";
import { TopicViewInterface } from "@src/@types/navigation";

export const TopicView = ({ route, navigation }: TopicViewInterface) => {
  return (
    <View>
      <Text>Topic View </Text>
    </View>
  );
};
