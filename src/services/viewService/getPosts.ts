import APIConfig from "../api.config";
import { requestWithCookie } from "../ajax";

export async function getAllPostsByBelong(belong: string) {
  const params = "?belongTo=" + belong;
  const urlWithParams = APIConfig.queryPostsByBelongTo + params;
  const response = await requestWithCookie({
    method: "GET",
    url: urlWithParams,
  });
  if (!response.ok) {
    throw "getAllPosts error!";
  }
  const data = (await response.json()) as ForumTopic[];
  return data;
}

export function getSeveralPostsByBelong(
  belong: string,
  pageNum: number,
  pageSize: number
) {
  return null;
}
