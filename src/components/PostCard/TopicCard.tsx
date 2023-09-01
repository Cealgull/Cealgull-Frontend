import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { numericCarry } from "@src/utils/numericCarry";
import { timeTransfer } from "@src/utils/timeTransfer";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CardContent } from "./CardContent";
import { TopicTag } from "./TopicTag";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TopicCard({
  id,
  hash,
  title,
  creator,
  avatar,
  content,
  categoryAssigned,
  tagsAssigned,
  upvotes,
  downvotes,
  assets,
  closed,
  createdAt,
  updatedAt,
}: ForumTopic) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  const tagIconList: JSX.Element[] = tagsAssigned.map((tag) => {
    return <TopicTag isCategory={false} tagTitle={tag.name} key={tag.id} />;
  });

  const prop: ForumTopic = {
    id,
    hash,
    title,
    creator,
    avatar,
    content,
    categoryAssigned,
    tagsAssigned,
    upvotes,
    downvotes,
    assets,
    closed,
    createdAt,
    updatedAt,
  };

  return (
    <View style={TopicCardStyle.whole}>
      <View style={TopicCardStyle.topCard}>
        <TopicTag isCategory={true} tagTitle={categoryAssigned.name}></TopicTag>
        <Text style={TopicCardStyle.timestyle}>{timeTransfer(createdAt)}</Text>
      </View>
      <TouchableOpacity
        testID="TopicCardButton"
        onPress={() =>
          navigation.push("Topic", {
            pageSize: 10,
            topTopic: prop,
          })
        }
      >
        <CardContent
          title={title}
          username={creator.username}
          userAvatar={creator.avatar}
        >
          <Text>{content}</Text>
        </CardContent>
      </TouchableOpacity>
      <View style={TopicCardStyle.bottomCard}>
        <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
          {tagIconList}
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
    flexDirection: "row",
    justifyContent: "space-between",
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
