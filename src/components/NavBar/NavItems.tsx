import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import {
  HomeViewNavigationProps,
  PersonViewNavigationProps,
  PublishViewNavigationProps,
} from "@src/@types/navigation/index";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NavMyIcon = () => {
  const navigation = useNavigation<PersonViewNavigationProps["navigation"]>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Person")}
      style={NavbarIcon.warpper}
    >
      <View>
        <Icon type="antdesign" name="user" />
        <Text style={NavbarIcon.text}>Person</Text>
      </View>
    </TouchableOpacity>
  );
};

export const NavPublishIcon = () => {
  const navigation = useNavigation<PublishViewNavigationProps["navigation"]>();
  return (
    <View style={NavbarIcon.warpper}>
      <TouchableOpacity onPress={() => navigation.navigate("Publish")}>
        <Icon reverse color="red" type="antdesign" name="pluscircle" />
      </TouchableOpacity>

      <Text style={NavbarIcon.text}>Publish</Text>
    </View>
  );
};

export const NavHomeIcon = () => {
  const navigation = useNavigation<HomeViewNavigationProps["navigation"]>();
  return (
    <TouchableOpacity
      style={NavbarIcon.warpper}
      onPress={() => navigation.navigate("Home")}
    >
      <View>
        <Icon type="antdesign" name="home" />
        <Text style={NavbarIcon.text}>Home</Text>
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
