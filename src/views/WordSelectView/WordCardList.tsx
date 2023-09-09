import { TabView } from "@rneui/themed";
import { mnemonicWordLists } from "@src/utils/bip";
import shuffle from "@src/utils/shuffle";
import React, { useCallback, useContext, useMemo } from "react";
import {
  Alert,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  WordSelectedContext,
  WordSelectedContextType,
} from "./WordSelectContext";
import { selectConfig } from "./select.config";

export default function WordCardList({
  restartTimes,
}: {
  restartTimes: number;
}) {
  /**
   * `restartTimes` increases when the user restart the selection.
   * Therefore a re-sort will trigger.
   */
  const wordList = useMemo<string[]>(() => {
    const wordListChinese = shuffle(mnemonicWordLists["chinese_simplified"]);
    return wordListChinese.slice(0, 36);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartTimes]);

  const { index } = useContext(WordSelectedContext) as WordSelectedContextType;

  const createRow = useCallback(
    (begin: number, end: number) => {
      return (
        <View style={styles.row_container}>
          {wordList.slice(begin, end).map((word) => (
            <WordCard word={word} key={word} />
          ))}
        </View>
      );
    },
    [wordList]
  );

  const createTabItem = useCallback(
    (begin: number) => {
      return (
        <TabView.Item style={styles.tab_item}>
          <>
            {createRow(begin, begin + 3)}
            {createRow(begin + 3, begin + 6)}
            {createRow(begin + 6, begin + 9)}
          </>
        </TabView.Item>
      );
    },
    [createRow]
  );

  return (
    <>
      <TabView
        value={index}
        // onChange={setIndex}
        animationType="timing"
        containerStyle={styles.tab_container}
        animationConfig={{
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.71, 0.15, 0.2, 0.76),
        }}
        disableSwipe
      >
        {createTabItem(0)}
        {createTabItem(9)}
        {createTabItem(18)}
        {createTabItem(27)}
      </TabView>
    </>
  );
}

interface WordCardProps {
  word: string;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const context = useContext(WordSelectedContext);

  const selected =
    context === undefined ? false : context.wordList.includes(word);

  const handlePress = () => {
    if (context === undefined) {
      Alert.alert("点的太快啦！稍等一下。");
      return;
    }
    const { wordList, setWordList, index } = context;

    if (selected) {
      // Cancel selected
      setWordList((wordList) => wordList.filter((_word) => _word !== word));
      return;
    }
    // Check whether selecting more
    if (wordList.length === selectConfig[index].most)
      Alert.alert(`最多选取${selectConfig[index].count}个词！`);
    else setWordList((wordList) => [...wordList, word]);
  };

  return (
    <Pressable onPress={handlePress} accessibilityRole="checkbox">
      <View
        style={[
          styles.word_card,
          { ...(selected && styles.word_card_selected) },
        ]}
      >
        <Text style={styles.word}>{word}</Text>
      </View>
    </Pressable>
  );
};

const { width } = Dimensions.get("screen");
const card_width = (width - 120) / 3;

const styles = StyleSheet.create({
  row_container: {
    flexDirection: "row",
  },
  word: {
    fontSize: 48,
    fontWeight: "600",
    color: "rgba(0,0,0,0.75)",
  },
  word_card: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    width: card_width,
    height: card_width,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 5, height: 5 },
  },
  word_card_selected: {
    backgroundColor: "#80ed99",
  },
  tab_container: {
    height: card_width * 4,
    flex: 0,
    // backgroundColor: "red",
  },
  tab_item: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
