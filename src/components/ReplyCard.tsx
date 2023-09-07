import { StyleSheet, Text, View } from "react-native";

interface ReplyCardProps {
  replyInfo: ForumPost | null;
  isDisplay: boolean;
}

export const ReplyCard = ({ replyInfo, isDisplay }: ReplyCardProps) => {
  if (isDisplay && replyInfo !== null) {
    return (
      <View style={ReplyCardStyle.whole}>
        <Text style={ReplyCardStyle.name}>
          {`回复 ${replyInfo.creator.username}: `}
        </Text>
        <Text style={ReplyCardStyle.content}>{replyInfo.content}</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

const ReplyCardStyle = StyleSheet.create({
  name: {
    fontWeight: "bold",
    color: "#696969",
  },
  content: {
    color: "#4F4F4F",
  },
  whole: {
    borderRadius: 10,
    width: "92%",
    marginLeft: "4%",
    marginVertical: 4,
    backgroundColor: "#EEE9E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
