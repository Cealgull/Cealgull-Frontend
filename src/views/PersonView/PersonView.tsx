import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { OptionItem } from "@src/components/OptionItem";
import { PersonCard } from "@src/components/PersonCard";
import { User, UserInfoPOJO, UserStatistics } from "@src/models/User";
import { startForumServer } from "@src/services/__test__/mirage";
import { getUserInfo, getUserStatistics } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import { Server } from "miragejs";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useUser from "@src/hooks/useUser";
// export interface PersonViewProps {

export const PersonView: React.FC = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

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
    const response = await userRequest(loginWallet);
    server.shutdown();
    return response;
  };
  const normalRequest = async () => {
    //this will be used in official Version.
    return await userRequest(loginWallet);
  };

  const {
    isSuccess,
    isLoading,
    isError,
    data: userReturnData,
    refetch: refetchUser,
  } = useQuery<UserResponseObject>({
    queryKey: ["userInfo", "userStatistics", loginWallet],
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
  let personCard, settingList;

  if (isError) {
    return <PersonErrorView />;
  }
  if (isLoading) {
    personCard = <PersonCard userInfo={{} as UserInfoPOJO} isLoading={true} />;
    settingList = <></>;
  }
  if (isSuccess) {
    personCard = <PersonCard {...userReturnData} isLoading={false} />;
    settingList = (
      <View>
        <TouchableOpacity onPress={() => console.log("HI")}>
          <OptionItem
            title="发帖"
            icon={<Icon type="antdesign" name="copy1" />}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push("Statistics", {
              userStatistics: userReturnData.userStatistics,
            });
          }}
        >
          <OptionItem
            title="统计"
            icon={<Icon type="antdesign" name="linechart" />}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("HI")}>
          <OptionItem
            title="荣誉"
            icon={<Icon type="antdesign" name="Trophy" />}
          />
        </TouchableOpacity>

        <View style={{ height: 10 }} />
        {/* <TouchableOpacity onPress={() => navigation.push("Setting")}>
          <OptionItem
            title="设置"
            icon={<Icon type="antdesign" name="setting" />}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() =>
            navigation.push("Account", {
              wallet: loginWallet,
              userName: userReturnData.userInfo.username,
              userSignature: userReturnData.userInfo.signature,
              userAvatar: userReturnData.userInfo.avatar,
            })
          }
        >
          <OptionItem title="账户" icon={<Icon type="feather" name="user" />} />
        </TouchableOpacity>

        <View style={{ height: 10 }} />
        <TouchableOpacity onPress={() => navigation.push("ProductionInfo")}>
          <OptionItem
            title="产品信息"
            icon={<Icon type="antdesign" name="earth" />}
          />
        </TouchableOpacity>
      </View>
    );
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
          {settingList}
        </ScrollView>
      </View>
      <NavBar />
    </View>
  );
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
