/**
 * @author Bojun Ren
 * @data 2023/07/07
 */
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "./UserCard";
import user from "./userInfo";

const LoginButton: React.FC = () => {
  return (
    <Button
      title="登入"
      buttonStyle={styles.button}
      titleStyle={styles.button_text}
      containerStyle={styles.button_container}
    />
  );
};

export default function LoginView() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.welcome}>欢迎回来！</Text>
      <View>
        {user.map(({ userName, email }, i) => (
          <Pressable
            key={`user_login${i}`}
            onPress={() => setSelected(i)}
            accessibilityRole="checkbox"
          >
            <UserCard {...{ userName, email }} selected={selected === i} />
          </Pressable>
        ))}
      </View>
      <LoginButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#48b89f",
    borderRadius: 5,
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
});
