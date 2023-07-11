import { Button, ButtonProps } from "@rneui/themed";
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard, { UserAddCard } from "./UserCard";
// TODO 0 <= user.length <= 3
import user from "./userInfo";
import config from "@src/config";

const userLengthMax = config["login.user.max"];
/**
 * Entering the screen iff `user.length > 0`.
 */
export default function LoginView() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const handleDeleteUser = () => {
    // TODO Delete user
  };
  const handleAddUser = () => {
    // TODO add user
  };
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.welcome}>欢迎回来！</Text>
      <View style={styles.user_list}>
        {user.map(({ userName, email }, i) => (
          <Pressable
            key={`user_login${i}`}
            onPress={() => setSelected(i)}
            accessibilityRole="checkbox"
          >
            <UserCard {...{ userName, email }} selected={selected === i} />
          </Pressable>
        ))}
        {user.length === userLengthMax
          ? null
          : Array(userLengthMax - user.length)
              .fill("")
              .map((_, i) => (
                <Pressable
                  key={`user_add${i}`}
                  onPress={handleAddUser}
                  accessibilityRole="button"
                >
                  <UserAddCard />
                </Pressable>
              ))}
      </View>
      <View>
        <LoginButton disabled={selected === undefined} />
        <DelUserButton
          onPress={handleDeleteUser}
          disabled={selected === undefined}
        />
      </View>
    </SafeAreaView>
  );
}

type LoginButtonProps = Omit<
  ButtonProps,
  "title" | "buttonStyle" | "titleStyle" | "containerStyle"
>;

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  return (
    <Button
      title="登入"
      buttonStyle={[styles.button, styles.button_login]}
      titleStyle={styles.button_text}
      containerStyle={styles.button_container}
      {...props}
    />
  );
};

type DelUserButtonProps = LoginButtonProps;
const DelUserButton: React.FC<DelUserButtonProps> = (props) => {
  return (
    <Button
      title={"删除用户"}
      buttonStyle={[styles.button, styles.button_add_user]}
      titleStyle={styles.button_text}
      containerStyle={styles.button_container}
      {...props}
    />
  );
};

const { height: screenHeight } = Dimensions.get("screen");

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
  },
  button_login: {
    backgroundColor: "#48b89f",
  },
  button_add_user: {
    backgroundColor: "#d62828",
  },
  button_container: {
    height: 50,
    marginHorizontal: 50,
    marginVertical: 10,
    width: 200,
  },
  button_text: {
    fontSize: 23,
    fontWeight: "bold",
  },
  page: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
  welcome: {
    fontSize: 30,
    fontWeight: "700",
  },
  user_list: {
    height: (screenHeight / 8) * 3.6,
    justifyContent: "center",
  },
});
