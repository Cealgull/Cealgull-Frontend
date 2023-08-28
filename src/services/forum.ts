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

export async function createPost(
  content: string,
  images: string[],
  replyTo: string,
  belongTo: string
): Promise<void> {
  const requestBody: createPostProps = {
    content: content,
    images: images,
    replyTo: replyTo,
    belongTo: belongTo,
  };
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.post.create"],
    body: requestBody,
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
  content: string,
  images: string[],
  title: string,
  category: string,
  tags: string[]
): Promise<void> {
  const requestBody: createTopicProps = {
    content: content,
    images: images,
    title: title,
    category: category,
    tags: tags,
  };
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.topic.create"],
    body: requestBody,
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

interface getAllPostsByBelongProps {
  belongTo: string;
  creator: string;
  pageSize: number;
  pagenum: number;
}

export async function getAllPostsByBelong(
  belongTo: string,
  creator: string,
  pageSize: number,
  pagenum: number
): Promise<ForumTopic[]> {
  const requestBody: getAllPostsByBelongProps = {
    belongTo: belongTo,
    creator: creator,
    pageSize: pageSize,
    pagenum: pagenum,
  };
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.post.list"],
    body: requestBody,
  });
  if (!response.ok) {
    throw "getAllPosts error!";
  }
  const data = (await response.json()) as ForumTopic[];
  return data;
}

interface getAllTopicsProps {
  pageSize: number;
  pageNum: number;
  category: string;
  tags: string;
  creator: string;
  sortedBy: string;
}

export async function getAllTopics(
  pageSize: number,
  pageNum: number,
  category: string,
  tags: string,
  creator: string,
  sortedBy: string
): Promise<ForumTopic[]> {
  const requestBody: getAllTopicsProps = {
    pageSize: pageSize,
    pageNum: pageNum,
    category: category,
    tags: tags,
    creator: creator,
    sortedBy: sortedBy,
  };
  const request = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.topic.list"],
    body: requestBody,
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
