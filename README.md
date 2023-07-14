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

ESLint is responsible for statically analyzing the code and finding problems during coding time. Install VS Code plugin ESLint. Before committing, make sure that `yarn lint` doesn't emit any error.

### Naming Convention

- Any property name exported is focused on using the **camelcase naming convention**.

- When it comes to local variables that won't be used outside a single file, camelcase and snake_case are both tolerant.

- Constants must be named with **UPPERCASE, UpperCamelCase, MACRO_CASE** and so on.

### Format

If using VS Code, install the prettier plugin. When saving the file, VS Code will trigger a format with prettier.

Alternatively, run `yarn format` to manually format all files. Before committing, make sure `yarn format:check` doesn't emit any error or waring.

### Spell Check

VS Code plugin Code Spell Checker is heavily recommended.

### Project Structure

The project is built with TypeScript + Expo Go. The structure is quite similar to typical React project.

- Any file using JSX syntax should be named with extension _.jsx_ or _.tsx_.
- Any file with pure JS/TS syntax should be name with extension _.js_ or _.ts_.
- Any type declaring file must be named as _\*.d.ts_, and put into _@types_ folder.
- Prefer _.ts_ and _.tsx_ to _.js_ and _.jsx_.
- Prefer `React.FC` to `React.Component`.
- Any single React component should be put into _components_ and _views_ folder, determined by its role.
- Separate _services_ into a folder.
- Customized React hooks should be put into _hooks_ folder.
- Any test files should be put into the \_\__test_\_\_ folder at the directory of the tested component. For example,
  ```
  .
  ├── HeaderBarWrapper.tsx
  └── __test__
      └── HeaderBarWrapper.test.tsx
  ```
- Don't push your sensitive information on GitHub. For example, the API configuration shouldn't be add to the repository.

### Test Cealgull.App

This repo is configured with Github Action. **On each push**, Github automatically runs every test unit, including lint, prettier and jest.

However, since the backend service is not a portion of this repo, every unit test related to the backend service should be treated specially. To achieve this, we take advantage of environment variables. All valid environment variables are documented in the next section.

For the convenience of developing and testing, the following workflows are proposed:

- For local development (when `NODE_ENV == 'develop'`): Launch another process locally as the mock service, which acts completely the same as the actual backend.
- For the automatic test by Github Action (when `NODE_ENV == 'test'`): Use [Mirage Js](https://miragejs.com/). Mock the service in test files.

You can never take care of the mock during regular development. To implement an unit test, you should implement the mock logic as well, which guarantees that `yarn test` is passed. CAUTION: Never push commits that can't pass the test.

### Environment Variables

With [dotenv](https://www.dotenv.org/) installed, Node will search for _.env_ file at the project root and inject the specified environment variables. Here list of the environment variables in the project scope.

- `NODE_ENV`: one of `'develop'`, `'production'` and `'test'`. **This variable should never be set manually.** During development (launch the project with `yarn start`), `NODE_ENV` is set to `'develop'`; Jest automatically sets it to `'test'`; after the App is built and running on users' devices, `NODE_ENV` is set to `'production'`.
- `AUTH_API`: the API of the authentication center. Example: `'http://localhost:8080'`. Should be set as secret.
- `FORUM_API`: the API of the main backend service. Example: `'http://localhost:8080'`. Should be set as secret.

## Submit a commit

The following workflow should be done, except for some special cases.

```sh
yarn # fix dependencies
yarn format:check
yarn format # if the previous command fails
yarn lint # fix errors! and try your best to fix warnings.
yarn test

#...

git commit # input your message, and husky will auto-check it
```

With husky successfully installed, it will check this steps automatically.
