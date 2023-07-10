import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HeaderBarWrapper from "../HeaderBarWrapper";

// jest.mock("react-native-safe-area-context");

describe("Test HeaderBarWrapper", () => {
  test("render correctly", () => {
    render(
      <SafeAreaProvider>
        <HeaderBarWrapper alignMethod="lcr">
          <Text>left</Text>
          <Text>center</Text>
          <Text>right</Text>
        </HeaderBarWrapper>
      </SafeAreaProvider>
    );
    screen.getByText("center");
  });
});
