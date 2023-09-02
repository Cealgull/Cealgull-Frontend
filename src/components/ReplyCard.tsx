import { StyleSheet, Text, View } from "react-native";

interface ReplyCardProps {
  replyInfo: ForumPost | null;
  isDisplay: boolean;
}

export const ReplyCard = ({ replyInfo, isDisplay }: ReplyCardProps) => {
  if (isDisplay && replyInfo !== null) {
    return (
      <View style={ReplyCardStyle.whole}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            {`${replyInfo.creator.username}: `}
          </Text>
          {replyInfo.content}
        </Text>
      </View>
    );
  } else {
    return <></>;
  }
};

const ReplyCardStyle = StyleSheet.create({
  whole: {
    borderRadius: 10,
    width: "92%",
    marginLeft: "4%",
    marginVertical: 4,
    backgroundColor: "#F0FFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
