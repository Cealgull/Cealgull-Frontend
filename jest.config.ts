import type { Config } from "jest";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestPreset = require("@testing-library/react-native/jest-preset");

const config: Config = {
  collectCoverage: true,
  verbose: false,
  preset: "jest-expo",
  setupFiles: [...jestPreset.setupFiles],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "./jest.setup.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@rneui|@noble)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js,.tsx,.jsx}", "App.tsx"],
  coveragePathIgnorePatterns: ["mirage.(js|ts)"],
};

module.exports = config;
