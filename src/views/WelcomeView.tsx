import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import useTextInput from "@src/hooks/useTextInput";
import { useSetUser } from "@src/hooks/useUser";
import { User } from "@src/models/User";
import * as Clipboard from "expo-clipboard";
import React, { useMemo, useState } from "react";
import { Alert, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type WelcomeViewProps = {
  user: User;
  mnemonic: string;
};

/**
 * This view is for a new user.
 * Allow the user to set his/her initial profile and remember the mnemonic.
 * @param mnemonic the new user's full mnemonic sentence
 * @param user the new user
 */
export default function WelcomeView({ mnemonic, user }: WelcomeViewProps) {
  const rootNavigation =
    useNavigation<StackScreenPropsGeneric<"Login">["navigation"]>();
  const setUser = useSetUser();

  const [username, userNameInputEle] = useTextInput(styles.form_input_style, {
    text: user.profile.username,
  });
  const [signature, signatureInputEle] = useTextInput(styles.form_input_style, {
    text: user.profile.signature,
  });

  const handleOnEnter = () => {
    setUser(user);
    rootNavigation.navigate("Main");
  };

  const handleOnSave = async () => {
    await user.updateProfile({ username, signature });
    Alert.alert("保存成功！");
  };

  const form = useMemo(() => {
    const inputElementTable = {
      用户名: userNameInputEle,
      个性签名: signatureInputEle,
    };
    const formElementList: JSX.Element[] = [];
    for (const [promptStr, ele] of Object.entries(inputElementTable)) {
      formElementList.push(
        <View key={`form_${promptStr}`}>
          <Text style={styles.form_prompt}>{promptStr + "："}</Text>
          <View style={styles.form_input_container}>{ele}</View>
        </View>
      );
    }
    return (
      <View role="form" style={styles.form_container}>
        {formElementList}
      </View>
    );
  }, [userNameInputEle, signatureInputEle]);
  return (
    <>
      <SafeAreaView style={styles.container} mode="margin">
        {/* <Text h2>（此页面仍在开发）</Text> */}
        <Text h1 h1Style={styles.title}>
          注册成功！
        </Text>
        {/* <Text>{user.profile.username}</Text> */}
        <MnemonicDisplay mnemonic={mnemonic} />
        {form}
        <View style={styles.buttonListContainer}>
          <Button
            type="solid"
            title={"保存信息"}
            onPress={handleOnSave}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
          <Button
            type="solid"
            title={"进入论坛"}
            onPress={handleOnEnter}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
        </View>
        {/* <Button
          type="outline"
          title={"返回主界面"}
          onPress={() => loginNavigation.navigate("UserLogin")}
        /> */}
      </SafeAreaView>
    </>
  );
}

interface MnemonicDisplayProps {
  mnemonic: string;
}

const MnemonicDisplay: React.FC<MnemonicDisplayProps> = ({ mnemonic }) => {
  const wordList = mnemonic.split(" ");
  const [copied, setCopied] = useState(false);

  const handleCopyMnemonic: () => Promise<void> = async () => {
    if (copied) {
      return;
    }
    await Clipboard.setStringAsync(mnemonic);
    setCopied(true);
  };

  return (
    <View style={displayStyle.container}>
      <Text style={displayStyle.prompt}>🥰 你独一无二的助记词</Text>
      <View style={displayStyle.rec}>
        <Pressable onPress={handleCopyMnemonic}>
          <Text style={displayStyle.mnemonic}>
            {wordList.slice(0, 6).join("  ") +
              "\n" +
              wordList.slice(6, 12).join("  ")}
          </Text>
        </Pressable>
      </View>
      <Text
        style={[
          displayStyle.prompt,
          { position: "relative" },
          copied
            ? { color: "#126635", left: 14 }
            : {
                color: "red",
                left: 0,
              },
        ]}
      >
        {copied ? "复制成功！😆" : "点击卡片自动复制 🤔"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    // Handle the tailing "！"
    position: "relative",
    left: 16,
  },
  form_container: {
    width: Dimensions.get("screen").width - 100,
    rowGap: 16,
  },
  form_input_style: {
    fontSize: 16,
    marginHorizontal: 2,
    marginVertical: 8,
  },
  form_prompt: {
    fontSize: 16,
  },
  form_input_container: {
    borderColor: "rgba(0,0,0,0.6)",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  buttonListContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: Dimensions.get("screen").width - 100,
    marginVertical: 20,
  },
  buttonContainer: {
    borderRadius: 6,
  },
  buttonTitle: {
    fontSize: 20,
  },
});

const displayStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap: 10,
  },
  prompt: {
    fontSize: 16,
    fontWeight: "400",
  },
  mnemonic: {
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 36,
  },
  rec: {
    borderColor: "#1565c0",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0,0.3)",
    shadowRadius: 6,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
