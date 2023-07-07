import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PostCard } from "@src/components/PostCard";
import { ScrollView } from "react-native-gesture-handler";

export type TopicViewProps = undefined;

export const TopicView: React.FC = () => {
  return (
    <View style={TopicViewStyle.whole}>
      <View style={TopicViewStyle.header}>
        <Text>Topic Topic Topic </Text>
      </View>
      <View style={TopicViewStyle.content}>
        <ScrollView>
          <PostCard
            username="User1"
            userAvatar="https://randomuser.me/api/portraits/men/36.jpg"
            title="HELLO"
            time="2023/7/6 11:01"
            level={1}
          >
            <Text>HELLO WORLD!</Text>
            <Text>HELLO WORLD!</Text>
          </PostCard>
          <PostCard
            username="User1"
            userAvatar="https://randomuser.me/api/portraits/men/36.jpg"
            time="2023/7/6 11:01"
            reply={1}
            level={2}
          >
            <Text>HELLO WORLD!</Text>
          </PostCard>
        </ScrollView>
      </View>
    </View>
  );
};

const TopicViewStyle = StyleSheet.create({
  content: {
    flex: 9,
  },
  header: {
    flex: 1,
  },
  whole: {
    flex: 1,
  },
});
