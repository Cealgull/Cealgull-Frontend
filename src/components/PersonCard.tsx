import { UserInfoPOJO, UserStatistics } from "@src/models/User";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { numericCarry } from "@src/utils/forumUtils";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface PersonCardProps {
  userInfo: UserInfoPOJO;
  userStatistics: UserStatistics;
  isLoading: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  userInfo,
  userStatistics,
  isLoading,
}: PersonCardProps) => {
  const avatar = isLoading
    ? "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg"
    : userInfo.avatar;
  const username = isLoading ? "加载中……" : userInfo.username;
  const signature = isLoading ? "" : userInfo.signature;
  const postsCreated = isLoading
    ? "-"
    : numericCarry(userStatistics.postsCreated);
  const upvotesRecieved = isLoading
    ? "-"
    : numericCarry(userStatistics.upvotesRecieved);
  const balance = isLoading ? "-" : numericCarry(userInfo.balance);

  return (
    <View>
      <View style={PersonCardStyle.infowrapper}>
        <Avatar size={windowWidth * 0.2} rounded source={{ uri: avatar }} />
        <View style={PersonCardStyle.info}>
          <Text style={PersonCardStyle.name}>{username}</Text>
          <Text style={PersonCardStyle.sign}>{signature}</Text>
        </View>
      </View>
      <View style={PersonCardStyle.staticsshell}>
        <View style={PersonCardStyle.staticsblock}>
          <View>
            <Icon type="antdesign" name="filetext1" />
            <Text>发帖数</Text>
          </View>
          <Text style={PersonCardStyle.staticsnum}>{postsCreated}</Text>
        </View>
        <View style={PersonCardStyle.staticsblock}>
          <View>
            <Icon type="antdesign" name="like2" />
            <Text>获赞数</Text>
          </View>
          <Text style={PersonCardStyle.staticsnum}>{upvotesRecieved}</Text>
        </View>
        <View style={PersonCardStyle.staticsblock}>
          <View>
            <Icon type="antdesign" name="pay-circle-o1" />
            <Text>余额</Text>
          </View>
          <Text style={PersonCardStyle.staticsnum}>{balance}</Text>
        </View>
      </View>
    </View>
  );
};

const PersonCardStyle = StyleSheet.create({
  infowrapper: {
    flexDirection: "row",
    paddingVertical: windowHeight * 0.01,
    marginHorizontal: windowHeight * 0.02,
    borderBottomWidth: 1,
    borderColor: "#CDC9C9",
  },
  info: { justifyContent: "center", paddingLeft: windowHeight * 0.02 },
  name: { fontSize: 26, fontWeight: "bold" },
  staticsshell: {
    backgroundColor: "white",
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  staticsblock: {
    flexDirection: "row",
    alignItems: "center",
  },
  staticsnum: {
    paddingLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  sign: { fontSize: 18, color: "#BEBEBE" },
});
