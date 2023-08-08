import { render } from "@testing-library/react-native";
import App from "../App";

// jest.mock("react-native-safe-area-context");

describe("Test App", () => {
  test("render correctly", () => {
    render(<App />);
  });
});
