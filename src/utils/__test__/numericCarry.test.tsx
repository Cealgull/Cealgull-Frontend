import { numericCarry } from "../forumUtils";

describe("numericCarry Test", () => {
  test("0--999", () => {
    expect(numericCarry(10)).toMatch("10");
    expect(numericCarry(120)).toMatch("120");
    expect(numericCarry(999)).toMatch("999");
  });
  test("1000--99000", () => {
    expect(numericCarry(1000)).toMatch("1k");
    expect(numericCarry(1200)).toMatch("1.2k");
    expect(numericCarry(34500)).toMatch("34.5k");
    expect(numericCarry(99000)).toMatch("99k");
  });
  test(">99000", () => {
    expect(numericCarry(99001)).toMatch("99k+");
    expect(numericCarry(12123100)).toMatch("99k+");
  });
});
