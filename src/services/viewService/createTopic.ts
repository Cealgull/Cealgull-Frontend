import APIConfig from "../api.config";
import { createTopicProps } from "@src/@types/returnProps";
import { requestWithCookie } from "../ajax";

export async function createTopic(createProps: createTopicProps) {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig.createTopic,
    body: createProps,
  });
  if (!response.ok) {
    throw "createTopic error!";
  }
}
