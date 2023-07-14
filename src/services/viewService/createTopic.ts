import APIConfig from "../api.config";
import { requestWithCookie } from "../ajax";

interface createTopicProps {
  content: string;
  images: string[];
  title: string;
  category: string;
  tags?: string[];
}

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
