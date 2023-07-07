import { StyleSheet, Text, View } from "react-native";

interface TopicTabProps {
  tabtitle: string;
}

export const TopicTab = ({ tabtitle }: TopicTabProps) => {
  return (
    <View style={TopicTabCardStyle.whole}>
      <Text style={TopicTabCardStyle.text}>{tabtitle}</Text>
    </View>
  );
};

const TopicTabCardStyle = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
  },
  whole: {
    backgroundColor: "red",
    borderRadius: 20,
    marginRight: 1,
    marginTop: 1,
    padding: 4,
  },
});
