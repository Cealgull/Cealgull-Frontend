/**
 * @brief Define the basic forum service
 *
 */

import APIConfig from "./api.config";
import { requestWithCookie, request } from "./ajax";

interface createPostProps {
  content: string;
  images: string[];
  replyTo: string;
  belongTo: string;
}

export async function createPost(createProps: createPostProps): Promise<void> {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig.createPost,
    body: createProps,
  });
  if (!response.ok) {
    throw "createPost error!";
  }
}

interface createTopicProps {
  content: string;
  images: string[];
  title: string;
  category: string;
  tags: string[];
}

export async function createTopic(
  createProps: createTopicProps
): Promise<void> {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig.createTopic,
    body: createProps,
  });
  if (!response.ok) {
    throw "createTopic error!";
  }
}

export async function getTextIpfs(cid: string): Promise<string> {
  const textSourceId = cid;
  const response = await request({
    method: "GET",
    url: `${APIConfig.getIpfsSource}/${textSourceId}`,
  });
  if (!response.ok) {
    throw "getContents error!";
  }
  const data = await response.text();
  return data;
}

export async function getAllPostsByBelong(
  belong: string
): Promise<ForumTopic[]> {
  const response = await requestWithCookie({
    method: "GET",
    url: `${APIConfig.queryPostsByBelongTo}?belongTo=${belong}`,
  });
  if (!response.ok) {
    throw "getAllPosts error!";
  }
  const data = (await response.json()) as ForumTopic[];
  return data;
}

export async function getAllTopics(): Promise<ForumTopic[]> {
  const request = await requestWithCookie({
    method: "GET",
    url: APIConfig.getAllTopics,
  });
  if (!request.ok) {
    throw "getAllTopics error!";
  }
  const data = (await request.json()) as ForumTopic[];
  return data;
}

export async function getUserInfo(uid: string): Promise<UserInfo> {
  const response = await request({
    method: "GET",
    url: `${APIConfig["user.info"]}?userId=${uid}`,
  });
  if (!response.ok) {
    throw "getUserInfo error!";
  }
  const data = (await response.json()) as UserInfo;
  return data;
}
