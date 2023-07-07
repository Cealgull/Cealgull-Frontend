import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CardContent } from "./CardContent";
import { useNavigation } from "@react-navigation/native";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TopicTab } from "./TopicTab";
import { Icon } from "@rneui/themed";
import { numericCarry } from "@src/utils/numericCarry";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface TopicCardProps {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
  time: string;
  Tab?: string[];
}

export default function TopicCard({
  children,
  title,
  userAvatar,
  username,
  time,
}: TopicCardProps) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();
  return (
    <View style={TopicCardStyle.whole}>
      <View style={TopicCardStyle.topCard}>
        <Text style={TopicCardStyle.timestyle}>{time}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.push("Topic")}>
        <CardContent title={title} username={username} userAvatar={userAvatar}>
          {children}
        </CardContent>
      </TouchableOpacity>
      <View style={TopicCardStyle.bottomCard}>
        <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
          <TopicTab tabtitle="#聊天灌水" />
          <TopicTab tabtitle="#灌水聊天" />
          <TopicTab tabtitle="#灌水聊天" />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={TopicCardStyle.iconview}>
            <Icon size={16} color="#8B8989" type="antdesign" name="like2" />
            <Text style={TopicCardStyle.icontext}>{numericCarry(20101)}</Text>
          </View>
          <View style={TopicCardStyle.iconview}>
            <Icon size={16} color="#8B8989" type="antdesign" name="dislike2" />
            <Text style={TopicCardStyle.icontext}>{numericCarry(99001)}</Text>
          </View>
          <View style={TopicCardStyle.iconview}>
            <Icon size={16} color="#8B8989" type="antdesign" name="message1" />
            <Text style={TopicCardStyle.icontext}>{numericCarry(99)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const TopicCardStyle = StyleSheet.create({
  bottomCard: {
    borderColor: "rgb(230,230,230)",
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "row",
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
  },
  timestyle: {
    alignSelf: "flex-end",
    color: "#FF7256",
  },
  topCard: {
    borderBottomWidth: 1,
    borderColor: "rgb(230,230,230)",
    marginLeft: "5%",
    marginRight: "5%",
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
