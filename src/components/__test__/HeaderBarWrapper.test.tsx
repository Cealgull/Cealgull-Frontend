import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import HeaderBarWrapper from "../HeaderBarWrapper";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
});
