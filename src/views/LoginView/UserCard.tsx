import { useNavigation } from "@react-navigation/native";
import { Icon, Image } from "@rneui/themed";
import { LoginTabScreenPropsGeneric } from "@src/@types/navigation";
import UserAvatar from "@src/components/UserAvatar";
import React, { useMemo } from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface UserCardProps {
  username: string;
  signature: string;
  selected: boolean;
  avatar?: string;
  onPress: () => void;
}

export default function UserCard({
  username,
  signature,
  selected,
  avatar,
  onPress,
}: UserCardProps) {
  const checkIconStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.check_container, { opacity: selected ? 100 : 0 }],
    [selected]
  );

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        accessibilityRole="checkbox"
        style={{ flex: 1 }}
      >
        <View style={styles.content_container}>
          <View style={{ flex: 0 }}>
            <UserAvatar alt={username} uri={avatar || undefined} />
          </View>
          <View style={styles.info_container}>
            <Text style={[styles.text, styles.text_username]}>{username}</Text>
            <Text style={styles.text}>{signature}</Text>
          </View>
        </View>
        <View style={checkIconStyle} testID="check_icon">
          <CheckIcon />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * Placeholder for no user.
 */
export function UserAddCard() {
  const navigation =
    useNavigation<LoginTabScreenPropsGeneric<"UserLogin">["navigation"]>();

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => {
          navigation.navigate("UserAdd");
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.content_container}>
          <View style={{ flex: 0 }}>
            <Icon name="adduser" type="antdesign" size={72} />
          </View>
          <View style={styles.info_container}>
            <Text style={{ fontSize: 20 }}>添加用户</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The green check mark icon
 */
const checkMarkIconPath = "../../../assets/check-mark-icon.png";
const CheckIcon: React.FC = () => {
  return (
    <Image source={require(checkMarkIconPath)} style={styles.check_icon} />
  );
};

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    borderWidth: 3,
    height: screenHeight / 8,
    margin: 16,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: screenWidth - 80,
  },
  check_container: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 999,
  },
  check_icon: {
    ...(function () {
      const x = screenHeight / 8;
      return { height: x, width: x };
    })(),
  },
  content_container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  info_container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    marginVertical: 6,
  },
  text_username: {
    fontSize: 20,
    fontWeight: "700",
  },
});
