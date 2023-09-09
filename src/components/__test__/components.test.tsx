import { fireEvent, render, screen } from "@testing-library/react-native";
import { OptionItem } from "../OptionItem";
import { Icon } from "@rneui/base";
import { PersonCard } from "../PersonCard";
import { UserInfoPOJO } from "@src/models/User";
import { useRef } from "react";
import { TextInput } from "react-native";
import { PostEditor } from "../PostEditor";
import { ReplyCard } from "../ReplyCard";

describe("OptionItem test", () => {
  test("OptionItem true test", () => {
    render(
      <OptionItem
        title="Test"
        icon={<Icon type="antdesign" name="left" />}
        titleColor="red"
        isCenter={true}
      />
    );
    screen.getByText("Test");
  });
  test("OptionItem false test", () => {
    render(
      <OptionItem
        title="Test"
        icon={<Icon type="antdesign" name="left" />}
        titleColor="red"
        isCenter={false}
      />
    );
    screen.getByText("Test");
  });
});

const userInfo: UserInfoPOJO = {
  username: "Test",
  wallet: "Test",
  avatar: "Test",
  signature: "Test",
  muted: false,
  banned: false,
  balance: 1,
  credibility: 1,
  privilege: 1,
  activeRole: "Test",
  rolesAssigned: [],
  activeBadge: {
    name: "Test",
    cid: "Test",
  },
  badgesReceived: [],
  createdAt: new Date(),
  updateAt: new Date(),
};

describe("PersonCard test", () => {
  test("not loading", () => {
    render(<PersonCard userInfo={userInfo} isLoading={false} />);
    screen.queryAllByText("Test");
  });
  test("is loading", () => {
    render(<PersonCard userInfo={userInfo} isLoading={true} />);
    screen.getByText("加载中……");
  });
});

const PostEditorTestWrapper = () => {
  const inputRef = useRef<TextInput>(null);
  const publish = (content: string) => ({});
  return <PostEditor inputRef={inputRef} replyTo="Test" publish={publish} />;
};

describe("Person Editor test", () => {
  test("test focus and blur", () => {
    render(<PostEditorTestWrapper />);
    const input = screen.getByTestId("postEditorInput");
    fireEvent.changeText(input, "Test");
    fireEvent(input, "onFocus");
    fireEvent(input, "onBlur");
    const publishButton = screen.getByTestId("publishButton");
    fireEvent.changeText(input, "Test");
    fireEvent.press(publishButton);
  });
});

const ReplyCardTestData: ForumPost = {
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

describe("ReplyCard test", () => {
  test("display test", () => {
    render(<ReplyCard isDisplay={true} replyInfo={ReplyCardTestData} />);
    screen.getAllByText("Test");
  });
  test("not display test", () => {
    render(<ReplyCard isDisplay={false} replyInfo={ReplyCardTestData} />);
  });
});
