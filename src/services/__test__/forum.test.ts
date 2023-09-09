/**
 * @author Haocheng Wang
 * @data 2023/08/24
 */
import { Response, Server } from "miragejs";
import APIConfig from "../api.config";
import { startForumServer } from "./mirage";
import {
  createPost,
  createTopic,
  getAllPostsByBelong,
  getAllTopics,
  getTextIpfs,
  getUserInfo,
  getUserStatistics,
} from "../forum";
import * as forumTestData from "./forumTestData.json";
import { jsonToUserInfoPOJO, jsonToUserStatistics } from "@src/models/User";

describe("Test forum service", () => {
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  test("forum.topic.list Test", async () => {
    await expect(getAllTopics(10, 1, "", [], "", "")).resolves.toEqual(
      forumTestData["forum.topic.list"]
    );
  });

  test("forum.post.list Test", async () => {
    await expect(getAllPostsByBelong("", "", 10, 1)).resolves.toEqual(
      forumTestData["forum.post.list"]
    );
  });

  test("user.profile Test", async () => {
    await expect(getUserInfo("Test")).resolves.toEqual(
      jsonToUserInfoPOJO(forumTestData["user.profile"])
    );
  });
  test("forum.user.statistics", async () => {
    await expect(getUserStatistics("Test")).resolves.toEqual(
      jsonToUserStatistics(forumTestData["forum.user.statistics"])
    );
  });
  test("getIpfsText Test", async () => {
    await expect(getTextIpfs("Test")).resolves.toEqual(
      forumTestData["getIpfsText"]
    );
  });

  test("forum.topic.create Test", async () => {
    await expect(createTopic("", [], "", "", []));
  });

  test("forum.post.create Test", async () => {
    await expect(createPost("", [], "", ""));
  });

  test("Response error", async () => {
    server.post(APIConfig["user.profile"], () => {
      return new Response(500);
    });
    server.post(APIConfig["forum.topic.list"], () => {
      return new Response(500);
    });
    server.post(APIConfig["forum.post.list"], () => {
      return new Response(500);
    });
    server.get(`${APIConfig["getIpfsSource"]}/*path`, () => {
      return new Response(500);
    });
    server.post(APIConfig["forum.topic.create"], () => {
      return new Response(500);
    });
    server.post(APIConfig["forum.post.create"], () => {
      return new Response(500);
    });
    server.post(APIConfig["forum.user.statistics"], () => {
      return new Response(500);
    });
    await expect(getAllTopics(10, 1, "", [], "", "")).rejects.toEqual(
      "getAllTopics error!"
    );
    await expect(createPost("", [], "", "")).rejects.toEqual(
      "createPost error!"
    );
    await expect(createTopic("", [], "", "", [])).rejects.toEqual(
      "createTopic error!"
    );
    await expect(getTextIpfs("Text")).rejects.toEqual("getContents error!");
    await expect(getAllPostsByBelong("", "", 10, 1)).rejects.toEqual(
      "getAllPosts error!"
    );
    await expect(getUserInfo("Text")).rejects.toEqual("getUserInfo error!");
    await expect(getUserStatistics("Text")).rejects.toEqual(
      "getUserStatistics error!"
    );
  });
});
