import * as forumUtils from "../forumUtils";

describe("forumUtils test", () => {
  test("numericCarry test", () => {
    expect(forumUtils.numericCarry(10)).toMatch("10");
    expect(forumUtils.numericCarry(120)).toMatch("120");
    expect(forumUtils.numericCarry(999)).toMatch("999");
    expect(forumUtils.numericCarry(1000)).toMatch("1k");
    expect(forumUtils.numericCarry(1200)).toMatch("1.2k");
    expect(forumUtils.numericCarry(34500)).toMatch("34.5k");
    expect(forumUtils.numericCarry(99000)).toMatch("99k");
    expect(forumUtils.numericCarry(99001)).toMatch("99k+");
    expect(forumUtils.numericCarry(12123100)).toMatch("99k+");
  });
  test("timeTransfer test", () => {
    expect(forumUtils.timeTransfer("2023-08-20T08:15:30Z")).toMatch(
      "2023-08-20 16:15:30"
    );
  });
  test("tagColorSwitcher", () => {
    expect(forumUtils.tagColorSwitcher(undefined)).toBe("grey");
    expect(forumUtils.tagColorSwitcher("ss")).toBe("red");
    expect(forumUtils.tagColorSwitcher("ssss")).toBe("blue");
    expect(forumUtils.tagColorSwitcher("ssssss")).toBe("#32CD32");
    expect(forumUtils.tagColorSwitcher("ssssssss")).toBe("orange");
    expect(forumUtils.tagColorSwitcher("ssssssssss")).toBe("pink");
    expect(forumUtils.tagColorSwitcher("ssssssssssss")).toBe("#9370DB");
    expect(forumUtils.tagColorSwitcher("sssssssssssssssss")).toBe("grey");
  });
  test("isInVoteList", () => {
    expect(forumUtils.isInVoteList([], "")).toBe(false);
    expect(forumUtils.isInVoteList(["test"], "test")).toBe(true);
  });
  test("voteColorSelector", () => {
    expect(forumUtils.upvoteColorSelector(true)).toBe("#76EE00");
    expect(forumUtils.upvoteColorSelector(false)).toBe("#8B8989");
    expect(forumUtils.downvoteColorSelector(true)).toBe("#FF4500");
    expect(forumUtils.downvoteColorSelector(false)).toBe("#8B8989");
  });
});
