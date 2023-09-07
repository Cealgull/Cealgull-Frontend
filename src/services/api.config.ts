import { AUTH_API, FORUM_API } from "@dot-env";
import APIUri from "./api_uri.json";

const APIConfig: Record<string, string> = {};

for (const [key, value] of Object.entries(APIUri)) {
  let auth_api = AUTH_API;
  let forum_api = FORUM_API;
  if (process.env["NODE_ENV"] === "test") {
    auth_api = process.env["AUTH_API"] as string;
    forum_api = process.env["AUTH_API"] as string;
  }
  if (/^auth\./g.test(key)) {
    APIConfig[key] = `${auth_api}${value}`;
  } else {
    APIConfig[key] = `${forum_api}${value}`;
  }
}

export default APIConfig as Record<keyof typeof APIUri, string>;
