import "dotenv/config";
import APIUri from "./api_uri.json";

const APIConfig: Record<string, string> = {};

for (const [key, value] of Object.entries(APIUri)) {
  const AUTH_API = process.env["AUTH_API"];
  const FORUM_API = process.env["FORUM_API"];

  if (/^auth\./g.test(key)) {
    APIConfig[key] = `${AUTH_API}${value}`;
  } else {
    APIConfig[key] = `${FORUM_API}${value}`;
  }
}

export default APIConfig as Record<keyof typeof APIUri, string>;
