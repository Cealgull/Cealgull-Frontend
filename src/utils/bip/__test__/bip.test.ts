import { fixMnemonics, handleMnemonics, isValidMnemonics } from "../tools";

describe("Test bip utils", () => {
  test("function: isValidMnemonics", () => {
    const validMS = [
      "的 的 的 的 的 的 的 的 的 的 的 在",
      "铝 北 肠 泼 舞 京 墙 色 谐 养 园 暗",
    ];
    const invalidMS = [
      "的 的 的 的 的 的 的 的 的 的 的 的",
      "的 的 的 的 的 的 的 的 的 的 的",
      "1 2 3 4 5 6 7 8 9 10 11",
    ];
    validMS.forEach((ms) => {
      expect(isValidMnemonics(ms)).toBeTruthy();
    });
    invalidMS.forEach((ms) => {
      expect(isValidMnemonics(ms)).toBeFalsy();
    });
  });

  test("function: fixMnemonics", () => {
    const fixableMS = [
      "的 的 的 的 的 的 的 的 的 的 的 在", // Already valid
      "铝 北 肠 泼 舞 京 墙 色 谐 养 园",
      "的 的 的 的 的 的 的 的 的 的 的",
      "的 的 的 的 的 的 的 的 的",
      "铝 北 肠 泼 舞",
      "铝",
    ];
    const tooLongMS = ["的 的 的 的 的 的 的 的 的 的 的 在 的"];
    const notFixableMS = [
      "的 的 的 的 的 的 的 的 的 的 的 的",
      "铝 北 肠 泼 舞 京 墙 色 谐 养 园 二",
    ];

    fixableMS.forEach((ms) => {
      expect(isValidMnemonics(fixMnemonics(ms))).toBeTruthy();
    });
    tooLongMS.forEach((ms) => {
      expect(() => fixMnemonics(ms)).toThrow(/too long/);
    });
    notFixableMS.forEach((ms) => {
      expect(() => fixMnemonics(ms)).toThrow(/invalid/);
    });
  });

  test("function: handleMnemonics", () => {
    const mnemonics = "铝 北 肠 泼 舞 京 墙 色 谐 养 园 暗";
    const messages = ["hello, world!", "中文字", ""];
    const { sign, verify } = handleMnemonics(mnemonics);

    messages.forEach((m) => {
      const signature = sign(m);
      expect(verify(signature, m)).toBeTruthy();
    });
  });

  test("Violent test: fixMnemonic", () => {
    const mnemonic = "众 戴 靠 烘 矩 看 丧 良 矛 储";
    for (let i = 0; i < 100; ++i) {
      const fixedMnemonic = fixMnemonics(mnemonic);
      expect(isValidMnemonics(fixedMnemonic)).toBeTruthy();
    }
  }, 20000);
});
