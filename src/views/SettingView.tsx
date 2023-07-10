import { useNavigation } from "@react-navigation/native";
import { Icon, ListItem, Switch } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { StyleSheet, Text, View } from "react-native";

export const SettingView = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Setting">["navigation"]>();

  return (
    <View style={SettingViewStyle.whole}>
      <View style={SettingViewStyle.header}>
        <HeaderBarWrapper alignMethod="lcr">
          <Icon type="antdesign" name="left" onPress={() => navigation.pop()} />
          <Text style={SettingViewStyle.headerTitle}>设置</Text>
          <Icon type="antdesign" name="checkcircleo" />
        </HeaderBarWrapper>
      </View>

      <View style={SettingViewStyle.content}>
        <ListItem containerStyle={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon type="feather" name="moon" />
            <ListItem.Title>夜间模式</ListItem.Title>
          </View>

          <Switch trackColor={{ true: "#32CD32" }} />
        </ListItem>
      </View>
    </View>
  );
};

const SettingViewStyle = StyleSheet.create({
  content: { flex: 1 },
  header: { backgroundColor: "rgb(230,230,230)" },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  whole: { flex: 1 },
});
