import { fireEvent, render, screen } from "@testing-library/react-native";
import TopicCard from "../TopicCard";
import * as componentTestData from "../../../../__test__/response/componentTestData.json";

const mockPush = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      push: mockPush,
    }),
  };
});
jest.mock("@tanstack/react-query", () => {
  const actualQue = jest.requireActual("@tanstack/react-query");
  return {
    ...actualQue,
    useQuery: () => {
      return { data: "TopicMockText", isSuccess: true };
    },
  };
});

describe("TopicCard Test", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });
  test("TopicCard render test", () => {
    render(
      <TopicCard
        topicInfo={componentTestData["TopicCard.test"]}
        canjump={false}
      ></TopicCard>
    );
    screen.getByText("This is the content of the topic.");
    screen.getByText("Technology");
  });

  test("TopicCard navigate test", () => {
    render(
      <TopicCard
        topicInfo={componentTestData["TopicCard.test"]}
        canjump={true}
      ></TopicCard>
    );
    fireEvent.press(screen.getByTestId("TopicCardButton"));
    expect(mockPush).toBeCalledTimes(1);
  });
});
