import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import PostCard from "../PostCard";

const Props = {
  children: <Text>Good afternoon!</Text>,
  title: "HELLO",
  username: "User1",
  userAvatar: "",
  time: "2003/02/19 18:35:00",
  level: 1,
};

describe("PostCard Test", () => {
  test("PostCard render test", () => {
    render(<PostCard {...Props} />);
    screen.getByText("Good afternoon!");
    screen.getByText("HELLO");
    screen.getByText("User1");
    screen.getByText("2003/02/19 18:35:00");
    screen.getByText("#1");
  });

  // test("PostCard trigger test", async () => {
  //   render(<PostCard {...Props} />);
  //   fireEvent.press(screen.getByTestId("goodButton"));
  //   fireEvent.press(screen.getByTestId("badButton"));
  //   fireEvent.press(screen.getByTestId("commentButton"));

  //   await waitFor(() => {
  //     expect(goodHandlerMock).toBeCalledTimes(1);
  //   });
  //   await waitFor(() => {
  //     expect(badHandlerMock).toBeCalledTimes(1);
  //   });
  //   await waitFor(() => {
  //     expect(commentHandlerMock).toBeCalledTimes(1);
  //   });
  // });
});
