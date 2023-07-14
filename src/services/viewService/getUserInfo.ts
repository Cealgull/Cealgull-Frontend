import APIConfig from "../api.config";
import { request } from "../ajax";
import { returnUserProps } from "@src/@types/returnProps";

export async function getUserInfo(uid: string) {
  const response = await request({
    method: "GET",
    url: APIConfig["user.info"] + "?userId=" + uid,
  });
  if (!response.ok) {
    throw "getUserInfo error!";
  }
  const data = (await response.json()) as returnUserProps;
  return data;
}
