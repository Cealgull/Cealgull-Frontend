import { useNavigation } from "@react-navigation/native";
import { Icon, Skeleton } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { PostCard, TopicCard } from "@src/components/PostCard";
import { PostEditor } from "@src/components/PostEditor";
import useUser from "@src/hooks/useUser";
import { User } from "@src/models/User";
import { startForumServer } from "@src/services/__test__/mirage";
import { createPost, getAllPostsByBelong } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import { Server } from "miragejs";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const CustomLinearGradient = () => {
  return <Text style={TopicViewStyle.loadingText}>{"Loading...."}</Text>;
};

export type ReplyToInfo = {
  Replyhash: string;
  ReplyUser: string;
};

type renderDataType = {
  isTop: boolean;
  obj: ForumPost | ForumTopic;
  level: number;
};

export interface TopicViewProps {
  pageSize: number;
  topTopic: ForumTopic;
}

export const TopicView: React.FC<TopicViewProps> = ({
  pageSize,
  topTopic,
}: TopicViewProps) => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Topic">["navigation"]>();
  const [replyInfo, setReplyInfo] = useState<ReplyToInfo>({
    Replyhash: "",
    ReplyUser: topTopic.creator.username,
  });
  const [count, setCount] = useState<number>(1);
  const pageTitle = `${topTopic.title}`;
  const inputRef = useRef<TextInput>(null);
  const loginWallet = useUser().profile.wallet;
  const [pageNum, setPageNum] = useState<number>(1);

  const normalRequest = async () => {
    //this will be used in official Version.
    return await getAllPostsByBelong(topTopic.hash, "", pageSize, pageNum);
  };

  const PopButton = () => {
    return (
      <View>
        <TouchableOpacity
          testID="TOpicViewPop"
          onPress={() => {
            navigation.pop();
          }}
        >
          <Icon type="antdesign" name="left" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const handlePageUp = () => {
    if (postList) {
      if (postList.length < pageSize) {
        Toast.show({
          type: "info",
          text1: "It's end 😢",
        });
        return;
      }
      setPageNum(pageNum + 1);
    }
  };
  const handlePageDown = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
    else
      Toast.show({
        type: "info",
        text1: "It's top 😢",
      });
  };

  const PageButton = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity testID="PostViewDown" onPress={handlePageDown}>
          <Icon name="left" type="antdesign" />
        </TouchableOpacity>
        <Text style={{ paddingHorizontal: 4 }}>{`第${pageNum}页`}</Text>

        <TouchableOpacity testID="PostViewUp" onPress={handlePageUp}>
          <Icon name="right" type="antdesign" />
        </TouchableOpacity>
      </View>
    );
  };

  const {
    isLoading,
    isError,
    data: postList,
    refetch: refetchPostList,
  } = useQuery<ForumPost[]>({
    queryKey: ["allPosts", topTopic.id, pageNum, pageSize],
    queryFn: normalRequest,
  });

  const renderPost: renderDataType[] | undefined = postList?.map(
    (post, index: number) => {
      return {
        isTop: false,
        obj: post,
        level: pageSize * (pageNum - 1) + index + 1,
      };
    }
  );
  const renderData: renderDataType[] = [
    { isTop: true, obj: topTopic, level: 0 },
    ...(renderPost ? renderPost : []),
  ];
  const renderTopicCard = ({ item }: { item: renderDataType }): JSX.Element => {
    if (item.isTop) {
      const cardProp = item.obj as ForumTopic;
      return (
        <TopicCard
          loginWallet={loginWallet}
          topicInfo={cardProp}
          canjump={false}
          setReplyInfo={setReplyInfo}
        />
      );
    } else {
      const cardProp = item.obj as ForumPost;
      return (
        <PostCard
          reFetch={refetchPostList}
          setReplyInfo={setReplyInfo}
          postInfo={cardProp}
          level={item.level}
          loginWallet={loginWallet}
        />
      );
    }
  };

  const handlePublishPost = async (content: string) => {
    try {
      await createPost(content, [], replyInfo.Replyhash, topTopic.hash);
      refetchPostList();
      Toast.show({
        type: "success",
        text1: "Publish Post Succeed 🥰",
        text2: "have fun there",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Publish Post Failed 🙁",
        text2: "Please check your network",
      });
    }
  };

  useEffect(() => {
    if (count == 1) {
      setCount(count + 1);
    } else {
      inputRef.current?.focus();
    }
  }, [replyInfo]);

  const TopicLoadingView = () => {
    return (
      <View style={TopicViewStyle.whole}>
        <View style={TopicViewStyle.header}>
          <HeaderBarWrapper alignMethod="lc">
            <PopButton />
            <Text style={TopicViewStyle.pageTitle}>{pageTitle}</Text>
          </HeaderBarWrapper>
        </View>
        <View style={TopicViewStyle.content}>
          <Skeleton
            style={TopicViewStyle.loadingSkeleton}
            LinearGradientComponent={CustomLinearGradient}
          ></Skeleton>
        </View>
      </View>
    );
  };

  const TopicErrorView = () => {
    return (
      <View style={TopicViewStyle.whole}>
        <View style={TopicViewStyle.header}>
          <HeaderBarWrapper alignMethod="lc">
            <PopButton />
            <Text style={TopicViewStyle.pageTitle}>{pageTitle}</Text>
          </HeaderBarWrapper>
        </View>
        <View style={TopicViewStyle.content}>
          <Pressable
            onPress={() => {
              refetchPostList();
            }}
            style={{ alignItems: "center" }}
          >
            <Icon
              name="closecircle"
              type="antdesign"
              color={"red"}
              size={50}
            ></Icon>
            <Text style={TopicViewStyle.errorText}>
              Fail to fetch the Content!
            </Text>
            <Text style={TopicViewStyle.errorText}>
              Press to refresh this page!
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const TopicSuccessView = () => {
    return (
      <View style={TopicViewStyle.whole}>
        <View style={TopicViewStyle.header}>
          <HeaderBarWrapper alignMethod="lcr">
            <PopButton />
            <Text style={TopicViewStyle.pageTitle}>{pageTitle}</Text>
            <PageButton />
          </HeaderBarWrapper>
        </View>
        <View style={TopicViewStyle.content}>
          <View style={{ width: "100%", height: "100%" }}>
            <FlatList data={renderData} renderItem={renderTopicCard} />
          </View>
        </View>
        <PostEditor
          replyTo={replyInfo.ReplyUser}
          inputRef={inputRef}
          publish={handlePublishPost}
        />
      </View>
    );
  };

  if (isLoading) {
    return <TopicLoadingView />;
  }
  if (isError) {
    return <TopicErrorView />;
  }
  return <TopicSuccessView />;
};

const TopicViewStyle = StyleSheet.create({
  content: {
    backgroundColor: "rgb(240,240,240)",
    flex: 7,
  },
  loadingText: {
    color: "grey",
    fontSize: 26,
  },
  header: {
    backgroundColor: "rgb(225,225,225)",
    flex: 1,
  },
  whole: {
    flex: 1,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingSkeleton: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 120,
    height: 30,
  },
  errorText: {
    justifyContent: "center",
    paddingTop: 18,
    fontSize: 18,
  },
});
