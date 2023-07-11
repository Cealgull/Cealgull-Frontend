import { wordlists } from "bip39";

export type Language =
  | "chinese_simplified"
  | "chinese_traditional"
  | "korean"
  | "czech"
  | "french"
  | "italian"
  | "spanish"
  | "japanese"
  | "portuguese"
  | "english";

type MnemonicsWordLists = {
  [lang in Language]: string[];
};

export const mnemonicWordLists = wordlists as MnemonicsWordLists;
