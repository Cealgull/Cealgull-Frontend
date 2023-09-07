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
