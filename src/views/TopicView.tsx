import { useNavigation } from "@react-navigation/native";
import { Icon, Skeleton } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { PostCard, TopicCard } from "@src/components/PostCard";
import { PostEditor } from "@src/components/PostEditor";
import useUser from "@src/hooks/useUser";
import { User } from "@src/models/User";
import { startForumServer } from "@src/services/__test__/mirage";
import { getAllPostsByBelong } from "@src/services/forum";
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
  const pageTitle = `${topTopic.title}`;
  const inputRef = useRef<TextInput>(null);

  const getLoginUserWallet = (user: Readonly<User | undefined>) => {
    if (!user) {
      console.log("User undefined");
      return "";
    }
    if (!user.profile) {
      console.log("User profile undefined");
      return "";
    }
    return user.profile.wallet;
  };
  const user = useUser();
  const loginWallet = getLoginUserWallet(user);

  const mirageRequest = async () => {
    //this will be used when backend is close.
    const server: Server = startForumServer();
    const response = await getAllPostsByBelong(
      topTopic.hash,
      topTopic.creator.wallet,
      pageSize,
      1
    );
    server.shutdown();
    return response;
  };
  const normalRequest = async () => {
    //this will be used in official Version.
    return await getAllPostsByBelong(
      topTopic.hash,
      topTopic.creator.wallet,
      pageSize,
      1
    );
  };

  const PopButton = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Icon type="antdesign" name="left" size={24} />
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
    queryKey: ["allPosts", topTopic.id],
    // queryFn:normalRequest
    queryFn: mirageRequest,
  });

  const renderPost: renderDataType[] | undefined = postList?.map(
    (post, index) => {
      return { isTop: false, obj: post, level: index + 1 };
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
          setReplyInfo={setReplyInfo}
          postInfo={cardProp}
          level={item.level}
        />
      );
    }
  };

  const handlePublishPost = (content: string): void => {
    console.log(content, replyInfo);
  };

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
          <HeaderBarWrapper alignMethod="lc">
            <PopButton />
            <Text style={TopicViewStyle.pageTitle}>{pageTitle}</Text>
          </HeaderBarWrapper>
        </View>
        <View style={TopicViewStyle.content}>
          <FlatList data={renderData} renderItem={renderTopicCard} />
        </View>
        <PostEditor
          replyTo={replyInfo.ReplyUser}
          inputRef={inputRef}
          publish={handlePublishPost}
        />
      </View>
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [replyInfo]);
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
    justifyContent: "center",
    alignItems: "center",
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
