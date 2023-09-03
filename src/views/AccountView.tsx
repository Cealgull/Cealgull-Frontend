import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { OptionItem } from "@src/components/OptionItem";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export interface AccountViewProps {
  wallet: string;
}

export const AccountView = ({ wallet }: AccountViewProps) => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Account">["navigation"]>();
  return (
    <View style={AccountViewStyle.whole}>
      <View style={AccountViewStyle.header}>
        <HeaderBarWrapper alignMethod="lc">
          <Icon
            size={24}
            type="antdesign"
            name="left"
            onPress={() => navigation.pop()}
          />
          <Text style={AccountViewStyle.headerTitle}>账户</Text>
        </HeaderBarWrapper>
      </View>

      <View style={AccountViewStyle.content}>
        <ScrollView>
          <Text style={{ padding: 10, color: "#8B8989" }}>账户信息修改</Text>
          <TouchableOpacity>
            <OptionItem
              title="修改用户名"
              icon={<Icon type="feather" name="edit" />}
              isCenter={true}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <OptionItem
              title="修改个性签名"
              icon={<Icon type="feather" name="edit" />}
              isCenter={true}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <OptionItem
              title="上传头像"
              icon={<Icon type="feather" name="upload-cloud" />}
              isCenter={true}
            />
          </TouchableOpacity>

          <Text style={{ padding: 10, color: "#8B8989" }}>账户切换</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <OptionItem
              title="退出登录"
              icon={<Icon color="red" type="feather" name="log-out" />}
              isCenter={true}
              titleColor="red"
            />
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
