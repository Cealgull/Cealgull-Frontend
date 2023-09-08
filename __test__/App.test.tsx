import { render, screen } from "@testing-library/react-native";
import App from "../App";

// jest.mock("react-native-safe-area-context");

describe("Test App", () => {
  test("render correctly", async () => {
    render(<App />);
    await screen.findAllByText("添加用户", { timeout: 2000 });
    expect(screen).toMatchSnapshot();
  });
});
