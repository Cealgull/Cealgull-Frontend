/**
 * @brief Define the basic forum service
 *
 */

import {
  UserStatistics,
  type UserInfoPOJO,
  jsonToUserInfoPOJO,
  jsonToUserStatistics,
} from "@src/models/User";
import { request, requestWithCookie } from "./ajax";
import APIConfig from "./api.config";

export async function createPost(
  content: string,
  images: string[],
  replyTo: string,
  belongTo: string
): Promise<void> {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.post.create"],
    body: { content, images, replyTo, belongTo },
  });
  if (!response.ok) {
    throw "createPost error!";
  }
}

export async function createTopic(
  content: string,
  images: string[],
  title: string,
  category: string,
  tags: string[]
): Promise<void> {
  interface createTopicProps {
    content: string;
    images: string[];
    title: string;
    category: string;
    tags: string[];
  }
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

export async function getAllPostsByBelong(
  belongTo: string,
  creator: string,
  pageSize: number,
  pagenum: number
): Promise<ForumPost[]> {
  interface getAllPostsByBelongProps {
    belongTo: string;
    creator: string;
    pageSize: number;
    pageOrdinal: number;
  }
  const requestBody: getAllPostsByBelongProps = {
    belongTo: belongTo,
    creator: creator,
    pageSize: pageSize,
    pageOrdinal: pagenum,
  };
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig["forum.post.list"],
    body: requestBody,
  });
  if (!response.ok) {
    throw "getAllPosts error!";
  }
  const data = (await response.json()) as ForumPost[];
  return data;
}

export async function getAllTopics(
  pageSize: number,
  pageNum: number,
  category: string,
  tags: string[],
  creator: string,
  sortedBy: string
): Promise<ForumTopic[]> {
  interface getAllTopicsProps {
    pageSize: number;
    pageOrdinal: number;
    category: string;
    tags: string[];
    creator: string;
    sortedBy: string;
  }
  const requestBody: getAllTopicsProps = {
    pageSize: pageSize,
    pageOrdinal: pageNum,
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

type UserProfileResponse = UserInfoPOJO;

export async function getUserInfo(
  wallet: string
): Promise<UserProfileResponse> {
  const response = await request({
    method: "POST",
    url: APIConfig["user.profile"],
    body: {
      wallet: wallet,
    },
  });
  if (!response.ok) {
    throw "getUserInfo error!";
  }
  const data = jsonToUserInfoPOJO(await response.json());
  return data;
}

type UserStatisticResponse = UserStatistics;
export async function getUserStatistics(
  wallet: string
): Promise<UserStatisticResponse> {
  const response = await request({
    method: "POST",
    url: APIConfig["forum.user.statistics"],
    body: {
      wallet: wallet,
    },
  });
  if (!response.ok) {
    throw "getUserStatistics error!";
  }
  const data = jsonToUserStatistics(await response.json());
  return data;
}

type _UserInfoChangeableProperty =
  | "username"
  | "avatar"
  | "signature"
  | "activeBadge"
  | "activeRole";
export type UserInfoChangeable = Pick<
  UserInfoPOJO,
  _UserInfoChangeableProperty
>;

export async function modifyUserInfo(
  options: Partial<UserInfoChangeable>
): Promise<void> {
  const response = await request({
    method: "POST",
    url: APIConfig["user.profile.modify"],
    body: options,
  });
  if (!response.ok) {
    throw "modifyUserInfo error!";
  }
  return;
}

export async function uploadAvatarWithBase64(
  base64Image: string
): Promise<string> {
  const requestBody = {
    payload: base64Image,
  };
  type responseBody = {
    cid: string;
  };
  const response = await request({
    method: "POST",
    url: APIConfig["upload.avatar"],
    body: requestBody,
  });
  if (!response.ok) {
    throw "uploadAvatarWithBase64 error!";
  }
  const data = (await response.json()) as responseBody;
  return data.cid;
}

export async function forumVote(
  hash: string,
  option: "up" | "down",
  type: "Topic" | "Post"
): Promise<void> {
  const urlList = {
    "Topic.up": APIConfig["forum.topic.upvote"],
    "Topic.down": APIConfig["forum.topic.downvote"],
    "Post.up": APIConfig["forum.post.upvote"],
    "Post.down": APIConfig["forum.post.downvote"],
  };

  const requestUrl: string = urlList[`${type}.${option}`];
  const requestBody = { Hash: hash };
  console.log(requestUrl, requestBody);
  const response = await request({
    method: "POST",
    url: requestUrl,
    body: requestBody,
  });
  if (!response.ok) {
    throw "forumVote error!";
  }
}

export const getImageIpfsPath = (cid: string): string => {
  return `http://123.60.158.219:8000/ipfs/${cid}`;
};

export async function getAllCategories(): Promise<Category[]> {
  const response = await request({
    method: "GET",
    url: APIConfig["forum.topic.categories"],
  });
  if (!response.ok) {
    throw "getAllCategories error!";
  }
  const data = (await response.json()) as Category[];
  return data;
}

export async function getAllTags(): Promise<Tag[]> {
  const response = await request({
    method: "GET",
    url: APIConfig["forum.topic.tags"],
  });
  if (!response.ok) {
    throw "getAllTags error!";
  }
  const data = (await response.json()) as Tag[];
  return data;
}
