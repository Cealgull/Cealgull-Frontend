import { sha256 } from "@noble/hashes/sha256";
import {
  entropyToMnemonic,
  mnemonicToSeedSync,
  validateMnemonic,
  wordlists,
} from "bip39";
import { Language, mnemonicWordLists } from "./basic";

const DEFAULT_LANG: Language = "chinese_simplified";

/**
 * Used in UserAddView, to check if the user input a valid mnemonic sentence.
 * A valid mnemonic sentence is concatenated by 12 mnemonics in the word list,
 * and the corresponded entropy has valid checksum (the last 4 bits in our case).
 *
 * @example "的 的 的 的 的 的 的 的 的 的 的 在" -> true
 *          "铝 北 肠 泼 舞 京 墙 色 谐 养 园 暗" -> true
 *          "的 的 的 的 的 的 的 的 的 的 的 的" -> false
 *          "的 的 的 的 的 的 的 的 的 的 的" -> false
 */
export function isValidMnemonics(
  sentence: string,
  lang: Language = DEFAULT_LANG
): boolean {
  const userWordList = normalize(sentence).split(" ");
  if (userWordList.length !== 12) {
    return false;
  }
  return validateMnemonic(sentence, mnemonicWordLists[lang]);
}

/**
 * For a mnemonic sentence with insufficient length, this function generates
 * random bits to pad its entropy, and derive the checksum, finally returns the
 * standard (valid) mnemonic sentence.
 *
 * @param ENT @see https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
 */
export function fixMnemonics(
  sentence: string,
  lang: Language = DEFAULT_LANG,
  ENT: 128 | 160 | 192 | 224 | 256 = 128
): string {
  const wordList = wordlists[lang];
  const userWordList = normalize(sentence).split(" ");
  const CS = ENT / 32;
  const MS = (ENT + CS) / 11;
  if (userWordList.length > MS) {
    throw new Error("The given sentence is too long!");
  }
  if (userWordList.length === MS) {
    if (validateMnemonic(sentence, mnemonicWordLists[lang])) return sentence;
    throw new Error("The given sentence is invalid, and can't be fixed!");
  }
  // assert(userWordList.length < MS)
  const bits = userWordList
    .map((word) => {
      const index = wordList.indexOf(word);
      if (index === -1) {
        throw new Error();
      }
      return padString(index.toString(2), "0", 11);
    })
    .join("");
  // assert(bits.length === userWordList.length * 11)
  const entropyBits =
    bits +
    Array(ENT - bits.length)
      .fill("")
      .map(() => Math.floor(Math.random() * 2).toString(2))
      .join("");

  const entropyBytes = (entropyBits.match(/(.{1,8})/g) as RegExpMatchArray).map(
    binaryToByte
  );
  const entropy = Buffer.from(entropyBytes);
  const checksum = deriveChecksumBits(entropy);
  const finalEntropy =
    entropy.toString("hex") + binaryToByte(checksum).toString(16);

  return entropyToMnemonic(finalEntropy, wordList);
}

interface ConvertResult {
  seed: string;
}

type HandleResult =
  | ({ mnemonics: string; valid: true } & ConvertResult)
  | { mnemonics: string; valid: false };

/**
 * This function handles a mnemonic sentence, check if it's valid, returns useful information.
 * @returns mnemonics: original input
 * @returns valid: boolean
 * @returns seed: BIP39 seed
 */
export function handleMnemonics(
  sentence: string,
  lang: Language = DEFAULT_LANG
): HandleResult {
  if (!isValidMnemonics(sentence, lang)) {
    return { mnemonics: sentence, valid: false };
  }
  const seedBuffer = mnemonicToSeedSync(sentence);
  return {
    mnemonics: sentence,
    valid: true,
    seed: seedBuffer.toString("hex"),
  };
}

function normalize(str: string) {
  return (str || "").normalize("NFKD");
}

function padString(str: string, plh: string, length: number) {
  if (plh.length !== 1) {
    throw new Error("The placeholder must have length of 1");
  }
  return plh.repeat(length - str.length) + str;
}

function binaryToByte(bin: string): number {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes: number[]): string {
  return bytes.map((x) => padString(x.toString(2), "0", 8)).join("");
}

function deriveChecksumBits(entropyBuffer: Buffer) {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = sha256(Uint8Array.from(entropyBuffer));

  return bytesToBinary(Array.from(hash)).slice(0, CS);
}
