import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface NavbarInterface {
  children?: React.ReactNode;
}

export const NavbarWrapper = ({ children }: NavbarInterface) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[NavbarStyle.wrapper, { paddingBottom: bottom }]}>
      <View style={NavbarStyle.itemview}>{children}</View>
    </View>
  );
};

const NavbarStyle = StyleSheet.create({
  itemview: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "rgb(225, 225, 225)",
    height: windowHeight * 0.11,
    width: windowWidth,
  },
});
