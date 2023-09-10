import { fireEvent, render, screen } from "@testing-library/react-native";
import TopicCard from "../TopicCard";
import { View } from "react-native";
import { useState } from "react";
import { ReplyToInfo } from "@src/views/TopicView";
import { Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";
import Toast from "react-native-toast-message";

const mockPush = jest.fn();
const mockPop = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      push: mockPush,
      pop: mockPop,
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

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

const topicTestData1: ForumTopic = {
  id: 123,
  hash: "Test",
  title: "Test",
  creator: {
    username: "Test",
    wallet: "Test",
    avatar: "Test",
    badge: "Test",
    role: "Test",
  },
  avatar: "Test",
  content: "Test",
  categoryAssigned: { name: "Test", color: "Test" },
  tagsAssigned: [{ name: "Test" }],
  upvotes: [],
  downvotes: [],
  closed: false,
  assets: [
    {
      creator: "",
      contentType: "image",
      createdAt: "2023-08-20T08:15:30Z",
      updatedAt: "2023-08-20T08:15:30Z",
      cid: "",
    },
  ],
  createdAt: "2023-08-20T08:15:30Z",
  updatedAt: "2023-08-20T08:15:30Z",
};

const topicTestData2: ForumTopic = {
  id: 123,
  hash: "Test",
  title: "Test",
  creator: {
    username: "Test",
    wallet: "Test",
    avatar: "Test",
    badge: "Test",
    role: "Test",
  },
  avatar: "Test",
  content: "Test",
  categoryAssigned: { name: "Test", color: "Test" },
  tagsAssigned: [{ name: "Test" }],
  upvotes: [],
  downvotes: [],
  closed: false,
  assets: [
    {
      creator: "",
      contentType: "image",
      createdAt: "2023-08-20T08:15:30Z",
      updatedAt: "2023-08-20T08:15:30Z",
      cid: "",
    },
  ],
  createdAt: "2022-08-20T08:15:30Z",
  updatedAt: "2023-08-20T08:15:30Z",
};

const TopicCardTestWrapper = (props: {
  canjump: boolean;
  topicInfo: ForumTopic;
  loginWallet?: string;
}) => {
  const [reply, setReply] = useState<ReplyToInfo>({
    ReplyUser: "",
    Replyhash: "",
  });
  return (
    <View>
      <TopicCard
        topicInfo={props.topicInfo}
        canjump={props.canjump}
        loginWallet={props.loginWallet ? props.loginWallet : ""}
        setReplyInfo={setReply}
      ></TopicCard>
    </View>
  );
};

describe("TopicCard Test", () => {
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });
  test("TopicCard render test", () => {
    render(<TopicCard canjump={true} topicInfo={topicTestData1} />);
    render(<TopicCardTestWrapper topicInfo={topicTestData1} canjump={true} />);
    render(<TopicCardTestWrapper topicInfo={topicTestData2} canjump={true} />);
    screen.getAllByText("Test");
  });

  test("TopicCard navigate test can jump", () => {
    render(<TopicCardTestWrapper topicInfo={topicTestData1} canjump={true} />);
    const likeButton = screen.getByTestId("likeButton");
    const dislikeButton = screen.getByTestId("dislikeButton");
    const commentButton = screen.getByTestId("commentButton");
    fireEvent.press(likeButton);
    fireEvent.press(dislikeButton);
    fireEvent.press(commentButton);
    fireEvent.press(screen.getByTestId("TopicCardButton"));
    expect(mockPush).toBeCalledTimes(1);
  });

  test("TopicCard trigger test can't jump", () => {
    render(<TopicCardTestWrapper topicInfo={topicTestData1} canjump={false} />);
    const likeButton = screen.getByTestId("likeButton");
    const dislikeButton = screen.getByTestId("dislikeButton");
    const commentButton = screen.getByTestId("commentButton");
    fireEvent.press(likeButton);
    fireEvent.press(dislikeButton);
    fireEvent.press(commentButton);
    fireEvent.press(screen.getByTestId("TopicCardButton"));
  });

  test("TopicCard setReplyInfo empty", () => {
    render(<TopicCard canjump={false} topicInfo={topicTestData1} />);
    const commentButton = screen.getByTestId("commentButton");
    fireEvent.press(commentButton);
  });

  test("TopicCard vote test", () => {
    render(<TopicCardTestWrapper topicInfo={topicTestData1} canjump={false} />);
    const likeButton = screen.getByTestId("likeButton");
    const dislikeButton = screen.getByTestId("dislikeButton");
    fireEvent.press(likeButton);
    fireEvent.press(likeButton);
    fireEvent.press(dislikeButton);
    fireEvent.press(dislikeButton);
    fireEvent.press(dislikeButton);
    fireEvent.press(likeButton);
  });

  test("TopicCard delete test", () => {
    render(
      <TopicCardTestWrapper
        topicInfo={topicTestData2}
        loginWallet="Test"
        canjump={false}
      />
    );
    const deleteButton = screen.getByTestId("TopicDeleteButton");
    fireEvent.press(deleteButton);
  });
});
