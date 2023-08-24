module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@src": "./src",
            "@root": ".",
          },
        },
      ],
      [
        "react-native-reanimated/plugin",
        {
          relativeSourceLocation: true,
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@dot-env",
          path: ".env",
        },
      ],
    ],
  };
};
