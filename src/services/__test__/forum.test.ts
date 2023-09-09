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
  forumVote,
  getAllCategories,
  getAllPostsByBelong,
  getAllTags,
  getAllTopics,
  getImageIpfsPath,
  getTextIpfs,
  getUserInfo,
  getUserStatistics,
  modifyUserInfo,
  uploadAvatarWithBase64,
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

  test("forum.user.statistics", async () => {
    await expect(getUserStatistics("Test"));
  });
  test("user.profile.modify", async () => {
    await expect(modifyUserInfo({}));
  });
  test("upload.avatar", async () => {
    await expect(uploadAvatarWithBase64(""));
  });
  test("vote", async () => {
    await expect(forumVote("", "up", "Post"));
    await expect(forumVote("", "up", "Topic"));
    await expect(forumVote("", "down", "Post"));
    await expect(forumVote("", "down", "Topic"));
  });
  test("get.image", () => {
    getImageIpfsPath("");
  });
  test("forum.topic.categories", async () => {
    await expect(getAllCategories());
  });
  test("forum.topic.tags", async () => {
    await expect(getAllTags());
  });

  test("Response error", async () => {
    server.post(APIConfig["user.profile.modify"], () => new Response(500));
    server.post(APIConfig["user.login"], () => new Response(500));
    server.post(APIConfig["user.profile"], () => new Response(500));

    server.post(APIConfig["forum.topic.list"], () => new Response(500));
    server.post(APIConfig["forum.post.list"], () => new Response(500));
    server.post(APIConfig["forum.topic.create"], () => new Response(500));
    server.post(APIConfig["forum.post.create"], () => new Response(500));
    server.post(APIConfig["forum.user.statistics"], () => new Response(500));
    server.post(APIConfig["forum.post.upvote"], () => new Response(500));
    server.post(APIConfig["forum.post.downvote"], () => new Response(500));
    server.get(`${APIConfig["getIpfsSource"]}/*path`, () => new Response(500));
    server.post(APIConfig["upload.avatar"], () => new Response(500));
    server.post(APIConfig["forum.topic.create"], () => new Response(500));
    server.post(APIConfig["forum.post.create"], () => new Response(500));
    server.get(APIConfig["forum.user.statistics"], () => new Response(500));
    server.get(APIConfig["forum.topic.categories"], () => new Response(500));
    server.get(APIConfig["forum.topic.tags"], () => new Response(500));

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
    await expect(modifyUserInfo({})).rejects.toEqual("modifyUserInfo error!");
    await expect(uploadAvatarWithBase64("")).rejects.toEqual(
      "uploadAvatarWithBase64 error!"
    );
    await expect(forumVote("", "down", "Post")).rejects.toEqual(
      "forumVote error!"
    );
    await expect(getAllCategories()).rejects.toEqual("getAllCategories error!");
    await expect(getAllTags()).rejects.toEqual("getAllTags error!");
  });
});
