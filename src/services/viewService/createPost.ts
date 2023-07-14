import APIConfig from "../api.config";
import { requestWithCookie } from "../ajax";
import { createPostProps } from "@src/@types/returnProps";

export async function createPost(createProps: createPostProps) {
  const response = await requestWithCookie({
    method: "POST",
    url: APIConfig.createPost,
    body: createProps,
  });
  if (!response.ok) {
    throw "createPost error!";
  }
}
