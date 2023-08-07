import { fireEvent, render, screen } from "@testing-library/react-native";
import TopicCard from "../TopicCard";

const mockpush = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      push: mockpush,
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

const TestProps = {
  category: "Genshin",
  cid: "QmQoKy9svWsjyKrpwTSEADc3FxamfFBDuYcXcG91D9jcZ6",
  createTime: "2023-07-13T07:30:02.987262099Z",
  creator: "User404830553902647325714607466232238944473254011640",
  id: "f7043b0f-bd58-4d3e-bc22-97c4a5559ce6",
  images: [
    "QmXPwxdwh8RLikvkTDpCBKvJzCvo6CbsgugFx6Qu5JUnnk",
    "Qma3U8HM5xUoKrhXveRr4KJFwZVJswiEntATLGnHCkMZWn",
  ],
  tags: ["win", "lose"],
  title: "Genshin Impact, run!",
  updateTime: "2023-07-13T07:30:02.987262099Z",
};

describe("TopicCard Test", () => {
  beforeEach(() => {
    mockpush.mockClear();
  });
  test("TopicCard render test", () => {
    render(<TopicCard {...TestProps}></TopicCard>);
    screen.getByText("Genshin Impact, run!");
    screen.getByText("TopicMockText");
  });
  test("TopicCard navigate test", () => {
    render(<TopicCard {...TestProps}></TopicCard>);
    fireEvent.press(screen.getByTestId("TopicCardButton"));
    expect(mockpush).toBeCalledTimes(1);
  });
});
