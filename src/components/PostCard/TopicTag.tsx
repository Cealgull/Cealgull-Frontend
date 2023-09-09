import { StyleSheet, Text, View } from "react-native";
import { tagColorSwitcher } from "@src/utils/forumUtils";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainScreenPropsGeneric } from "@src/@types/navigation";

interface TopicTagProps {
  tagTitle: string;
  color?: string;
  isCategory: boolean;
}

export const TopicTag = ({
  tagTitle,
  color = "",
  isCategory,
}: TopicTagProps) => {
  const navigation =
    useNavigation<MainScreenPropsGeneric<"Home">["navigation"]>();
  const navigateProps = {
    pageSize: 10,
    ...(isCategory
      ? { category: tagTitle, tags: [] }
      : { category: "", tags: [tagTitle] }),
  };
  const handleFilter = () => {
    navigation.navigate("Home", navigateProps);
  };
  return (
    <TouchableOpacity testID="tagFilter" onPress={handleFilter}>
      <View
        style={[
          TopicTabCardStyle.whole,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <View
          style={[
            TopicTabCardStyle.colorView,
            { backgroundColor: color ? color : tagColorSwitcher(tagTitle) },
          ]}
        />
        <Text style={TopicTabCardStyle.text}>{tagTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TopicTabCardStyle = StyleSheet.create({
  text: {
    marginRight: 2,
  },
  colorView: {
    borderRadius: 10,
    width: 16,
    height: 16,
    marginRight: 2,
  },
  whole: {
    borderRadius: 10,
    marginRight: 1,
    marginTop: 2,
    padding: 1,
    borderColor: "#BEBEBE",
    borderWidth: 1,
  },
});
