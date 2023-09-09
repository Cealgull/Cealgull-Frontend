import { fireEvent, render, screen } from "@testing-library/react-native";
import PostCard from "../PostCard";
import { View } from "react-native";
import { useState } from "react";
import { ReplyToInfo } from "@src/views/TopicView";
import { Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";
import APIConfig from "@src/services/api.config";
import { Response } from "miragejs";

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
  createAt: "Test",
  updateAt: "Test",
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
    createAt: "Test",
    updateAt: "Test",
    assets: [],
  },
  upvotes: [],
  downvotes: [],
  createAt: "Test1",
  updateAt: "Test2",
  assets: [
    {
      creator: "",
      contentType: "image",
      createdAt: "",
      updatedAt: "",
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

describe("PostCard error test", () => {
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });
  test("error test", () => {
    server.post(APIConfig["forum.post.upvote"], () => {
      throw "error";
    });
    server.post(APIConfig["forum.post.downvote"], () => {
      throw "error";
    });
    render(<PostCardWrapper postInfo={PostCardTestData2} />);
    const goodButton = screen.getByTestId("goodButton");
    const badButton = screen.getByTestId("badButton");
    fireEvent.press(goodButton);
    fireEvent.press(badButton);
    server.shutdown();
  });
});
