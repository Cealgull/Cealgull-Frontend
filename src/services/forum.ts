/**
 * @brief Define the basic forum service
 *
 */

import APIConfig from "./api.config";
import { requestWithCookie, request } from "./ajax";
export interface createPostProps {
  content: string;
  images: string[];
  replyTo: string;
  belongTo: string;
}

export async function createPost(createProps: createPostProps): Promise<void> {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.post.create"],
    body: createProps,
  });
  if (!response.ok) {
    throw "createPost error!";
  }
}

export interface createTopicProps {
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
    url: APIConfig["forum.topic.create"],
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

export interface getAllPostsByBelongProps {
  belongTo: string;
  creator: string;
  pageSize: number;
  pagenum: number;
}

export async function getAllPostsByBelong(
  getPostProps: getAllPostsByBelongProps
): Promise<ForumTopic[]> {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.post.list"],
    body: getPostProps,
  });
  if (!response.ok) {
    throw "getAllPosts error!";
  }
  const data = (await response.json()) as ForumTopic[];
  return data;
}

export interface getAllTopicsProps {
  pageSize: number;
  pageNum: number;
  category: string;
  tags: string;
  creator: string;
  sortedBy: string;
}

export async function getAllTopics(
  getTopicsProps: getAllTopicsProps
): Promise<ForumTopic[]> {
  const request = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.topic.list"],
    body: getTopicsProps,
  });
  if (!request.ok) {
    throw "getAllTopics error!";
  }
  const data = (await request.json()) as ForumTopic[];
  return data;
}

export async function getUserInfo(wallet: string): Promise<UserInfo> {
  const response = await request({
    method: "GET",
    url: `${APIConfig["user.profile"]}?wallet=${wallet}`,
  });
  if (!response.ok) {
    throw "getUserInfo error!";
  }
  const data = (await response.json()) as UserInfo;
  return data;
}
