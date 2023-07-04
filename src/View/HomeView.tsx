import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Navbar } from "@src/Component/Navbar/Navbar";
import { HomeViewInterface } from "@src/Resources/RootStackData";
import {
  NavMyIcon,
  NavPublishIcon,
  NavHomeIcon,
} from "@src/Component/Navbar/NavIcon";
import { PostCard } from "@src/Component/PostCard/PostCard";

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

export const HomeView = ({ route, navigation }: HomeViewInterface) => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>HomeView</Text>
      <View style={HomeViewStyle.content}>
        <ScrollView>
          <PostCard
            username="User1"
            useravatar="https://randomuser.me/api/portraits/men/36.jpg"
            title="HELLO"
          >
            <Text>HELLO WORLD!</Text>
          </PostCard>
        </ScrollView>
      </View>
      <Navbar>
        <NavHomeIcon></NavHomeIcon>
        <NavPublishIcon></NavPublishIcon>
        <NavMyIcon></NavMyIcon>
      </Navbar>
    </View>
  );
};
