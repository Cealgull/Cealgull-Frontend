import { fireEvent, render, screen } from "@testing-library/react-native";
import TopicCard from "../TopicCard";
import exampleTopicProps from "@root/__test__/response/forum_topic.json";

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
    // FIXME type error
    render(<TopicCard {...exampleTopicProps}></TopicCard>);
    screen.getByText("Genshin Impact, run!");
    screen.getByText("TopicMockText");
  });

  test("TopicCard navigate test", () => {
    render(<TopicCard {...exampleTopicProps}></TopicCard>);
    fireEvent.press(screen.getByTestId("TopicCardButton"));
    expect(mockPush).toBeCalledTimes(1);
  });
});
