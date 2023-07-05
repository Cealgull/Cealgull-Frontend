import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import React from "react";

const PostCardStyle = StyleSheet.create({
  contentCard: {
    paddingBottom: 10,
    paddingLeft: "5%",
    paddingTop: 10,
  },
  personCard: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: "5%",
    paddingTop: 10,
  },
  personCardName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
  titleCard: {
    borderBottomWidth: 0.5,
    paddingLeft: "5%",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  whole: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginLeft: "3%",
    marginTop: "2%",
    width: "94%",
  },
});

interface PostCardInterface {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
}

export const PostCard = ({
  children,
  title,
  username,
  userAvatar,
}: PostCardInterface) => {
  return (
    <View style={PostCardStyle.whole}>
      <View style={PostCardStyle.personCard}>
        <Avatar rounded size={40} source={{ uri: userAvatar }} />
        <Text style={PostCardStyle.personCardName}>{username}</Text>
      </View>
      <View style={PostCardStyle.titleCard}>
        {title && <Text style={PostCardStyle.titleText}>{title}</Text>}
      </View>
      <View style={PostCardStyle.contentCard}>{children}</View>
    </View>
  );
};
