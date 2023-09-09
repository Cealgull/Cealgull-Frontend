import { fireEvent, render, screen } from "@testing-library/react-native";
import { TopicTag } from "../TopicTag";

const mockFn = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockFn,
    }),
  };
});

describe("TopicTag test", () => {
  beforeEach(() => {
    mockFn.mockClear();
  });
  test("topic tag render test", () => {
    render(<TopicTag tagTitle="Test" color="" isCategory={true} />);
    render(<TopicTag tagTitle="Test" isCategory={false} />);
    render(<TopicTag tagTitle="Test" color="red" isCategory={true} />);
    render(<TopicTag tagTitle="Test" color="red" isCategory={false} />);
  });
  test("topic tag press test", () => {
    render(<TopicTag tagTitle="Test" color="red" isCategory={true} />);
    const filterButton = screen.getByTestId("tagFilter");
    fireEvent.press(filterButton);
  });
});
