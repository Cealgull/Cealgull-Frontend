import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { PostCard } from "@src/components/PostCard";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export type TopicViewProps = {
  tid: string;
};

export const TopicView = ({ tid }: TopicViewProps) => {
  return (
    <View style={TopicViewStyle.whole}>
      <View style={{ backgroundColor: "rgb(225,225,225)" }}>
        <HeaderBarWrapper alignMethod="c">
          <Text>Topic</Text>
        </HeaderBarWrapper>
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
            <Text>{tid}</Text>
          </PostCard>
          <PostCard
            username="User1"
            userAvatar="https://randomuser.me/api/portraits/men/36.jpg"
            time="2023/7/6 11:01"
            reply={1}
            level={2}
          >
            <Text>{tid}</Text>
          </PostCard>
        </ScrollView>
      </View>
    </View>
  );
};

const TopicViewStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  whole: {
    flex: 1,
  },
});
