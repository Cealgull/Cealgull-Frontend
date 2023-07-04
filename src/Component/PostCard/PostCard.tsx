import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import React from "react";

const PostCardStyle = StyleSheet.create({
  contentcard: {
    paddingBottom: 10,
    paddingLeft: "5%",
    paddingTop: 10,
  },
  personcard: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: "5%",
    paddingTop: 10,
  },
  personcardname: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
  titleCard: {
    borderBottomWidth: 0.5,
    paddingLeft: "5%",
  },
  titletext: {
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
  children: React.ReactNode;
  title?: string;
  username: string;
  useravatar: string;
}

export const PostCard = ({
  children,
  title,
  username,
  useravatar,
}: PostCardInterface) => {
  return (
    <View style={PostCardStyle.whole}>
      <View style={PostCardStyle.personcard}>
        <Avatar rounded size={40} source={{ uri: useravatar }} />
        <Text style={PostCardStyle.personcardname}>{username}</Text>
      </View>
      <View style={PostCardStyle.titleCard}>
        {title && <Text style={PostCardStyle.titletext}>{title}</Text>}
      </View>
      <View style={PostCardStyle.contentcard}>{children}</View>
    </View>
  );
};
