import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { TopicCard } from "@src/components/PostCard";
import { getAllTopics } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Skeleton } from "@rneui/themed";
import { Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";
import { useNavigation } from "@react-navigation/native";
import {
  StackScreenPropsGeneric,
  TabScreenPropsGeneric,
} from "@src/@types/navigation";

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
  const navigation =
    useNavigation<TabScreenPropsGeneric<"Home">["navigation"]>();
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

  const pageTitleGenerator = (category: string, tag: string): string => {
    if (category === "" && tag === "") {
      return "首页--全部话题";
    } else if (category !== "") {
      return `首页--${category}下话题`;
    } else {
      return `首页-- ${tag}下话题`;
    }
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

  const pageTitle = pageTitleGenerator(category, tags);

  const PopButton = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", {
              pageSize: 10,
              category: "",
              tags: "",
            });
          }}
        >
          <Icon type="antdesign" name="left" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const HeaderContent =
    category === "" && tags === "" ? (
      <HeaderBarWrapper alignMethod="c">
        <Text style={HomeViewStyle.pageTitle}>{pageTitle}</Text>
      </HeaderBarWrapper>
    ) : (
      <HeaderBarWrapper alignMethod="lc">
        <PopButton />
        <Text style={HomeViewStyle.pageTitle}>{pageTitle}</Text>
      </HeaderBarWrapper>
    );

  const renderTopicCard = ({ item }: { item: ForumTopic }) => {
    return <TopicCard topicInfo={item} canjump={true} />;
  };
  const HomeLoadingView = () => {
    return (
      <View style={HomeViewStyle.whole}>
        <View style={{ backgroundColor: "rgb(225,225,225)" }}>
          {HeaderContent}
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
          {HeaderContent}
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
        <View style={{ backgroundColor: "rgb(225,225,225)", flex: 1 }}>
          {HeaderContent}
        </View>
        <View style={HomeViewStyle.content}>
          <FlatList
            style={{ height: "100%" }}
            data={topicList}
            renderItem={renderTopicCard}
          ></FlatList>
        </View>
        <View style={{ flex: 1 }}>
          <NavBar />
        </View>
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
    flex: 7,
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
