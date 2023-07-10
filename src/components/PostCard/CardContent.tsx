import { Avatar } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CardContentProps {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
}

export const CardContent = ({
  children,
  title,
  username,
  userAvatar,
}: CardContentProps) => {
  return (
    <View>
      <View style={CardContentStyle.personCard}>
        <Avatar rounded size={40} source={{ uri: userAvatar }} />
        <Text style={CardContentStyle.personCardName}>{username}</Text>
      </View>

      <View style={CardContentStyle.titleCard}>
        {title && <Text style={CardContentStyle.titleText}>{title}</Text>}
      </View>

      <View style={CardContentStyle.ChildrenCard}>{children}</View>
    </View>
  );
};

const CardContentStyle = StyleSheet.create({
  ChildrenCard: {
    marginBottom: 3,
    paddingLeft: "5%",
  },
  personCard: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 3,
    paddingLeft: "5%",
  },
  personCardName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
  titleCard: {
    paddingLeft: "5%",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
