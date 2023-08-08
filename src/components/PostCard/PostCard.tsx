import { Icon } from "@rneui/themed";
import { numericCarry } from "@src/utils/numericCarry";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CardContent } from "./CardContent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface PostCardProps {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
  time: string;
  reply?: number;
  level: number;
}

export default function PostCard({
  children,
  title,
  username,
  userAvatar,
  time,
  reply,
  level,
}: PostCardProps) {
  const handleLike = () => {
    // TODO like
  };
  const handleDislike = () => {
    // TODO dislike
  };
  const handleComment = () => {
    // TODO comment
  };
  return (
    <View style={PostCardStyle.whole}>
      <View style={PostCardStyle.topCard}>
        <Text style={PostCardStyle.timestyle}>{time}</Text>
        {/* FIXME don't use space to control the layout */}
        <Text style={PostCardStyle.replystyle}>
          {`#${level}`}
          {reply && `    回复#${reply}`}
        </Text>
      </View>
      <CardContent title={title} username={username} userAvatar={userAvatar}>
        {children}
      </CardContent>
      <View style={PostCardStyle.bottomCard}>
        <TouchableOpacity onPress={handleLike}>
          <View testID="goodButton" style={PostCardStyle.iconview}>
            <Icon size={24} color="#8B8989" type="antdesign" name="like2" />
            <Text style={PostCardStyle.icontext}>{numericCarry(1)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDislike}>
          <View testID="badButton" style={PostCardStyle.iconview}>
            <Icon size={24} color="#8B8989" type="antdesign" name="dislike2" />
            <Text style={PostCardStyle.icontext}>{numericCarry(2)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <View testID="commentButton" style={PostCardStyle.iconview}>
            <Icon size={24} color="#8B8989" type="antdesign" name="message1" />
            <Text style={PostCardStyle.icontext}>{numericCarry(3)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PostCardStyle = StyleSheet.create({
  bottomCard: {
    borderColor: "rgb(230,230,230)",
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginLeft: "5%",
    marginRight: "5%",
    paddingTop: 5,
  },
  icontext: {
    color: "#8B8989",
    marginLeft: 2,
  },
  iconview: {
    alignItems: "center",
    flexDirection: "row",
    padding: 3,
  },
  replystyle: {
    color: "rgb(100,100,100)",
  },
  timestyle: {
    color: "#FF7256",
  },
  topCard: {
    borderBottomWidth: 1,
    borderColor: "rgb(230,230,230)",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    marginTop: 5,
  },
  whole: {
    backgroundColor: "white",
    borderRadius: windowWidth * 0.04,
    marginLeft: windowWidth * 0.015,
    marginTop: windowHeight * 0.01,
    width: windowWidth * 0.97,
  },
});
