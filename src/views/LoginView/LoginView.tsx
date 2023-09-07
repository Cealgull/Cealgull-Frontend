import { useNavigation } from "@react-navigation/native";
import { Button, ButtonProps } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { Loadable } from "@src/components/Loadable";
import config from "@src/config";
import { User } from "@src/models/User";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard, { UserAddCard } from "./UserCard";

const userLengthMax = config["login.user.max"];

export default function LoginView() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Login">["navigation"]>();
  const [userList, setUserList] = useState<User[] | undefined>(undefined);

  const handleDeleteUser = () => {
    // TODO Delete user
  };
  const handleAddUser = () => {
    // TODO add user
  };

  useEffect(() => {
    async function createUserList() {
      const userCount = await User.getUserCount();
      const res: Array<User> = [];
      for (let i = 0; i < userCount; ++i) {
        // Get the user from local storage
        const user = await User.getUser(i);
        // Examine if the user's profile is persisted
        user.hasProfile() ? res.push(user) : user.detach();
      }
      return res;
    }
    createUserList().then((res) => {
      setUserList(res);
    });
  }, []);

  const createUserCardList = useCallback(
    (userList: User[], selected?: number) => {
      const userCardList: React.ReactElement[] = [];
      userList.forEach((user, i) => {
        const { username, signature } = user.profile as NonNullable<
          typeof user.profile
        >;
        userCardList.push(
          <Pressable
            key={`user_login${i}`}
            onPress={() => setSelected(i)}
            accessibilityRole="checkbox"
          >
            <UserCard
              username={username}
              signature={signature}
              selected={selected === i}
            />
          </Pressable>
        );
      });

      for (let i = userList.length; i < userLengthMax; ++i) {
        userCardList.push(
          <Pressable
            key={`user_login${i}`}
            onPress={handleAddUser}
            accessibilityRole="button"
          >
            <UserAddCard />
          </Pressable>
        );
      }
      return userCardList;
    },
    []
  );

  return (
    <SafeAreaView style={styles.page}>
      {/* A '！' (U+FF01) is ugly, since it make the text bias */}
      <Text style={styles.welcome}>欢迎回来</Text>
      <View style={styles.user_list}>
        <Loadable
          generator={(_userList) => createUserCardList(_userList, selected)}
          maybeProp={userList}
        />
      </View>
      <View>
        <LoginButton
          onPress={() => {
            navigation.navigate("Main");
          }}
          disabled={selected === undefined}
        />
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
