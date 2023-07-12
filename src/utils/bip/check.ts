import { Language, mnemonicWordLists } from "./basic";

/**
 * Check if a text can be split into 11 words in the specified word list.
 * @deprecated
 */
export function check(text: string, language: Language): boolean {
  const wordList = mnemonicWordLists[language];
  const userWordList = text.split(" ");
  if (userWordList.length !== 11) return false;
  return userWordList.every((word) => {
    return word.length === 1 && wordList.find((_word) => _word === word);
  });
}
