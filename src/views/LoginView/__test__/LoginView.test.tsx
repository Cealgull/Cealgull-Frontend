/**
 * @author Bojun Ren
 * @data 2023/07/07
 */
import SAMPLE_USERINFO from "@root/assets/sample/userInfo.json";
import { User, jsonToUserInfoPOJO } from "@src/models/User";
import configure from "@src/models/config";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
import LoginView from "../LoginView";

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
jest.mock("@src/hooks/useUser", () => ({
  __esModule: true,
  default: () => undefined,
  useSetUser: () => undefined,
}));

describe("Test LoginView", () => {
  test("render correctly", async () => {
    await configure();
    // Persist one user.
    await new User(
      "private",
      "cert",
      jsonToUserInfoPOJO(SAMPLE_USERINFO)
    ).persist();
    render(<LoginView />);
    await screen.findByText(SAMPLE_USERINFO.username, {}, { timeout: 5000 });
    expect(screen.getAllByText("添加用户")).toHaveLength(2);
    expect(screen).toMatchSnapshot();
  }, 20000);

  test("select user correctly", async () => {
    await configure();
    // Persist three users
    for (let i = 0; i < 3; ++i) {
      await new User(
        "private",
        "cert",
        jsonToUserInfoPOJO(SAMPLE_USERINFO)
      ).persist();
    }

    render(<LoginView />);

    function testOpacityToBe(x: number, value: number) {
      const checkIcon = screen.getAllByTestId("check_icon").at(x);
      expect(checkIcon?.props.style.at(-1).opacity).toBe(value);
    }

    const userCards = await screen.findAllByRole(
      "checkbox",
      {},
      { timeout: 5000 }
    );
    testOpacityToBe(0, 0);
    testOpacityToBe(1, 0);
    testOpacityToBe(2, 0);

    fireEvent.press(userCards.at(0) as ReactTestInstance);

    testOpacityToBe(0, 100);
    testOpacityToBe(1, 0);
    testOpacityToBe(2, 0);

    fireEvent.press(userCards.at(1) as ReactTestInstance);

    testOpacityToBe(0, 0);
    testOpacityToBe(1, 100);
    testOpacityToBe(2, 0);
  }, 20000);
});
