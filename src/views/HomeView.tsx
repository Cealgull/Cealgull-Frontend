import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { TopicCard } from "@src/components/PostCard";
import { getAllTopics } from "@src/services/viewService/getTopics";
import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import { Icon, Skeleton } from "@rneui/themed";

const CustomLinearGradient = () => {
  return <Text style={HomeViewStyle.loadingText}>{"Loading...."}</Text>;
};

export const HomeView: React.FC = () => {
  const {
    isLoading,
    isError,
    data: topicList,
    refetch: refetchTopicList,
  } = useQuery<ForumTopic[]>({
    queryKey: ["allTopics"],
    queryFn: getAllTopics,
  });

  const renderTopic = ({ item }: { item: ForumTopic }) => {
    return <TopicCard {...item} />;
  };
  const HomeLoadingView = () => {
    return (
      <View style={HomeViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          <HeaderBarWrapper alignMethod="c">
            <Text>首页板块</Text>
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
            <Text>首页板块</Text>
          </HeaderBarWrapper>
        </View>
        <View style={HomeViewStyle.content}>
          <Pressable
            onPress={() => {
              refetchTopicList();
            }}
          >
            <Icon
              name="closecircle"
              type="antdesign"
              color={"red"}
              size={50}
            ></Icon>
            <Text style={HomeViewStyle.errorText}>
              Error! Please refresh the page!{" "}
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
            <Text>首页板块</Text>
          </HeaderBarWrapper>
        </View>
        <View style={HomeViewStyle.content}>
          <FlatList data={topicList} renderItem={renderTopic}></FlatList>
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
    paddingTop: 20,
    fontSize: 20,
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
