import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import {
  numericCarry,
  timeTransfer,
  isInVoteList,
  upvoteColorSelector,
  downvoteColorSelector,
} from "@src/utils/forumUtils";
import {} from "@src/utils/forumUtils";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CardContent } from "./CardContent";
import { TopicTag } from "./TopicTag";
import { ImageList } from "../ImageList";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { getImageIpfsPath } from "@src/services/forum";
import { ReplyToInfo } from "@src/views/TopicView";

interface TopicCardProps {
  topicInfo: ForumTopic;
  canjump: boolean;
  loginWallet?: string;
  setReplyInfo?: React.Dispatch<React.SetStateAction<ReplyToInfo>>;
}

export default function TopicCard({
  topicInfo,
  canjump = true,
  loginWallet = "",
  setReplyInfo = () => ({}),
}: TopicCardProps) {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();
  const [isUpVote, setIsUpVote] = useState<boolean>(
    isInVoteList(topicInfo.upvotes, loginWallet)
  );
  const [isDownVote, setIsDownVote] = useState<boolean>(
    isInVoteList(topicInfo.downvotes, loginWallet)
  );
  const [upvotesNum, setUpvotesNum] = useState<number>(
    topicInfo.upvotes.length
  );
  const [downvotesNum, setDownvotesNum] = useState<number>(
    topicInfo.downvotes.length
  );

  const tagIconList: JSX.Element[] = topicInfo.tagsAssigned.map((tag) => {
    return <TopicTag isCategory={false} tagTitle={tag.Name} key={tag.Name} />;
  });

  const topicToastOpen = (
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
    const content = `You ${cancelContentWord} ${voteContentWord} to Topic: ${topicInfo.title}`;
    const error = `Maybe something went wrong`;
    Toast.show({
      type: type,
      visibilityTime: 3000,
      text1: title,
      text2: isError ? error : content,
    });
  };

  const handleLike = () => {
    if (canjump) return;
    if (isUpVote) {
      setUpvotesNum(upvotesNum - 1);
      topicToastOpen(true, true, false);
    } else {
      setUpvotesNum(upvotesNum + 1);
      topicToastOpen(true, false, false);
    }
    setIsUpVote(!isUpVote);
  };

  const handleDislike = () => {
    if (canjump) return;
    if (isDownVote) {
      setDownvotesNum(downvotesNum - 1);
      topicToastOpen(false, true, false);
    } else {
      setDownvotesNum(downvotesNum + 1);
      topicToastOpen(false, false, false);
    }
    setIsDownVote(!isDownVote);
  };

  const handleComment = () => {
    if (canjump) return;
    setReplyInfo({
      Replyhash: topicInfo.hash,
      ReplyUser: topicInfo.creator.username,
    });
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
  const imageList: string[] = getImageList(topicInfo.assets);

  return (
    <View style={TopicCardStyle.whole}>
      <View style={TopicCardStyle.topCard}>
        <TopicTag
          isCategory={true}
          tagTitle={topicInfo.categoryAssigned.Name}
          color={topicInfo.categoryAssigned.Color}
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
        <View style={TopicCardStyle.bottomTags}>{tagIconList}</View>
        <View style={TopicCardStyle.bottomOptions}>
          <TouchableOpacity onPress={handleLike}>
            <View style={TopicCardStyle.iconview}>
              <Icon
                size={22}
                color={upvoteColorSelector(isUpVote)}
                type="antdesign"
                name="like2"
              />
              <Text
                style={[
                  TopicCardStyle.icontext,
                  { color: upvoteColorSelector(isUpVote) },
                ]}
              >
                {numericCarry(upvotesNum)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDislike}>
            <View style={TopicCardStyle.iconview}>
              <Icon
                color={downvoteColorSelector(isDownVote)}
                size={22}
                type="antdesign"
                name="dislike2"
              />
              <Text
                style={[
                  TopicCardStyle.icontext,
                  { color: downvoteColorSelector(isDownVote) },
                ]}
              >
                {numericCarry(downvotesNum)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment}>
            <View style={TopicCardStyle.iconview}>
              <Icon
                size={22}
                color="#8B8989"
                type="antdesign"
                name="message1"
              />
              <Text style={TopicCardStyle.icontext}>{numericCarry(99)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const TopicCardStyle = StyleSheet.create({
  bottomTags: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  bottomOptions: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
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
