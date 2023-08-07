import APIConfig from "../api.config";
import { requestWithCookie } from "../ajax";

interface createPostProps {
  content: string;
  images: string[];
  replyTo: string;
  belongTo: string;
}

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
