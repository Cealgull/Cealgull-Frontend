/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv/config");
global.self = global;
// global.window = {};
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.Headers = undefined;
global.Request = undefined;
global.Response = undefined;

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("src/services/api.config.ts");
require("react-native-gesture-handler/jestSetup");
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {};

  return Reanimated;
});
