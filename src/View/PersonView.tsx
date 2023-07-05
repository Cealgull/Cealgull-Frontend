import { NavBar } from "@src/Component/Navbar";
import { PersonViewInterface } from "@src/Resources/RootStackData";
import { StyleSheet, Text, View } from "react-native";

export const PersonView = ({ route, navigation }: PersonViewInterface) => {
  return (
    <View style={HomeViewStyle.whole}>
      <Text style={HomeViewStyle.head}>PersonView</Text>
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
