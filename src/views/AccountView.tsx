import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, ListItem } from "@rneui/themed";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { useNavigation } from "@react-navigation/native";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { ScrollView } from "react-native-gesture-handler";

export const AccountView = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Account">["navigation"]>();
  return (
    <View style={AccountViewStyle.whole}>
      <View style={AccountViewStyle.header}>
        <HeaderBarWrapper alignMethod="lcr">
          <Icon type="antdesign" name="left" onPress={() => navigation.pop()} />
          <Text style={AccountViewStyle.headerTitle}>账户</Text>
          <Icon type="antdesign" name="checkcircleo" />
        </HeaderBarWrapper>
      </View>

      <View style={AccountViewStyle.content}>
        <ScrollView>
          <Text style={{ padding: 10, color: "#8B8989" }}>账户信息修改</Text>
          <TouchableOpacity>
            <ListItem containerStyle={{ justifyContent: "center" }}>
              <Icon type="feather" name="edit"></Icon>
              <ListItem.Title>修改用户名</ListItem.Title>
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity>
            <ListItem containerStyle={{ justifyContent: "center" }}>
              <Icon type="feather" name="edit"></Icon>
              <ListItem.Title>修改个性签名</ListItem.Title>
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity>
            <ListItem containerStyle={{ justifyContent: "center" }}>
              <Icon type="feather" name="upload-cloud"></Icon>
              <ListItem.Title>上传头像</ListItem.Title>
            </ListItem>
          </TouchableOpacity>

          <Text style={{ padding: 10, color: "#8B8989" }}>账户切换</Text>
          <TouchableOpacity>
            <ListItem
              containerStyle={{ justifyContent: "center" }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Icon color="red" type="feather" name="log-out"></Icon>
              <ListItem.Title style={{ color: "red" }}>退出登录</ListItem.Title>
            </ListItem>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const AccountViewStyle = StyleSheet.create({
  content: { flex: 1 },
  whole: { flex: 1 },
  header: { backgroundColor: "rgb(230, 230, 230)" },
  headerTitle: { fontWeight: "bold", fontSize: 18 },
});
