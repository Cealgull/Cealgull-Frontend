import { AUTH_API, FORUM_API } from "@dot-env";
import APIUri from "./api_uri.json";

const APIConfig: Record<string, string> = {};

for (const [key, value] of Object.entries(APIUri)) {
  if (/^auth\./g.test(key)) {
    APIConfig[key] = `${AUTH_API}${value}`;
  } else {
    APIConfig[key] = `${FORUM_API}${value}`;
  }
}

export default APIConfig as Record<keyof typeof APIUri, string>;
