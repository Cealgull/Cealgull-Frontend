import { useNavigation } from "@react-navigation/native";
import { Button, ButtonProps } from "@rneui/themed";
import {
  LoginTabScreenPropsGeneric,
  StackScreenPropsGeneric,
} from "@src/@types/navigation";
import { Loadable } from "@src/components/Loadable";
import config from "@src/config";
import { User } from "@src/models/User";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard, { UserAddCard } from "./UserCard";
import { useSetUser } from "@src/hooks/useUser";

const userLengthMax = config["login.user.max"];

export default function LoginView() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const rootNavigation =
    useNavigation<StackScreenPropsGeneric<"Login">["navigation"]>();
  const loginNavigation =
    useNavigation<LoginTabScreenPropsGeneric<"UserLogin">["navigation"]>();
  const [userList, setUserList] = useState<User[] | undefined>(undefined);
  const [disableLogin, setDisableLogin] = useState(false);
  const setUser = useSetUser();

  const handleLogin = async () => {
    setDisableLogin(true);
    const user = (userList as User[])[selected as number];
    try {
      await user.login();
      await user.persist();
      setUser(user);
      rootNavigation.navigate("Main");
    } catch (err) {
      console.error(err);
    } finally {
      setDisableLogin(false);
    }
  };
  const handleDeleteUser = async () => {
    await (userList as User[])[selected as number].detach();
    // After one user is detached, the other users' id are changed.
    // Therefore, we reset the state `userList`.
    setUserList(undefined);
    setSelected(undefined);
    setUserList(await createUserList());
  };
  const handleAddUser = useCallback(() => {
    loginNavigation.navigate("UserAdd");
  }, [loginNavigation]);

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
  useEffect(() => {
    createUserList().then((res) => {
      setUserList(res);
    });
  }, []);

  const createUserCardList = useCallback(
    (userList: User[], selected?: number) => {
      const userCardList: React.ReactElement[] = [];
      userList.forEach((user, i) => {
        const { username, signature, avatar } = user.profile;
        userCardList.push(
          <UserCard
            key={`user_login${i}`}
            username={username}
            signature={signature}
            avatar={avatar || undefined}
            selected={selected === i}
            onPress={() => setSelected(i)}
          />
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
    [handleAddUser]
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
          onPress={handleLogin}
          disabled={disableLogin || selected === undefined}
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
