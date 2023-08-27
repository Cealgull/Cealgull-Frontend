/**
 * @author Haocheng Wang
 * @data 2023/08/24
 */
import { Response, Server } from "miragejs";
import * as ajax from "../ajax";
import APIConfig from "../api.config";
import { startForumServer } from "./mirage";
import {
  createPost,
  createTopic,
  getAllPostsByBelong,
  getAllTopics,
  getTextIpfs,
  getUserInfo,
} from "../forum";
import {
  getAllTopicsProps,
  getAllPostsByBelongProps,
  createPostProps,
  createTopicProps,
} from "../forum";
import * as forumTestData from "./forumTestData.json";
import { exp } from "react-native-reanimated";

describe("Test forum service", () => {
  const requestSpy = jest.spyOn(ajax, "request");
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });
  const topicListArgu: getAllTopicsProps = {
    pageSize: 10,
    pageNum: 1,
    category: "Test",
    tags: "Test",
    creator: "Tester",
    sortedBy: "Test",
  };
  const postListArgu: getAllPostsByBelongProps = {
    belongTo: "Test",
    creator: "Test",
    pageSize: 10,
    pagenum: 1,
  };
  const topicCreateArgu: createTopicProps = {
    content: "Test",
    images: [],
    title: "Test",
    category: "Test",
    tags: [],
  };
  const postCreateArgu: createPostProps = {
    content: "Test",
    images: [],
    replyTo: "Test",
    belongTo: "Test",
  };

  test("forum.topic.list Test", async () => {
    await expect(getAllTopics(topicListArgu)).resolves.toEqual(
      forumTestData["forum.topic.list"]
    );
  });

  test("forum.post.list Test", async () => {
    await expect(getAllPostsByBelong(postListArgu)).resolves.toEqual(
      forumTestData["forum.post.list"]
    );
  });

  test("user.profile Test", async () => {
    await expect(getUserInfo("Test")).resolves.toEqual(
      forumTestData["user.profile"]
    );
  });

  test("getIpfsText Test", async () => {
    await expect(getTextIpfs("Test")).resolves.toEqual(
      forumTestData["getIpfsText"]
    );
  });

  test("forum.topic.create Test", async () => {
    await expect(createTopic(topicCreateArgu));
  });

  test("forum.post.create Test", async () => {
    await expect(createPost(postCreateArgu));
  });

  test("Response error", async () => {
    server.get(APIConfig["user.profile"], () => {
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
    await expect(getAllTopics(topicListArgu)).rejects.toEqual(
      "getAllTopics error!"
    );
    await expect(createPost(postCreateArgu)).rejects.toEqual(
      "createPost error!"
    );
    await expect(createTopic(topicCreateArgu)).rejects.toEqual(
      "createTopic error!"
    );
    await expect(getTextIpfs("Text")).rejects.toEqual("getContents error!");
    await expect(getAllPostsByBelong(postListArgu)).rejects.toEqual(
      "getAllPosts error!"
    );
    await expect(getUserInfo("Text")).rejects.toEqual("getUserInfo error!");
  });
});
