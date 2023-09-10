import { fireEvent, render, screen } from "@testing-library/react-native";
import { SettingView } from "../SettingView";
import { StatisticsView } from "../StatisticsView";
import { UserStatistics } from "@src/models/User";

const statisticsTestData1: UserStatistics = {
  upvotesGranted: 1,
  upvotesRecieved: 1,
  postsCreated: 1,
  topicsCreated: 1,
  registerDate: new Date(),
};

const mockedPop = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      pop: mockedPop,
    }),
  };
});

describe("StatisticsView and AccountView test", () => {
  test("SettingView Test", () => {
    render(<SettingView />);
  });
  test("StatisticsView Test", () => {
    render(<StatisticsView userStatistics={statisticsTestData1} />);
    const statisticsPop = screen.getByTestId("statisticsPop");
    fireEvent.press(statisticsPop);
  });
});
