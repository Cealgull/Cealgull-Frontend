import { fireEvent, render, screen } from "@testing-library/react-native";
import { NavBar } from "..";

const mockedNavigate = jest.fn();
const mockpush = jest.fn();
const mockUseRoute = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      push: mockpush,
    }),
    useRoute: () => ({
      name: "Person",
    }),
  };
});

describe("NavBar Test", () => {
  beforeEach(() => {
    // Alternatively, set "clearMocks" in your Jest config to "true"
    mockpush.mockClear();
    mockedNavigate.mockClear();
    mockUseRoute.mockClear();
  });

  test("NavBar render test", () => {
    render(<NavBar />);
    screen.getByText("首页");
    screen.getByText("新建话题");
    screen.getByText("个人");
  });

  test("NavBar Navigate test without publish", async () => {
    render(<NavBar />);
    fireEvent.press(screen.getByText("个人"));
    fireEvent.press(screen.getByText("首页"));
    expect(mockedNavigate).toBeCalledTimes(2);
  });
  test("NavBar Navigate test with publish", async () => {
    render(<NavBar />);
    fireEvent.press(screen.getByTestId("publishIcon"));
    expect(mockpush).toBeCalledTimes(1);
  });
});
