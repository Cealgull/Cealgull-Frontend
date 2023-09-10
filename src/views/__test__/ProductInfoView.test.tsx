import { fireEvent, render, screen } from "@testing-library/react-native";
import { ProductionInfoView } from "../ProductInfoView";

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      pop: mockedNavigate,
    }),
  };
});

describe("ProductInfoView", () => {
  test("render test", () => {
    render(<ProductionInfoView />);
    screen.getByText("产品信息");
    screen.getByText("Cealgull");
    screen.getByText(
      "Next-generation fully anonymous forum software based on Web3 technology and blockchain storage"
    );
    screen.getByText("Version: 1.0");
    screen.getByText("Fronted: Bojun Ren, Haocheng Wang");
    screen.getByText("Backend: Yiyang Wu, Ke Xv");

    const button = screen.getByTestId("ProductionInfoReturnButton");
    fireEvent.press(button);
    expect(mockedNavigate.call.length).toBe(1);
  });
});
