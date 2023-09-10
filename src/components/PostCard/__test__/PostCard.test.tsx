import { fireEvent, render, screen } from "@testing-library/react-native";
import PostCard from "../PostCard";
import { View } from "react-native";
import { useState } from "react";
import { ReplyToInfo } from "@src/views/TopicView";
import { Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";

const PostCardTestData1: ForumPost = {
  hash: "Test",
  creator: {
    username: "Test",
    wallet: "Test",
    avatar: "Test",
    badge: "Test",
    role: "Test",
  },
  content: "Test",
  belongTo: "Test",
  replyTo: null,
  upvotes: [],
  downvotes: [],
  createAt: "2023-08-20T08:15:30Z",
  updateAt: "2023-08-20T08:15:30Z",
  assets: [],
};

const PostCardTestData2: ForumPost = {
  hash: "Test",
  creator: {
    username: "Test",
    wallet: "Test",
    avatar: "Test",
    badge: "Test",
    role: "Test",
  },
  content: "Test",
  belongTo: "Test",
  replyTo: {
    hash: "Test",
    creator: {
      username: "Test",
      wallet: "Test",
      avatar: "Test",
      badge: "Test",
      role: "Test",
    },
    content: "Test",
    belongTo: "Test",
    replyTo: null,
    upvotes: [],
    downvotes: [],
    createAt: "2023-08-20T08:15:30Z",
    updateAt: "2023-08-20T08:15:30Z",
    assets: [],
  },
  upvotes: [],
  downvotes: [],
  createAt: "2023-08-20T08:15:30Z",
  updateAt: "2022-08-20T08:15:31Z",
  assets: [
    {
      creator: "",
      contentType: "image",
      createdAt: "2023-08-20T08:15:30Z",
      updatedAt: "2023-08-20T08:15:30Z",
      cid: "",
    },
  ],
};

const PostCardWrapper = (props: { postInfo: ForumPost }) => {
  const [reply, setReply] = useState<ReplyToInfo>({
    ReplyUser: "",
    Replyhash: "",
  });
  return (
    <View>
      <PostCard
        postInfo={props.postInfo}
        setReplyInfo={setReply}
        level={1}
        loginWallet="Test"
      />
    </View>
  );
};

describe("PostCard Test", () => {
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });
  test("PostCard render test", () => {
    render(<PostCardWrapper postInfo={PostCardTestData1} />);
    screen.getAllByText("Test");
  });

  test("PostCard press test 1", () => {
    render(<PostCardWrapper postInfo={PostCardTestData2} />);
    const replyButton = screen.getByTestId("replyButton");
    fireEvent.press(replyButton);
  });
  test("PostCard press test 2", () => {
    render(<PostCardWrapper postInfo={PostCardTestData2} />);
    const goodButton = screen.getByTestId("goodButton");
    const badButton = screen.getByTestId("badButton");
    const commentButton = screen.getByTestId("commentButton");
    fireEvent.press(commentButton);
    fireEvent.press(goodButton);
    fireEvent.press(goodButton);
    fireEvent.press(badButton);
    fireEvent.press(badButton);
    fireEvent.press(badButton);
    fireEvent.press(goodButton);
    fireEvent.press(badButton);
  });
});
