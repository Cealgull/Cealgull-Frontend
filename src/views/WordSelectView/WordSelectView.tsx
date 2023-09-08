import { useNavigation } from "@react-navigation/native";
import { Button, Dialog, Icon, Text } from "@rneui/themed";
import {
  LoginTabScreenPropsGeneric,
  StackScreenPropsGeneric,
} from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { User } from "@src/models/User";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WordCardList from "./WordCardList";
import { WordSelectedContext } from "./WordSelectContext";
import { selectConfig, selectLength } from "./select.config";
import { fixMnemonics } from "@src/utils/bip";

export default function WordSelectView() {
  // The selected words
  const [wordList, setWordList] = useState<string[]>([]);
  // The current page index
  const [index, setIndex] = useState<number>(0);
  // The visibility of `CompleteDialog`
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  // A Fake state to trigger re-renders for `WordSelectList`
  const [restartTimes, setRestartTimes] = useState<number>(0);
  const rootNavigation =
    useNavigation<StackScreenPropsGeneric<"Login">["navigation"]>();
  const loginNavigation =
    useNavigation<LoginTabScreenPropsGeneric<"WordSelect">["navigation"]>();

  const selectNext = useCallback(() => {
    if (wordList.length === selectConfig[index].most) setIndex((i) => i + 1);
    else Alert.alert(`请先选择 ${selectConfig[index].count} 个字！`);
  }, [wordList, index]);

  const selectRestart = useCallback(() => {
    setIndex(0);
    setWordList([]);
    setRestartTimes((i) => i + 1);
  }, []);

  const selectComplete = useCallback(() => {
    if (wordList.length !== selectConfig[index].most) {
      Alert.alert(`请先选择 ${selectConfig[index].count} 个字！`);
      return;
    }
    setIsDialogVisible(true);
  }, [index, wordList]);

  const toggleDialog = useCallback(() => setIsDialogVisible((f) => !f), []);

  const handleSelectOK = async () => {
    // TODO implement register success logic
    // const [user, mnemonic] = await User.registerFromMnemonic(wordList);
    // await user.login();
    // await user.persist();
    const user = new User("", "");
    const mnemonic = fixMnemonics(wordList.join(" "));
    rootNavigation.navigate("Welcome", { mnemonic, user });
    setIsDialogVisible(false);
  };

  const goBackMnemonicInput = useCallback(() => {
    loginNavigation.navigate("UserAdd");
  }, [loginNavigation]);

  return (
    <>
      <HeaderBarWrapper alignMethod="lc">
        <Icon
          name="chevron-back-outline"
          type={"ionicon"}
          size={40}
          onPress={goBackMnemonicInput}
        />
        <Text h4 h4Style={{ fontWeight: "700" }}>
          助记词选择
        </Text>
      </HeaderBarWrapper>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        {/* The text and the select blocks */}
        <View>
          <View style={styles.title_container}>
            <Text style={styles.title}>
              {`选择最喜欢的 ${selectConfig[index].count} 个字，\n` +
                "作为助记词的一部分。\n选择顺序将被记录。"}
            </Text>
          </View>
          <WordSelectedContext.Provider
            value={{ wordList, setWordList, index, setIndex }}
          >
            <WordCardList restartTimes={restartTimes} />
          </WordSelectedContext.Provider>
        </View>
        <View style={styles.button_row_container}>
          <RestartButton onPress={selectRestart} />
          {index === selectConfig.length - 1 ? (
            <CompleteButton onPress={selectComplete} />
          ) : (
            <NextButton onPress={selectNext} />
          )}
        </View>
        <CompleteDialog
          isVisible={isDialogVisible}
          toggleVisible={toggleDialog}
          onRestart={() => {
            selectRestart();
            setIsDialogVisible(false);
          }}
          onComplete={handleSelectOK}
          wordList={wordList}
        />
      </SafeAreaView>
    </>
  );
}

interface ButtonProps {
  onPress?: () => void;
}
const RestartButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <Button
      radius={"lg"}
      buttonStyle={[styles.button, styles.button_restart]}
      onPress={onPress}
    >
      <Text style={styles.button_text}>重选</Text>
      <Icon name="restart" type="material-community" color={"white"} />
    </Button>
  );
};
const NextButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <Button
      radius={"lg"}
      buttonStyle={[styles.button, styles.button_next]}
      onPress={onPress}
    >
      <Text style={styles.button_text}>下一组</Text>
      <Icon name="arrowright" type="antdesign" color={"white"} />
    </Button>
  );
};

const CompleteButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <Button
      radius={"lg"}
      buttonStyle={[styles.button, styles.button_complete]}
      onPress={onPress}
    >
      <Text style={styles.button_text}>完成!</Text>
      <Icon name="check" type="entypo" color={"white"} />
    </Button>
  );
};

interface CompleteDialogProps {
  isVisible: boolean;
  toggleVisible: () => void;
  wordList: string[];
  onRestart: () => void;
  onComplete: () => void;
}

const CompleteDialog: React.FC<CompleteDialogProps> = ({
  isVisible,
  toggleVisible,
  wordList,
  onRestart,
  onComplete,
}) => {
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={toggleVisible}
      overlayStyle={{ width: "80%" }}
    >
      <Dialog.Title title="确认助记词" titleStyle={styles.dialog_title} />
      <Text style={styles.dialog_text1}>您当前选择的助记词是：</Text>
      <Text style={styles.dialog_mnemonics}>
        {[
          wordList.slice(0, Math.floor(selectLength / 2)).join(" "),
          wordList.slice(Math.floor(selectLength / 2)).join(" "),
        ].join("\n")}
      </Text>
      <Dialog.Actions>
        <Dialog.Button
          title={"重选"}
          onPress={onRestart}
          titleStyle={{ fontSize: 18, color: "#e63946" }}
        />
        <Dialog.Button
          title={"下一步"}
          onPress={onComplete}
          titleStyle={{ fontSize: 18 }}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  title_container: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    lineHeight: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    width: 132,
  },
  button_next: {
    backgroundColor: "#56cfe1",
  },
  button_restart: {
    backgroundColor: "#e63946",
  },
  button_complete: {
    backgroundColor: "#52b788",
  },
  button_text: {
    color: "white",
    marginRight: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  button_row_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 50,
  },
  dialog_title: {
    fontSize: 24,
  },
  dialog_text1: {
    fontSize: 18,
    marginVertical: 10,
  },
  dialog_mnemonics: {
    lineHeight: 36,
    fontSize: 24,
    color: "#4361ee",
  },
});
