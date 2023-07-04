import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  PersonViewNavigationProps,
  HomeViewNavigationProps,
  PublishViewNavigationProps,
} from "@src/Resources/RootStackData";

const NavbarIcon = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  warpper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export const NavMyIcon = () => {
  const navigation = useNavigation<PersonViewNavigationProps["navigation"]>();
  return (
    <View style={NavbarIcon.warpper}>
      <Icon
        onPress={() => navigation.navigate("Person")}
        type="antdesign"
        name="user"
      />
      <Text
        onPress={() => navigation.navigate("Person")}
        style={NavbarIcon.text}
      >
        Person
      </Text>
    </View>
  );
};

export const NavPublishIcon = () => {
  const navigation = useNavigation<PublishViewNavigationProps["navigation"]>();
  return (
    <View style={NavbarIcon.warpper}>
      <Icon
        onPress={() => navigation.navigate("Publish")}
        reverse
        color="red"
        type="antdesign"
        name="pluscircle"
      />
      <Text style={NavbarIcon.text}>Publish</Text>
    </View>
  );
};

export const NavHomeIcon = () => {
  const navigation = useNavigation<HomeViewNavigationProps["navigation"]>();
  return (
    <View style={NavbarIcon.warpper}>
      <Icon
        onPress={() => navigation.navigate("Home")}
        type="antdesign"
        name="home"
      />
      <Text onPress={() => navigation.navigate("Home")} style={NavbarIcon.text}>
        Home
      </Text>
    </View>
  );
};
