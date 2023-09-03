import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { numericCarry } from "@src/utils/numericCarry";
import { timeTransfer } from "@src/utils/timeTransfer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CardContent } from "./CardContent";
import { TopicTag } from "./TopicTag";
import { ImageList } from "../ImageList";

interface TopicCardProps {
  topicInfo: ForumTopic;
  canjump: boolean;
}

export default function TopicCard({
  topicInfo,
  canjump = true,
}: TopicCardProps) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  const tagIconList: JSX.Element[] = topicInfo.tagsAssigned.map((tag) => {
    return <TopicTag isCategory={false} tagTitle={tag.name} key={tag.id} />;
  });

  const handleLike = () => {
    //TODO
    if (canjump) return;
    console.log("Like");
  };

  const handleDislike = () => {
    //TODO
    if (canjump) return;
    console.log("Dislike");
  };

  const handleComment = () => {
    //TODO
    if (canjump) return;
    console.log("Comment");
  };

  const getImageList = (assetList: Asset[]): string[] => {
    const response: string[] = [];
    const regular = /image/;
    for (const item of assetList) {
      if (regular.test(item.contentType)) {
        response.push(item.cid);
      }
    }
    return response;
  };
  const imageList: string[] = getImageList(topicInfo.assets);

  return (
    <View style={TopicCardStyle.whole}>
      <View style={TopicCardStyle.topCard}>
        <TopicTag
          isCategory={true}
          tagTitle={topicInfo.categoryAssigned.name}
        ></TopicTag>
        <Text style={TopicCardStyle.createTime}>
          {`创建于 ${timeTransfer(topicInfo.createdAt)}`}
        </Text>
      </View>
      <TouchableOpacity
        testID="TopicCardButton"
        onPress={() => {
          if (!canjump) return;
          navigation.push("Topic", {
            pageSize: 10,
            topTopic: topicInfo,
          });
        }}
      >
        <CardContent
          title={topicInfo.title}
          username={topicInfo.creator.username}
          userAvatar={topicInfo.creator.avatar}
        >
          <Text>{topicInfo.content}</Text>
        </CardContent>
      </TouchableOpacity>
      <ImageList imageUri={imageList} />
      {topicInfo.createdAt !== topicInfo.updatedAt && (
        <View style={{ flexDirection: "row-reverse" }}>
          <Text style={TopicCardStyle.updateTime}>{`更新于 ${timeTransfer(
            topicInfo.updatedAt
          )}`}</Text>
        </View>
      )}
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
            <TouchableOpacity onPress={handleLike}>
              <Icon size={20} color="#8B8989" type="antdesign" name="like2" />
              <Text style={TopicCardStyle.icontext}>{numericCarry(20101)}</Text>
            </TouchableOpacity>
          </View>
          <View style={TopicCardStyle.iconview}>
            <TouchableOpacity onPress={handleDislike}>
              <Icon
                size={20}
                color="#8B8989"
                type="antdesign"
                name="dislike2"
              />
              <Text style={TopicCardStyle.icontext}>{numericCarry(99001)}</Text>
            </TouchableOpacity>
          </View>
          <View style={TopicCardStyle.iconview}>
            <TouchableOpacity onPress={handleComment}>
              <Icon
                size={20}
                color="#8B8989"
                type="antdesign"
                name="message1"
              />
              <Text style={TopicCardStyle.icontext}>{numericCarry(99)}</Text>
            </TouchableOpacity>
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
  createTime: {
    alignSelf: "flex-end",
    color: "#FF7256",
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "rgb(230,230,230)",
    marginHorizontal: "5%",
    paddingVertical: "1%",
  },
  whole: {
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: "1.5%",
    marginTop: "2%",
    width: "97%",
  },
  updateTime: {
    paddingRight: "4%",
    color: "rgb(150,150,150)",
  },
});
