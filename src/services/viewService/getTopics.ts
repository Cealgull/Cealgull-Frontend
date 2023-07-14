import { returnTopicProps } from "@src/@types/returnProps";
import { requestWithCookie } from "../ajax";
import APIConfig from "../api.config";

export async function getAllTopics() {
  const request = await requestWithCookie({
    method: "GET",
    url: APIConfig.getAllTopics,
  });
  if (!request.ok) {
    throw "getAllTopics error!";
  }
  const data = (await request.json()) as returnTopicProps[];
  return data;
}

export function getSeveralTopics(pageSize: number, pageNum: number) {
  return null;
}
