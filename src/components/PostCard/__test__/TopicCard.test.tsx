import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
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

const Props = {
  children: <Text>Good afternoon!</Text>,
  title: "HELLO",
  username: "User1",
  userAvatar: "",
  time: "2003/02/19 18:35:00",
};

describe("TopicCard Test", () => {
  beforeEach(() => {
    mockpush.mockClear();
  });
  test("TopicCard render test", () => {
    render(<TopicCard {...Props}></TopicCard>);
    screen.getByText("Good afternoon!");
    screen.getByText("HELLO");
    screen.getByText("User1");
    screen.getByText("2003/02/19 18:35:00");
  });
  test("TopicCard navigate test", () => {
    render(<TopicCard {...Props}></TopicCard>);
    fireEvent.press(screen.getByTestId("TopicCardButton"));
    expect(mockpush).toBeCalledTimes(1);
  });
});
