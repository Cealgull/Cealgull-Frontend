import { useNavigation } from "@react-navigation/native";
import { Button, ButtonProps, Icon, Text } from "@rneui/themed";
import { LoginTabScreenPropsGeneric } from "@src/@types/navigation";
import { isValidMnemonics } from "@src/utils/bip";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function UserAddScreen() {
  const [wordInput, setWordInput] = useState<string>("");
  const navigation =
    useNavigation<LoginTabScreenPropsGeneric<"UserAdd">["navigation"]>();

  const valid = isValidMnemonics(wordInput, "chinese_simplified");

  const handleSubmit = () => {
    // TODO submit mnemonics
    navigation.navigate("UserLogin");
  };

  const goToSelect = () => {
    // TODO go to selection view
    navigation.navigate("WordSelect");
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text h1 h1Style={{ fontWeight: "700" }}>
          添加用户
        </Text>
        <KeyboardAvoidingView behavior="position">
          <Text h4 style={styles.prompt_mnemonics}>
            输入助记词（用空格分隔）
          </Text>
          <TextInput
            style={styles.input}
            placeholder="请注意助记词的顺序"
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            value={wordInput}
            onChangeText={setWordInput}
          />
          <MnemonicsChecker valid={valid} onSubmit={handleSubmit} />
        </KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.prompt_select}>或者...还没有助记词？</Text>
          <IntoSelectButton onPress={goToSelect} />
        </View>
      </View>
    </Pressable>
  );
}

type IntoSelectButtonProps = Omit<
  ButtonProps,
  "title" | "buttonStyle" | "titleStyle"
>;

const IntoSelectButton: React.FC<IntoSelectButtonProps> = (otherProps) => {
  return (
    <Button
      title={"在这里选择助记词，\n这将是你独一无二的凭证！"}
      buttonStyle={styles.btn}
      titleStyle={styles.btn_title}
      type="clear"
      {...otherProps}
    />
  );
};

const MnemonicsCorrectnessAwareIcon: React.FC<{ valid: boolean }> = ({
  valid,
}) => {
  if (valid) {
    return <Icon name="check" type="entypo" color={"green"} size={32} />;
  }
  return <Icon name="cross" type="entypo" color={"#bf0603"} size={32} />;
};

interface MnemonicsCheckerProps {
  valid: boolean;
  onSubmit?: () => void;
}
/**
 * Checked information, button to submit
 */
const MnemonicsChecker: React.FC<MnemonicsCheckerProps> = ({
  valid,
  onSubmit,
}) => {
  return (
    <>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <MnemonicsCorrectnessAwareIcon valid={valid} />
        <Text style={styles.checker_info}>
          {valid ? "助记词格式正确！" : "无效的助记词！"}
        </Text>
      </View>
      <Button
        title={"提交"}
        disabled={!valid}
        radius={"md"}
        onPress={onSubmit}
      />
    </>
  );
};

const { width: screenWidth } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  prompt_mnemonics: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: screenWidth - 100,
    height: 60,
    fontSize: 18,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  prompt_select: {
    marginBottom: 16,
    fontSize: 16,
  },
  btn: {
    width: screenWidth - 132,
    padding: 10,
    borderRadius: 10,
  },
  btn_title: {
    fontSize: 20,
    fontWeight: "700",
  },
  checker_info: {
    color: "rgba(0,0,0,0.5)",
    fontWeight: "700",
  },
});
