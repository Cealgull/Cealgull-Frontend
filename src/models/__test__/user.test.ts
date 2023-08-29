import AsyncStorage from "@react-native-async-storage/async-storage";
import { _userInfo_sample } from "@root/assets/sample";
import { User } from "../User";
import configure, { storageName } from "../config";

describe("User class unit test", () => {
  beforeEach(async () => {
    await configure();
    jest.clearAllMocks();
  });
  afterEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });
  it("setter/getter", () => {
    const user = new User("", "");
    expect(user.profile).toBeNull();
    user.profile = _userInfo_sample;
    expect(user.profile.muted).toBe(true);
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
