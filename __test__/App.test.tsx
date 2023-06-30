import { render, screen } from "@testing-library/react-native";
import App from "../App";

test("App", () => {
  render(<App />);
  screen.getByText("This is an App created by React Native!");
});
