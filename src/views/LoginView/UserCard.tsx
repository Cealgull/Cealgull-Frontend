import { useNavigation } from "@react-navigation/native";
import { Avatar, Icon, Image } from "@rneui/themed";
import { LoginTabScreenPropsGeneric } from "@src/@types/navigation";
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
  userName: string;
  email: string;
  selected: boolean;
}

export default function UserCard({ userName, email, selected }: UserCardProps) {
  const checkIconStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.check_container, { opacity: selected ? 100 : 0 }],
    [selected]
  );

  return (
    <View style={styles.card}>
      <View style={styles.content_container}>
        <View style={{ flex: 0 }}>
          <UserCardAvatar alt={userName} />
        </View>
        <View style={styles.info_container}>
          <Text style={[styles.text, styles.text_username]}>{userName}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
      </View>
      <View style={checkIconStyle} testID="check_icon">
        <CheckIcon />
      </View>
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
    <Pressable
      onPress={() => {
        navigation.navigate("UserAdd");
      }}
    >
      <View style={styles.card}>
        <View style={styles.content_container}>
          <View style={{ flex: 0 }}>
            <Icon name="adduser" type="antdesign" size={72} />
          </View>
          <View style={styles.info_container}>
            <Text style={{ fontSize: 20 }}>添加用户</Text>
          </View>
        </View>
      </View>
    </Pressable>
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

interface UserCardAvatarProps {
  size?: ("small" | "medium" | "large" | "xlarge") | number;
  uri?: string;
  alt?: string;
}

const UserCardAvatar: React.FC<UserCardAvatarProps> = ({
  size = 80,
  uri = "https://randomuser.me/api/portraits/men/36.jpg",
  alt,
}) => {
  return <Avatar rounded size={size} source={{ uri }} imageProps={{ alt }} />;
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
