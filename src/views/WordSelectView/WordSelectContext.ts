import React from "react";
export interface WordSelectedContextType {
  wordList: string[];
  setWordList: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
export const WordSelectedContext = React.createContext<
  WordSelectedContextType | undefined
>(undefined);
