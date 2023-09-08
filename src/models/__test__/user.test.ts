import AsyncStorage from "@react-native-async-storage/async-storage";
import { _userInfo_sample } from "@root/assets/sample";
import { startAuthServer } from "@src/services/__test__/mirage";
import { isValidMnemonics } from "@src/utils/bip";
import { User, UserInfoPOJO } from "../User";
import configure, { storageName } from "../config";

describe("User class basic test", () => {
  beforeEach(async () => {
    await configure();
    jest.clearAllMocks();
  });
  afterEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });
  it("setter/getter", async () => {
    let user: User;
    user = new User("", "", _userInfo_sample as UserInfoPOJO);
    expect(user.profile.muted).toBe(true);
    user = new User("", "");
    expect(() => user.profile).toThrow(/critical error/i);
  });

  it("Interact with async storage", async () => {
    let getItemTimes = 0; // expected AsyncStorage.getItem call times
    async function expectUserCountToEqual(count: number) {
      ++getItemTimes;
      expect(await User.getUserCount()).toEqual(count);
    }
    await expectUserCountToEqual(0);
    await new User("privateKey", "cert").persist();
    getItemTimes += 1; // persist call getItem to obtain user-count
    await expectUserCountToEqual(1);

    await User.getUser(0);
    getItemTimes += 2;
    expect(AsyncStorage.getItem).toBeCalledTimes(getItemTimes);
  });

  it("Detach an user", async () => {
    const users = Array(3)
      .fill(0)
      .map(
        (_v, i) => new User("", "", { username: i.toString() } as UserInfoPOJO)
      );
    await users[0]
      .persist()
      .then(() => User.getUserCount())
      .then((userCount) => expect(userCount).toBe(1));
    await new User("", "")
      .detach()
      .then(() => User.getUserCount())
      .then((val) => expect(val).toBe(1));
    await users[1].persist();
    await users[2]
      .persist()
      .then(() => User.getUserCount())
      .then((val) => expect(val).toBe(3));
    await User.getUser(0).then((user) =>
      expect(user.profile.username).toBe("0")
    );
    await users[0]
      .detach()
      .then(() => User.getUserCount())
      .then((val) => expect(val).toBe(2));
    await User.getUser(0).then((user) =>
      expect(user.profile.username).toBe("1")
    );
    await User.getUser(2).catch((reason) => expect(reason).toMatch(/invalid/i));
    await User.getUser(1)
      .then((user) => user.detach())
      .then(() => User.getUserCount())
      .then((val) => expect(val).toBe(1));
  });

  it("Bad user-count storage", () => {
    return AsyncStorage.setItem(storageName.userCount, "invalid number").then(
      () => {
        expect(new User("", "").persist()).rejects.toMatch(/parse/i);
      }
    );
  });

  it("Bad user id", async () => {
    await expect(User.getUser(await User.getUserCount())).rejects.toMatch(
      /invalid/i
    );
    await expect(User.getUser(-1)).rejects.toMatch(/invalid/i);
  });
});

describe("User static factory test", () => {
  const mnemonic10 = "铝 北 肠 泼 舞 京 墙 色 谐 养";
  const mnemonic12 = "铝 北 肠 泼 舞 京 墙 色 谐 养 园 暗";
  const mnemonic_invalid = "的 的 的 的 的 的 的 的 的 的 的 的";

  it("register: reject complete mnemonic", () => {
    return expect(
      User.registerFromMnemonic(mnemonic12.split(" "))
    ).rejects.toMatch(/do you mean/i);
  });

  it("restore: reject invalid mnemonic", () => {
    return expect(User.restoreFromMnemonic(mnemonic_invalid)).rejects.toMatch(
      /invalid/i
    );
  });

  it("register: success", () => {
    const server = startAuthServer();
    return User.registerFromMnemonic(mnemonic10.split(" ")).then(() =>
      server.shutdown()
    );
  });

  it("restore: success", () => {
    const server = startAuthServer();
    return User.restoreFromMnemonic(mnemonic12).then(() => server.shutdown());
  });

  it("Violent test: register with valid mnemonic", async () => {
    const server = startAuthServer();
    for (let i = 0; i < 100; ++i) {
      const [, mnemonic] = await User.registerFromMnemonic(
        mnemonic10.split(" ")
      );
      expect(isValidMnemonics(mnemonic)).toBeTruthy();
    }
    server.shutdown();
  });
});
