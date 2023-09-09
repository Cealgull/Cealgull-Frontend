import { render, screen } from "@testing-library/react-native";
import { OptionItem } from "../OptionItem";
import { Icon } from "@rneui/base";
import { PersonCard } from "../PersonCard";
import { UserInfoPOJO } from "@src/models/User";
import { create } from "react-test-renderer";

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

describe("Person Editor test", () => {
  // test("test",()=>{
  // })
});
