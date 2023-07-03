import React from "react";
import { StyleSheet, View } from "react-native";

interface NavbarInterface {
  children: React.ReactNode;
}

const NavbarStyle = StyleSheet.create({
  itemview: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    maxHeight: "80%",
  },
  warpper: {
    backgroundColor: "rgb(230, 230, 230)",
    flex: 1,
    width: "100%",
  },
});

export const Navbar = ({ children }: NavbarInterface) => {
  return (
    <View style={NavbarStyle.warpper}>
      <View style={NavbarStyle.itemview}>{children}</View>
    </View>
  );
};
