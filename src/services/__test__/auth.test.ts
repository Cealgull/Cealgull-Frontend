/**
 * @author Bojun Ren
 * @data 2023/08/23
 */
import { Response, Server } from "miragejs";
import * as ajax from "../ajax";
import { queryEmail, verifyEmail } from "../auth";
import { startAuthServer } from "./mirage";
import APIConfig from "../api.config";

describe("Test authentication service", () => {
  const requestSpy = jest.spyOn(ajax, "request");

  let server: Server;
  beforeEach(() => {
    server = startAuthServer();
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  test("Email regex check", async () => {
    expect.assertions(4);

    const successResponse = {
      code: 200,
      message: "ok",
    };
    server.post(APIConfig["auth.email.query"], () => {
      return new Response(200, {}, successResponse);
    });

    // Invalid character
    await expect(queryEmail("123 ")).rejects.toMatch(/invalid/i);
    await expect(verifyEmail("123 ", "000000")).rejects.toMatch(/invalid/i);
    // Valid
    await expect(queryEmail("Einstein")).resolves.toEqual(successResponse);

    expect(requestSpy).toHaveBeenCalledTimes(1);
  });

  test("Short verify code", async () => {
    await expect(verifyEmail("abc", "000")).rejects.toMatch(/length/i);
    await expect(verifyEmail("Einstein", "123456")).resolves.toBeUndefined();

    expect(requestSpy).toBeCalledTimes(1);
  });

  test("Response error", async () => {
    expect.assertions(2);

    const failResponse = {
      code: 500,
      message: "wrong",
    };
    server.post(APIConfig["auth.email.query"], () => {
      return new Response(500, {}, failResponse);
    });

    await expect(queryEmail("Einstein")).rejects.toMatch(failResponse.message);

    expect(requestSpy).toBeCalledTimes(1);
  });
});
