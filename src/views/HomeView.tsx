import { NavBar } from "@src/components/NavBar";
import { TopicCard } from "@src/components/PostCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export const HomeView: React.FC = () => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>HomeView</Text>
      <View style={HomeViewStyle.content}>
        <ScrollView>
          <TopicCard
            username="User1"
            userAvatar="https://randomuser.me/api/portraits/men/36.jpg"
            title="HELLO"
            time="2023/7/6 11:01"
          >
            <Text>HELLO WORLD!</Text>
          </TopicCard>
          <TopicCard
            username="User1"
            userAvatar="https://randomuser.me/api/portraits/men/36.jpg"
            title="HELLO"
            time="2023/7/6 11:01"
          >
            <Text>HELLO WORLD!</Text>
          </TopicCard>
        </ScrollView>
      </View>
      <NavBar />
    </View>
  );
};

const HomeViewStyle = StyleSheet.create({
  content: {
    backgroundColor: "rgb(240,240,240)",
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
