/**
 * @summary Manage local storage
 * @author Bojun Ren
 * @data 2023/07/14
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "expo-modules-core";

const storageName = {
  userCount: "user-count", // initial: 0
  isFirstLaunch: "FIRST-LAUNCH", // initial: false
  userId: (id: number) => `user-${id}`,
};

/**
 * Called when APP is loaded for first time.
 */
async function initializeGlobal() {
  /**
   * Clear all storage
   * @see https://stackoverflow.com/a/57514334/17838999
   */
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === "android") {
      await AsyncStorage.clear();
    }
    if (Platform.OS === "ios") {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }

  const isFirstTime = await AsyncStorage.getItem(
    storageName.isFirstLaunch
  ).then(
    (val) => !(val === "false") // val can be "true" | "false" | null
  );
  if (!isFirstTime) {
    return;
  }
  await Promise.all([
    AsyncStorage.setItem(storageName.isFirstLaunch, "false"),
    AsyncStorage.setItem(storageName.userCount, "0"),
  ]);
}

/**
 * Initialize the APP's storage system.
 * Must be called at the App's very top.
 */
export default async function configure(): Promise<void> {
  await initializeGlobal();
}

export { storageName };
