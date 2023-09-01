import { Icon, Skeleton } from "@rneui/themed";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { PostCard, TopicCard } from "@src/components/PostCard";
import { startForumServer } from "@src/services/__test__/mirage";
import { getAllPostsByBelong } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import { Server } from "miragejs";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type renderDataType = {
  isTop: boolean;
  obj: ForumPost | ForumTopic;
  level: number;
};

const CustomLinearGradient = () => {
  return <Text style={TopicViewStyle.loadingText}>{"Loading...."}</Text>;
};

export interface TopicViewProps {
  pageSize: number;
  topTopic: ForumTopic;
}

export const TopicView: React.FC<TopicViewProps> = ({
  pageSize,
  topTopic,
}: TopicViewProps) => {
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
      return <TopicCard {...cardProp} />;
    } else {
      const cardProp = item.obj as ForumPost;
      return <PostCard postInfo={cardProp} level={item.level} />;
    }
  };

  const TopicLoadingView = () => {
    return (
      <View style={TopicViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text style={TopicViewStyle.pageTitle}>话题</Text>
          </HeaderBarWrapper>
        </View>
        <View style={TopicViewStyle.content}>
          <Skeleton
            style={TopicViewStyle.loadingSkeleton}
            LinearGradientComponent={CustomLinearGradient}
          ></Skeleton>
        </View>
        <NavBar />
      </View>
    );
  };

  const TopicErrorView = () => {
    return (
      <View style={TopicViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text style={TopicViewStyle.pageTitle}>话题</Text>
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
        <NavBar />
      </View>
    );
  };

  const TopicSuccessView = () => {
    return (
      <View style={TopicViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text style={TopicViewStyle.pageTitle}>话题</Text>
          </HeaderBarWrapper>
        </View>
        <View style={TopicViewStyle.content}>
          <FlatList data={renderData} renderItem={renderTopicCard} />
        </View>
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
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "grey",
    fontSize: 26,
  },
  whole: {
    flex: 1,
  },
  pageTitle: {
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
