import APIConfig from "../api.config";
import { request } from "../ajax";

export async function getTextIpfs(cid: string) {
  const textSourceId = cid;
  const response = await request({
    method: "GET",
    url: `${APIConfig.getIpfsSourece}/${textSourceId}`,
  });
  if (!response.ok) {
    throw "getContents error!";
  }
  const data = await response.text();
  return data;
}
