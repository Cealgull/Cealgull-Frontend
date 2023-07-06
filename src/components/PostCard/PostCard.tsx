import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Avatar } from "@rneui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TouchableOpacity } from "react-native";

interface PostCardInterface {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
}

export default function PostCard({
  children,
  title,
  username,
  userAvatar,
}: PostCardInterface) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  return (
    <TouchableOpacity onPress={() => navigation.push("Topic")}>
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
    </TouchableOpacity>
  );
}

const PostCardStyle = StyleSheet.create({
  contentCard: {
    paddingBottom: 10,
    paddingLeft: "5%",
    paddingTop: 10,
  },
  personCard: {
    alignItems: "center",
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
    paddingLeft: "5%",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  whole: {
    backgroundColor: "rgb(220,220,220)",
    borderRadius: 10,
    marginLeft: "3%",
    marginTop: "2%",
    width: "94%",
  },
});
