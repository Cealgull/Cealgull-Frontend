import { render } from "@testing-library/react-native";
import App from "../App";

// jest.mock("react-native-safe-area-context");
jest.mock("@tanstack/react-query", () => {
  const actualQue = jest.requireActual("@tanstack/react-query");
  return {
    ...actualQue,
    useQuery: () => {
      return {
        data: "TopicMockText",
        isSuccess: true,
        isLoading: false,
        isError: false,
        refetch: () => {},
      };
    },
  };
});

describe("Test App", () => {
  test("render correctly", () => {
    render(<App />);
  });
});
