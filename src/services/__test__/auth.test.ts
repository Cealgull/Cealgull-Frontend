import { request } from "../ajax";
import { queryEmail, verifyEmail } from "../auth";

jest.mock("../ajax", () => ({
  _esModule: true,
  request: jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ code: 200, message: "success" }),
    })
  ),
}));

describe("Test authentication service", () => {
  afterEach(jest.clearAllMocks);

  test("Email regex check", async () => {
    expect(queryEmail("123 ")).rejects.toMatch(/invalid/i);
    await queryEmail("Einstein");
    expect(verifyEmail("123 ", "000000")).rejects.toMatch(/invalid/i);

    expect(request).toHaveBeenCalledTimes(1);
  });

  test("Short verify code", async () => {
    expect(verifyEmail("abc", "000")).rejects.toMatch(/length/i);
    expect(request).toBeCalledTimes(0);
  });
});
