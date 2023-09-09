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
import { useNavigation } from "@react-navigation/native";
import useUser from "@src/hooks/useUser";
import { MainScreenPropsGeneric } from "@src/@types/navigation";

const CustomLinearGradient = () => {
  return <Text style={HomeViewStyle.loadingText}>{"Loading...."}</Text>;
};

export interface HomeViewProps {
  pageSize: number;
  category: string;
  tags: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  pageSize,
  category = "",
  tags = [],
}: HomeViewProps) => {
  const pageNum = 1;
  const navigation =
    useNavigation<MainScreenPropsGeneric<"Home">["navigation"]>();

  const loginWallet = useUser().profile.wallet;

  const normalRequest = async () => {
    return await getAllTopics(30, pageNum, category, tags, "", "");
  };

  const pageTitleGenerator = (category: string, tag: string[]): string => {
    if (category === "" && tag.length == 0) {
      return "首页";
    } else if (category !== "") {
      return `首页 ${category}`;
    } else {
      return `首页 ${tag[0]}`;
    }
  };
  const {
    isLoading,
    isError,
    data: topicList,
    refetch: refetchTopicList,
  } = useQuery<ForumTopic[]>({
    queryKey: ["allTopics", pageSize, pageNum, category, tags],
    queryFn: normalRequest,
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
              tags: [],
            });
          }}
        >
          <Icon type="antdesign" name="left" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const HeaderContent =
    category === "" && tags.length == 0 ? (
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
    return (
      <TopicCard loginWallet={loginWallet} topicInfo={item} canjump={true} />
    );
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
            style={{ height: "100%", width: "100%" }}
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
    textAlign: "center",
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
