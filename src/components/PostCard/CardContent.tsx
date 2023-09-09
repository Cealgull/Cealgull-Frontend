import { Avatar } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import APIConfig from "@src/services/api.config";
import { Badge, Image } from "@rneui/base";
import { getImageIpfsPath } from "@src/services/forum";

interface CardContentProps {
  children?: React.ReactNode;
  title?: string;
  username: string;
  userAvatar: string;
  activeBadge?: string;
  activeRole?: string;
}

export const CardContent = ({
  children,
  title,
  username,
  userAvatar,
  activeBadge,
  activeRole,
}: CardContentProps) => {
  const avatarPath = getImageIpfsPath(userAvatar);

  return (
    <View>
      <View style={CardContentStyle.personCard}>
        <Avatar rounded size={40} source={{ uri: avatarPath }} />
        <Text style={CardContentStyle.personCardName}>{username}</Text>
        {activeBadge && activeBadge !== "null" ? (
          <Image
            style={CardContentStyle.badge}
            source={{ uri: getImageIpfsPath(activeBadge) }}
          />
        ) : null}
        {activeRole && activeRole !== "null" ? (
          <Text style={CardContentStyle.role}>{activeRole}</Text>
        ) : null}
      </View>

      <View style={CardContentStyle.titleCard}>
        {title && <Text style={CardContentStyle.titleText}>{title}</Text>}
      </View>

      <View style={CardContentStyle.childrenCard}>{children}</View>
    </View>
  );
};

const CardContentStyle = StyleSheet.create({
  badge: {
    aspectRatio: 1,
    height: 30,
    marginLeft: 10,
    borderRadius: 10,
  },
  role: {
    fontWeight: "bold",
    color: "#696969",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
  childrenCard: {
    paddingVertical: 10,
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
