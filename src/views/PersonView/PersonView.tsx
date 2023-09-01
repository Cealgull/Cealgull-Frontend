import { useNavigation } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { PersonCard } from "@src/components/PersonCard";
import { UserInfoPOJO, UserStatistics } from "@src/models/User";
import { startForumServer } from "@src/services/__test__/mirage";
import { getUserInfo, getUserStatistics } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import { Server } from "miragejs";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export interface PersonViewProps {
  wallet: string;
}

const PersonView: React.FC<PersonViewProps> = ({
  wallet = "",
}: PersonViewProps) => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  interface UserResponseObject {
    userInfo: UserInfoPOJO;
    userStatistics: UserStatistics;
  }
  const userRequest = async (wallet: string) => {
    return {
      userInfo: await getUserInfo(wallet),
      userStatistics: await getUserStatistics(wallet),
    };
  };

  const mirageRequest = async () => {
    //this will be used when backend is close.
    const server: Server = startForumServer();
    const response = await userRequest(wallet);
    server.shutdown();
    return response;
  };
  const normalRequest = async () => {
    //this will be used in official Version.
    return await userRequest(wallet);
  };

  const {
    isSuccess,
    isLoading,
    isError,
    data: userReturnData,
    refetch: refetchUser,
  } = useQuery<UserResponseObject>({
    queryKey: ["userInfo", "userStatistics", wallet],
    // queryFn:normalRequest
    queryFn: mirageRequest,
  });

  const PersonErrorView = () => {
    return (
      <View style={PersonViewStyle.whole}>
        <View style={PersonViewStyle.header}>
          <HeaderBarWrapper alignMethod="c">
            <Text style={PersonViewStyle.pageTitle}>个人</Text>
          </HeaderBarWrapper>
        </View>
        <View style={PersonViewStyle.errorContent}>
          <Pressable
            onPress={() => {
              refetchUser();
            }}
            style={{ alignItems: "center" }}
          >
            <Icon
              name="closecircle"
              type="antdesign"
              color={"red"}
              size={50}
            ></Icon>
            <Text style={PersonViewStyle.errorText}>
              Fail to fetch the Content!
            </Text>
            <Text style={PersonViewStyle.errorText}>
              Press to refresh this page!
            </Text>
          </Pressable>
        </View>

        <NavBar />
      </View>
    );
  };
  let personCard;

  if (isError) {
    return <PersonErrorView />;
  }
  if (isLoading) {
    personCard = (
      <PersonCard
        userInfo={{} as UserInfoPOJO}
        userStatistics={{} as UserStatistics}
        isLoading={true}
      />
    );
  }
  if (isSuccess) {
    personCard = <PersonCard {...userReturnData} isLoading={false} />;
  }

  return (
    <View style={PersonViewStyle.whole}>
      <View style={PersonViewStyle.header}>
        <HeaderBarWrapper alignMethod="c">
          <Text style={PersonViewStyle.pageTitle}>{`个人`}</Text>
        </HeaderBarWrapper>
      </View>

      <View style={PersonViewStyle.content}>
        <ScrollView>
          {personCard}
          <View style={{ height: 10 }} />
          <TouchableOpacity onPress={() => console.log("HI")}>
            <ListItem>
              <Icon type="antdesign" name="copy1" />
              <ListItem.Content>
                <ListItem.Title>发帖</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron {...ChevronStyle} />
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("HI")}>
            <ListItem>
              <Icon type="antdesign" name="isv" />
              <ListItem.Content>
                <ListItem.Title>商城</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron {...ChevronStyle} />
            </ListItem>
          </TouchableOpacity>

          <View style={{ height: 10 }} />
          <TouchableOpacity onPress={() => navigation.push("Setting")}>
            <ListItem>
              <Icon type="antdesign" name="setting" />
              <ListItem.Content>
                <ListItem.Title>设置</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron {...ChevronStyle} />
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Account")}>
            <ListItem>
              <Icon type="feather" name="user" />
              <ListItem.Content>
                <ListItem.Title>账户</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron {...ChevronStyle} />
            </ListItem>
          </TouchableOpacity>

          <View style={{ height: 10 }} />
          <TouchableOpacity onPress={() => console.log("HI")}>
            <ListItem>
              <Icon type="antdesign" name="earth" />
              <ListItem.Content>
                <ListItem.Title>产品信息</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron {...ChevronStyle} />
            </ListItem>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <NavBar />
    </View>
  );
};

const ChevronStyle = {
  color: "black",
  size: 20,
};

const PersonViewStyle = StyleSheet.create({
  header: { backgroundColor: "rgb(230,230,230)" },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  whole: {
    flex: 1,
  },
  errorText: {
    justifyContent: "center",
    paddingTop: 18,
    fontSize: 18,
  },
  errorContent: {
    backgroundColor: "rgb(240,240,240)",
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PersonView;
