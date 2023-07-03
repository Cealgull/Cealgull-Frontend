import { Icon } from "@rneui/themed";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

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

const handleMyPress = () => {
  Alert.alert("My");
};

const handlePublishPress = () => {
  Alert.alert("Publish");
};

const handleHomePress = () => {
  Alert.alert("Home");
};

export const NavMyIcon = () => {
  return (
    <View style={NavbarIcon.warpper}>
      <Icon onPress={handleMyPress} type="antdesign" name="user" />
      <Text onPress={handleMyPress} style={NavbarIcon.text}>
        Person
      </Text>
    </View>
  );
};

export const NavPublishIcon = () => {
  return (
    <View style={NavbarIcon.warpper}>
      <Icon
        onPress={handlePublishPress}
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
  return (
    <View style={NavbarIcon.warpper}>
      <Icon onPress={handleHomePress} type="antdesign" name="home" />
      <Text onPress={handleHomePress} style={NavbarIcon.text}>
        Home
      </Text>
    </View>
  );
};
