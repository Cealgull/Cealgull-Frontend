import { UserInfoPOJO } from "@src/models/User";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "@rneui/themed";
import { Dimensions } from "react-native";
import { getImageIpfsPath } from "@src/services/forum";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface PersonCardProps {
  userInfo: UserInfoPOJO;
  isLoading: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  userInfo,
  isLoading,
}: PersonCardProps) => {
  const avatar = isLoading
    ? "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg"
    : getImageIpfsPath(userInfo.avatar);
  const username = isLoading ? "加载中……" : userInfo.username;
  const signature = isLoading ? "" : userInfo.signature;

  return (
    <View>
      <View style={PersonCardStyle.infowrapper}>
        <Avatar size={windowWidth * 0.36} rounded source={{ uri: avatar }} />
        <View style={PersonCardStyle.info}>
          <Text style={PersonCardStyle.name}>{username}</Text>
          <Text style={PersonCardStyle.sign}>{signature}</Text>
        </View>
      </View>
    </View>
  );
};

const PersonCardStyle = StyleSheet.create({
  infowrapper: {
    paddingVertical: windowHeight * 0.01,
    marginHorizontal: windowHeight * 0.02,
    borderBottomWidth: 1,
    borderColor: "#CDC9C9",
    alignItems: "center",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: windowHeight * 0.02,
  },
  name: { fontSize: 32, fontWeight: "bold" },
  sign: { fontSize: 20, color: "#BEBEBE" },
});
