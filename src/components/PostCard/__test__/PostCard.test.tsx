import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import PostCard from "../PostCard";
import * as componentTestData from "../../../../__test__/response/componentTestData.json";

describe("PostCard Test", () => {
  test("PostCard render test", () => {
    render(
      <PostCard postInfo={componentTestData["PostCard.test"]} level={1} />
    );
    screen.getByText("This is the content of the post.");
    screen.getByText("john_doe");
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
