import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { getTextIpfs } from "@src/services/viewService/getContent";
import { getUserInfo } from "@src/services/viewService/getUserInfo";
import { numericCarry } from "@src/utils/numericCarry";
import { timeTransfer } from "@src/utils/timeTransfer";
import { useQuery } from "@tanstack/react-query";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CardContent } from "./CardContent";
import { TopicTab } from "./TopicTab";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TopicCard({
  cid,
  createTime,
  creator,
  id,
  tags,
  title,
}: ForumTopic) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  // FIXME useQuery. It may be a little bit hard to begin.
  const Tagicons = tags.map((tag) => {
    return <TopicTab tabtitle={tag} key={tag} />;
  });
  const { data: contentText } = useQuery<string>({
    queryKey: ["TopicContent", cid],
    queryFn: async () => await getTextIpfs(cid),
  });
  const { isSuccess, data: userInfo } = useQuery<UserInfo>({
    queryKey: ["User", creator],
    queryFn: async () => await getUserInfo(creator),
  });

  if (!isSuccess)
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Is Loading...
      </Text>
    );
  return (
    <View style={TopicCardStyle.whole}>
      <View style={TopicCardStyle.topCard}>
        <Text style={TopicCardStyle.timestyle}>{timeTransfer(createTime)}</Text>
      </View>
      <TouchableOpacity
        testID="TopicCardButton"
        onPress={() => navigation.push("Topic", { id: id })}
      >
        <CardContent
          title={title}
          username={userInfo.username}
          userAvatar={userInfo.avatar}
        >
          <Text>{contentText}</Text>
        </CardContent>
      </TouchableOpacity>
      <View style={TopicCardStyle.bottomCard}>
        <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
          {[...Tagicons]}
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
    marginHorizontal: "5%",
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
