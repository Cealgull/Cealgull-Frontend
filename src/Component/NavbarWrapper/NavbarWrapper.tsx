import React from "react";
import { StyleSheet, View } from "react-native";

interface NavbarInterface {
  children?: React.ReactNode;
}

export const NavbarWrapper = ({ children }: NavbarInterface) => {
  return (
    <View style={NavbarStyle.warpper}>
      <View style={NavbarStyle.itemview}>{children}</View>
    </View>
  );
};

const NavbarStyle = StyleSheet.create({
  itemview: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "80%",
    width: "100%",
  },
  warpper: {
    backgroundColor: "rgb(230, 230, 230)",
    height: "10%",
    width: "100%",
  },
});
