import { NavBar } from "@src/components/NavBar";
import { PublishViewInterface } from "@src/@types/navigation";
import { StyleSheet, Text, View } from "react-native";

export const PublishView = ({ route, navigation }: PublishViewInterface) => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>PublishView</Text>
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
