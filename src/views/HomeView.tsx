import { NavBar } from "@src/components/NavBar";
import { PostCard } from "@src/components/PostCard/PostCard";
import { HomeViewInterface } from "@src/@types/navigation";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
