import { Icon } from "@rneui/themed";
import { numericCarry } from "@src/utils/forumUtils";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CardContent } from "./CardContent";
import { ImageList } from "../ImageList";
import {
  timeTransfer,
  isInVoteList,
  upvoteColorSelector,
  downvoteColorSelector,
} from "@src/utils/forumUtils";
import { ReplyCard } from "../ReplyCard";
import Toast from "react-native-toast-message";
import { forumVote, getImageIpfsPath } from "@src/services/forum";
import { ReplyToInfo } from "@src/views/TopicView";

interface PostCardProps {
  postInfo: ForumPost;
  level: number;
  loginWallet: string;
  setReplyInfo?: React.Dispatch<React.SetStateAction<ReplyToInfo>>;
}

export default function PostCard({
  postInfo: {
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
  loginWallet,
  setReplyInfo,
}: PostCardProps) {
  const [isDisplayReply, setIsDisplyReply] = useState<boolean>(false);
  const [isUpVote, setIsUpVote] = useState<boolean>(
    isInVoteList(upvotes, loginWallet)
  );
  const [isDownVote, setIsDownVote] = useState<boolean>(
    isInVoteList(downvotes, loginWallet)
  );
  const [upvotesNum, setUpvotesNum] = useState<number>(upvotes.length);
  const [downvotesNum, setDownvotesNum] = useState<number>(downvotes.length);

  const postToastOpen = (
    isUpvote: boolean,
    isCancel: boolean,
    isError: boolean
  ) => {
    const voteTitleWord = isUpvote ? "Upvote" : "Downvote";
    const cancelTitleWord = isCancel ? "Cancel" : "";
    const errorTitleWord = isError ? "Error" : "Success";
    const type = isError ? "error" : isCancel ? "info" : "success";
    const emoji = isError ? "🙁" : isCancel ? "😢" : "🥰";
    const voteContentWord = isUpvote ? "upvote" : "downvote";
    const cancelContentWord = isCancel ? "cancel the" : "";

    const title = `${voteTitleWord} ${cancelTitleWord} ${errorTitleWord} ${emoji}`;
    const content = `You ${cancelContentWord} ${voteContentWord} to Post in level ${level}`;
    const error = `Maybe something went wrong`;
    Toast.show({
      type: type,
      visibilityTime: 3000,
      text1: title,
      text2: isError ? error : content,
    });
  };

  const handleLike = () => {
    try {
      forumVote(hash, "up", "Post");
      if (isDownVote && !isUpVote) {
        setDownvotesNum(downvotesNum - 1);
        setIsDownVote(false);
      }
      if (isUpVote) {
        setUpvotesNum(upvotesNum - 1);
        postToastOpen(true, true, false);
      } else {
        setUpvotesNum(upvotesNum + 1);
        postToastOpen(true, false, false);
      }
      setIsUpVote(!isUpVote);
    } catch (error) {
      if (isUpVote) postToastOpen(true, true, true);
      else postToastOpen(true, false, true);
    }
  };
  const handleDislike = () => {
    try {
      forumVote(hash, "down", "Post");
      if (isUpVote && !isDownVote) {
        setUpvotesNum(upvotesNum - 1);
        setIsUpVote(false);
      }
      if (isDownVote) {
        setDownvotesNum(downvotesNum - 1);
        postToastOpen(false, true, false);
      } else {
        setDownvotesNum(downvotesNum + 1);
        postToastOpen(false, false, false);
      }
      setIsDownVote(!isDownVote);
    } catch (error) {
      if (isDownVote) postToastOpen(false, true, true);
      else postToastOpen(false, false, true);
    }
  };
  const handleComment = () => {
    if (setReplyInfo != null)
      setReplyInfo({ ReplyUser: creator.username, Replyhash: hash });
  };
  const handleDisplayReply = () => {
    setIsDisplyReply(!isDisplayReply);
  };

  const SimpleReply = () => {
    if (replyTo === null) return null;
    return (
      <TouchableOpacity testID="replyButton" onPress={handleDisplayReply}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={PostCardStyle.simpleReply}
          >{`@ ${replyTo.creator.username}`}</Text>
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
        response.push(getImageIpfsPath(item.cid));
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
      <CardContent
        username={creator.username}
        userAvatar={creator.avatar}
        activeBadge={creator.badge}
        activeRole={creator.role}
      >
        <Text>{content}</Text>
      </CardContent>
      <ImageList imageUri={imageList} />
      <TimeInfoCard />
      <View style={PostCardStyle.bottomCard}>
        <TouchableOpacity testID="goodButton" onPress={handleLike}>
          <View style={PostCardStyle.iconview}>
            <Icon
              size={24}
              color={upvoteColorSelector(isUpVote)}
              type="antdesign"
              name="like2"
            />
            <Text
              style={[
                PostCardStyle.icontext,
                { color: upvoteColorSelector(isUpVote) },
              ]}
            >
              {numericCarry(upvotesNum)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity testID="badButton" onPress={handleDislike}>
          <View style={PostCardStyle.iconview}>
            <Icon
              size={24}
              color={downvoteColorSelector(isDownVote)}
              type="antdesign"
              name="dislike2"
            />
            <Text
              style={[
                PostCardStyle.icontext,
                { color: downvoteColorSelector(isDownVote) },
              ]}
            >
              {numericCarry(downvotesNum)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity testID="commentButton" onPress={handleComment}>
          <View style={PostCardStyle.iconview}>
            <Icon size={24} color="#8B8989" type="antdesign" name="message1" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PostCardStyle = StyleSheet.create({
  bottomCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    marginLeft: "5%",
    width: "45%",
    paddingTop: 10,
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
