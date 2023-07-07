/**
 * @author Bojun Ren
 * @data 2023/07/07
 */
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
import LoginView from "../LoginView";

// FIXME use mock data
test("render LoginView correctly", () => {
  render(<LoginView />);
  const userCards = screen.getAllByRole("checkbox");
  expect(userCards.length).toBeGreaterThanOrEqual(1);
});

test("select user correctly", () => {
  function testOpacityToBe(x: number, value: number) {
    const checkIcon = screen.getAllByTestId("check_icon").at(x);
    expect(checkIcon?.props.style.at(-1).opacity).toBe(value);
  }

  render(<LoginView />);

  const userCards = screen.getAllByRole("checkbox");
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
});
