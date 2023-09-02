import { Icon } from "@rneui/themed";
import { numericCarry } from "@src/utils/numericCarry";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CardContent } from "./CardContent";
import { ImageList } from "../ImageList";
import { timeTransfer } from "@src/utils/timeTransfer";
import { ReplyCard } from "../ReplyCard";

interface PostCardProps {
  level: number;
  postInfo: ForumPost;
}

export default function PostCard({
  postInfo: {
    id,
    hash,
    creator,
    content,
    createAt,
    updateAt,
    replyTo,
    assets,
    upvotes,
    downvotes,
    belongTo,
  },
  level,
}: PostCardProps) {
  const [isDisplayReply, setIsDisplyReply] = useState<boolean>(false);

  const handleLike = () => {
    // TODO like
  };
  const handleDislike = () => {
    // TODO dislike
  };
  const handleComment = () => {
    // TODO comment
  };
  const handleDisplayReply = () => {
    setIsDisplyReply(!isDisplayReply);
  };

  const SimpleReply = () => {
    if (replyTo === null) return null;
    return (
      <TouchableOpacity onPress={handleDisplayReply}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon color="#00BFFF" type="fontawesome5" name="reply" size={20} />
          <Text
            style={PostCardStyle.simpleReply}
          >{`@${replyTo.creator.username}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const TimeInfoCard = () => {
    if (createAt === updateAt)
      return (
        <View style={{ flexDirection: "row-reverse" }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={PostCardStyle.createTime}>{`创建于${timeTransfer(
              createAt
            )}`}</Text>
          </View>
        </View>
      );
    else
      return (
        <View style={{ flexDirection: "row-reverse" }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={PostCardStyle.createTime}>{`创建于${timeTransfer(
              createAt
            )}`}</Text>
            <Text style={PostCardStyle.updateTime}>{`更新于 ${timeTransfer(
              updateAt
            )}`}</Text>
          </View>
        </View>
      );
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
  const imageList: string[] = getImageList(assets);

  return (
    <View style={PostCardStyle.whole}>
      <View style={PostCardStyle.topCard}>
        <Text style={PostCardStyle.level}>{`#${level}`}</Text>
        <SimpleReply />
      </View>
      <ReplyCard replyInfo={replyTo} isDisplay={isDisplayReply} />
      <CardContent username={creator.username} userAvatar={creator.avatar}>
        <Text>{content}</Text>
      </CardContent>
      <ImageList imageUri={imageList} />
      <TimeInfoCard />

      <View style={PostCardStyle.bottomCard}>
        <TouchableOpacity onPress={handleLike}>
          <View testID="goodButton" style={PostCardStyle.iconview}>
            <Icon size={24} color="#8B8989" type="antdesign" name="like2" />
            <Text style={PostCardStyle.icontext}>
              {numericCarry(upvotes.length)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDislike}>
          <View testID="badButton" style={PostCardStyle.iconview}>
            <Icon size={24} color="#8B8989" type="antdesign" name="dislike2" />
            <Text style={PostCardStyle.icontext}>
              {numericCarry(downvotes.length)}
            </Text>
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
  level: {
    color: "rgb(100,100,100)",
  },
  createTime: {
    paddingRight: "4%",
    color: "#FF7256",
  },
  updateTime: {
    paddingRight: "4%",
    color: "rgb(150,150,150)",
  },
  topCard: {
    borderBottomWidth: 1,
    borderColor: "rgb(230,230,230)",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    marginTop: 5,
  },
  simpleReply: {
    paddingLeft: 4,
    fontWeight: "bold",
    color: "#00BFFF",
  },
  whole: {
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: "1.5%",
    marginTop: "2%",
    width: "97%",
  },
});
