import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Icon, ListItem } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { StackScreenPropsGeneric } from "@src/@types/navigation";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const user = {
  avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  name: "User",
  sign: "Hello World!",
  numberOfLikes: 122,
  numberOfTopics: 9,
  balance: 5000,
};

export default function PersonView() {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  return (
    <View style={HomeViewStyle.whole}>
      <View style={HomeViewStyle.header}>
        <HeaderBarWrapper></HeaderBarWrapper>
      </View>

      <View style={HomeViewStyle.content}>
        <ScrollView>
          <View style={HomeViewStyle.infowrapper}>
            <Avatar
              size={windowWidth * 0.2}
              rounded
              source={{ uri: user.avatar }}
            />
            <View style={HomeViewStyle.info}>
              <Text style={HomeViewStyle.name}>{user.name}</Text>
              <Text style={HomeViewStyle.sign}>{user.sign}</Text>
            </View>
          </View>
          <View style={HomeViewStyle.staticsshell}>
            <View style={HomeViewStyle.staticsblock}>
              <View>
                <Icon type="antdesign" name="filetext1" />
                <Text>发帖数</Text>
              </View>
              <Text style={HomeViewStyle.staticsnum}>
                {user.numberOfTopics}
              </Text>
            </View>
            <View style={HomeViewStyle.staticsblock}>
              <View>
                <Icon type="antdesign" name="like2" />
                <Text>获赞数</Text>
              </View>
              <Text style={HomeViewStyle.staticsnum}>{user.numberOfLikes}</Text>
            </View>
            <View style={HomeViewStyle.staticsblock}>
              <View>
                <Icon type="antdesign" name="pay-circle-o1" />
                <Text>货币额</Text>
              </View>
              <Text style={HomeViewStyle.staticsnum}>{user.balance}</Text>
            </View>
          </View>

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
}

const ChevronStyle = {
  color: "black",
  size: 20,
};

const HomeViewStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  infowrapper: {
    flexDirection: "row",
    paddingVertical: windowHeight * 0.01,
    marginHorizontal: windowHeight * 0.02,
    borderBottomWidth: 1,
    borderColor: "#CDC9C9",
  },
  header: { backgroundColor: "rgb(230,230,230)" },
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
  whole: {
    flex: 1,
  },
});
