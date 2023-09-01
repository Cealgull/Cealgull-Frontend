import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { TopicCard } from "@src/components/PostCard";
import { getAllTopics } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, Skeleton } from "@rneui/themed";
import { Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";

const CustomLinearGradient = () => {
  return <Text style={HomeViewStyle.loadingText}>{"Loading...."}</Text>;
};

export interface HomeViewProps {
  pageSize: number;
  category: string;
  tags: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  pageSize,
  category = "",
  tags = "",
}: HomeViewProps) => {
  const pageNum = 1;
  const mirageRequest = async () => {
    //this will be used when backend is close.
    const server: Server = startForumServer();
    const response = await getAllTopics(
      pageSize,
      pageNum,
      category,
      tags,
      "",
      ""
    );
    server.shutdown();
    return response;
  };
  const normalRequest = async () => {
    //this will be used in official Version.
    return await getAllTopics(pageSize, pageNum, category, tags, "", "");
  };

  const {
    isLoading,
    isError,
    data: topicList,
    refetch: refetchTopicList,
  } = useQuery<ForumTopic[]>({
    queryKey: ["allTopics", pageSize, pageNum, category, tags],
    // queryFn: normalRequest
    queryFn: mirageRequest,
  });

  const renderTopicCard = ({ item }: { item: ForumTopic }) => {
    return <TopicCard {...item} />;
  };
  const HomeLoadingView = () => {
    return (
      <View style={HomeViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text
              style={HomeViewStyle.pageTitle}
            >{`首页 ${category} ${tags}`}</Text>
          </HeaderBarWrapper>
        </View>
        <View style={HomeViewStyle.content}>
          <Skeleton
            style={HomeViewStyle.loadingSkeleton}
            LinearGradientComponent={CustomLinearGradient}
          ></Skeleton>
        </View>
        <NavBar />
      </View>
    );
  };
  const HomeErrorView = () => {
    return (
      <View style={HomeViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text
              style={HomeViewStyle.pageTitle}
            >{`首页 ${category} ${tags}`}</Text>
          </HeaderBarWrapper>
        </View>
        <View style={HomeViewStyle.content}>
          <Pressable
            onPress={() => {
              refetchTopicList();
            }}
            style={{ alignItems: "center" }}
          >
            <Icon
              name="closecircle"
              type="antdesign"
              color={"red"}
              size={50}
            ></Icon>
            <Text style={HomeViewStyle.errorText}>
              Fail to fetch the Content!
            </Text>
            <Text style={HomeViewStyle.errorText}>
              Press to refresh this page!
            </Text>
          </Pressable>
        </View>
        <NavBar />
      </View>
    );
  };
  const HomeSuccessView = () => {
    return (
      <View style={HomeViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text
              style={HomeViewStyle.pageTitle}
            >{`首页 ${category} ${tags}`}</Text>
          </HeaderBarWrapper>
        </View>
        <View style={HomeViewStyle.content}>
          <FlatList data={topicList} renderItem={renderTopicCard}></FlatList>
        </View>
        <NavBar />
      </View>
    );
  };

  if (isLoading) {
    return <HomeLoadingView />;
  }
  if (isError) {
    return <HomeErrorView />;
  }
  return <HomeSuccessView />;
};

const HomeViewStyle = StyleSheet.create({
  content: {
    backgroundColor: "rgb(240,240,240)",
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    justifyContent: "center",
    paddingTop: 18,
    fontSize: 18,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    color: "grey",
    fontSize: 26,
  },
  loadingSkeleton: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 120,
    height: 30,
  },
  whole: {
    flex: 1,
  },
});
