import { request } from "./ajax";
import APIConfig from "./api.config";

function isValidAccountString(account: string) {
  const emailReg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))$/;
  return account.match(emailReg) !== null;
}

export async function queryEmail(account: string) {
  if (!isValidAccountString(account)) {
    throw "Invalid account string!";
  }
  const res = await request({
    method: "POST",
    url: APIConfig["auth.email.query"],
    body: {
      account,
    },
  });
  const data = (await res.json()) as { code: number; message: string };
  if (!res.ok) {
    throw data.message;
  }
  return data;
}

export async function verifyEmail(account: string, verifyCode: string) {
  if (!isValidAccountString(account)) {
    throw "Invalid account string!";
  }
  if (verifyCode.length !== 6) {
    throw "Verify code must have length 6!";
  }
  // TODO
  await request({
    method: "POST",
    url: APIConfig["auth.email.query"],
    body: {
      account,
      code: verifyCode,
    },
  });
}
