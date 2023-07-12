import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HeaderBarWrapper from "../HeaderBarWrapper";

// jest.mock("react-native-safe-area-context");

describe("Test HeaderBarWrapper", () => {
  test("render correctly no empty", () => {
    render(
      <SafeAreaProvider>
        <HeaderBarWrapper alignMethod="lcr">
          <Text>left</Text>
          <Text>center</Text>
          <Text>right</Text>
        </HeaderBarWrapper>
      </SafeAreaProvider>
    );
    screen.getByText("left");
    screen.getByText("center");
    screen.getByText("right");
  });
  test("render correctly empty", () => {
    render(
      <SafeAreaProvider>
        <HeaderBarWrapper />
      </SafeAreaProvider>
    );
  });
  test("render format not match", () => {
    render(
      <SafeAreaProvider>
        <HeaderBarWrapper alignMethod="lc">
          <Text>child1</Text>
          <Text>child2</Text>
          <Text>child3</Text>
        </HeaderBarWrapper>
      </SafeAreaProvider>
    );
    screen.getByText("child1");
    screen.getByText("child2");
    screen.getByText("child3");
  });
});
