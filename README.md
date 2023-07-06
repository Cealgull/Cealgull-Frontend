# Cealgull Frontend

Here is the mobile frontend of Project Cealgull.

## Features

- **Template**: typescript + react-native + expo
- eslint + jest + testing-library + prettier

## Build and Launch

```sh
yarn install  # dependencies
yarn start    # launch
```

## Code Quality

Guaranteed by ESLint and Prettier, and some other plugins.

### Statical Analyzer

ESLint is responsible for statically analyzing the code and finding problems during coding time. Install VS Code plugin _ESLint_. Before committing, make sure `yarn lint` doesn't emit any error.

### Naming Convention

- Any property name exported is focused on using the **camelcase naming convention**.

- When it comes to local variables that won't be used outside a single file, camelcase and snake_case are both tolerant.

- Constants must be named with **UPPERCASE, UpperCamelCase, MACRO_CASE** and so on.

### Format

If using VS Code, install _prettier_ plugin. When saving the file, VS Code will trigger a format with prettier.

Alternatively, run `yarn format` to manually format all files. Before committing, make sure `yarn format:check` doesn't emit any error or waring.

### Spell Check

VS Code plugin _Code Spell Checker_ is heavily recommended.

### Project Structure

The project is built with TypeScript + Expo Go. The structure is quite similar to typical React project.

- Any file using JSX syntax should be named with extension _.jsx_ or _.tsx_.
- Any file with pure JS/TS syntax should be name with extension _.js_ or _.ts_.
- Any type declaring file must be named as _\*.d.ts_, and put into _@types_ folder.
- Prefer _.ts_ and _.tsx_ to _.js_ and _.jsx_.
- Prefer `React.FC` to `React.Component`.
- Any single React component should be put into _components_ and _views_ folder, determined by its role.
- Separate _services_ into a folder.
- Customized React hooks should be put into _services_ or _utils_ folder, determined by its usage.
- Any test files should be put into the \_\__test_\_\_ folder at the directory of the tested component. For example,
  ```
  .
  ├── HeaderBarWrapper.tsx
  └── __test__
      └── HeaderBarWrapper.test.tsx
  ```
