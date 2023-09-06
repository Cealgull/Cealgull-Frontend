import { AUTH_API, FORUM_API } from "@dot-env";
import APIUri from "./api_uri.json";

const APIConfig: Record<string, string> = {};

function findAPI(): [string, string] {
  if (process.env["NODE_ENV"] === "test") {
    // Only works when:
    //    1. the file .env doesn't exist
    //    2. (if needed) run jest with `--no-cache`
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("dotenv").config();
    return [
      process.env["AUTH_API"] as string,
      process.env["FORUM_API"] as string,
    ];
  }
  return [AUTH_API, FORUM_API];
}

const [auth_api, forum_api] = findAPI();

for (const [key, value] of Object.entries(APIUri)) {
  if (/^auth\./g.test(key)) {
    APIConfig[key] = `${auth_api}${value}`;
  } else {
    APIConfig[key] = `${forum_api}${value}`;
  }
}

export default APIConfig as Record<keyof typeof APIUri, string>;
