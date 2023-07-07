import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar } from "@rneui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TouchableOpacity } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface PostCardInterface {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
  time: string;
  reply?: string;
}

export default function PostCard({
  children,
  title,
  username,
  userAvatar,
  time,
  reply,
}: PostCardInterface) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  return (
    <TouchableOpacity onPress={() => navigation.push("Topic")}>
      <View style={PostCardStyle.whole}>
        <View style={PostCardStyle.topCard}>
          <Text style={PostCardStyle.timestyle}>{time}</Text>
          <Text style={PostCardStyle.replystyle}>
            {reply && "re: " + reply}
          </Text>
        </View>

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
    paddingLeft: "5%",
    paddingTop: 10,
  },
  personCardName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
  replystyle: {
    color: "rgb(100,100,100)",
    flex: 1,
  },
  timestyle: {
    color: "red",
    flex: 5,
    marginLeft: windowWidth * 0.04,
  },
  titleCard: {
    paddingLeft: "5%",
    paddingTop: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topCard: {
    flex: 1,
    flexDirection: "row",
    marginTop: windowHeight * 0.005,
  },
  whole: {
    backgroundColor: "rgb(220,220,220)",
    borderRadius: windowWidth * 0.06,
    marginLeft: windowWidth * 0.03,
    marginTop: windowHeight * 0.01,
    width: windowWidth * 0.94,
  },
});
