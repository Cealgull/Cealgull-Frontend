import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import {
  StackScreenPropsGeneric,
  TabScreenPropsGeneric,
} from "@src/@types/navigation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NavMyIcon = () => {
  const navigation =
    useNavigation<TabScreenPropsGeneric<"Person">["navigation"]>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Person")}
      style={NavbarIcon.warpper}
    >
      <View>
        <Icon type="antdesign" name="user" />
        <Text style={[NavbarIcon.text, { marginTop: 5 }]}>个人</Text>
      </View>
    </TouchableOpacity>
  );
};

export const NavPublishIcon = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();
  return (
    <View style={NavbarIcon.warpper}>
      <TouchableOpacity onPress={() => navigation.push("Publish")}>
        <Icon reverse color="red" type="antdesign" name="pluscircle" />
      </TouchableOpacity>

      <Text style={NavbarIcon.text}>新建话题</Text>
    </View>
  );
};

export const NavHomeIcon = () => {
  const navigation =
    useNavigation<TabScreenPropsGeneric<"Home">["navigation"]>();
  return (
    <TouchableOpacity
      style={NavbarIcon.warpper}
      onPress={() => navigation.navigate("Home")}
    >
      <View>
        <Icon type="antdesign" name="home" />
        <Text style={[NavbarIcon.text, { marginTop: 5 }]}>首页</Text>
      </View>
    </TouchableOpacity>
  );
};

const NavbarIcon = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  warpper: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
  },
});
