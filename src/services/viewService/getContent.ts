import APIConfig from "../api.config";
import { request } from "../ajax";

export async function getContents(cid: string) {
  const sourceId = cid;
  const response = await request({
    method: "GET",
    url: `${APIConfig.getIpfsSourece}/${sourceId}`,
  });
  if (!response.ok) {
    throw "getContents error!";
  }
  const data = await response.text();
  return data;
}
