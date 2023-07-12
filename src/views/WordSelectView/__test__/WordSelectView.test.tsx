import { fireEvent, render, screen } from "@testing-library/react-native";
import { Alert } from "react-native";
import { ReactTestInstance } from "react-test-renderer";
import WordSelectView from "../WordSelectView";
const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

/**
 * @see https://jestjs.io/docs/es6-class-mocks
 */
jest.mock("@src/config", () => {
  return {
    __esModule: true,
    default: {
      "register.mnemonics.counts": [1, 1],
    },
  };
});
jest.spyOn(Alert, "alert");

describe("Test WordSelectView", () => {
  afterEach(jest.clearAllMocks);

  test("render correctly", () => {
    render(<WordSelectView />);
    screen.getByText("下一组");
    screen.getByText("重选");
  });

  test("select words", () => {
    render(<WordSelectView />);
    const words = screen.getAllByRole("checkbox");
    fireEvent.press(words.at(0) as ReactTestInstance);
    fireEvent.press(words.at(1) as ReactTestInstance);
    fireEvent.press(words.at(1) as ReactTestInstance);
    expect(Alert.alert).toHaveBeenCalledTimes(2);
  });

  test("button changed correctly", () => {
    render(<WordSelectView />);
    const words = screen.getAllByRole("checkbox");
    fireEvent.press(words.at(0) as ReactTestInstance);
    expect(Alert.alert).toHaveBeenCalledTimes(0);
    const button1 = screen.getByText("下一组");
    fireEvent.press(button1);
    screen.getByText("完成!");
  });
});
