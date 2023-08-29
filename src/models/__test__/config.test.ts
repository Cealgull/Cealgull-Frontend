import AsyncStorage from "@react-native-async-storage/async-storage";
import configure from "../config";

describe("The APP can be successfully configured", () => {
  beforeEach(async () => {
    await configure();
  });
  it("Manually configure the storage system", async () => {
    expect(await AsyncStorage.getItem("user-count")).toEqual("0");
    expect(await AsyncStorage.getItem("FIRST-LAUNCH")).toMatch(/FALSE/i);
  });
  it("Don't configure multiple times", () => {
    expect(configure()).resolves;
  });
});
