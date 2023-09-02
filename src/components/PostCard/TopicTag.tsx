import { StyleSheet, Text, View } from "react-native";
import { tagColorSwitcher } from "@src/utils/tagColor";
import { useNavigation } from "@react-navigation/native";
import { TabScreenPropsGeneric } from "@src/@types/navigation";

interface TopicTagProps {
  tagTitle: string;
  isCategory: boolean;
}

export const TopicTag = ({ tagTitle, isCategory }: TopicTagProps) => {
  const navigation =
    useNavigation<TabScreenPropsGeneric<"Home">["navigation"]>();
  const navigateProps = {
    pageSize: 10,
    ...(isCategory
      ? { category: tagTitle, tags: "" }
      : { category: "", tags: tagTitle }),
  };
  const handleFilter = () => {
    navigation.navigate("Home", navigateProps);
  };
  return (
    <View
      style={[
        TopicTabCardStyle.whole,
        { backgroundColor: tagColorSwitcher(tagTitle) },
      ]}
    >
      <Text onPress={handleFilter} style={TopicTabCardStyle.text}>
        {tagTitle}
      </Text>
    </View>
  );
};

const TopicTabCardStyle = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
  },
  whole: {
    borderRadius: 6,
    marginRight: 1,
    marginTop: 1,
    padding: 1,
  },
});
