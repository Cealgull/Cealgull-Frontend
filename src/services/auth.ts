// TODO error handler
import { signAndEncode } from "@src/utils/bip/tools";
import { request } from "./ajax";
import APIConfig from "./api.config";

function ValidateAccount(account: string) {
  const accountValidateReg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))$/;
  return account.match(accountValidateReg) !== null;
}

/**
 * Query an email verify code.
 * @param account Jaccount (no suffix)
 * @throws "Invalid account string"
 */
export async function queryEmail(account: string) {
  if (!ValidateAccount(account)) {
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
  if (!ValidateAccount(account)) {
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

/**
 *
 * @param signature received by email verifying, no need to care the format
 * @param publicKey hex
 * @returns the cert
 */
export async function queryCert(publicKey: string, signature = "HACK") {
  const res = await request({
    url: APIConfig["auth.cert.query"],
    method: "POST",
    headers: {
      signature,
    },
    body: { pub: Buffer.from(publicKey, "hex").toString("base64") },
  });
  try {
    const data = (await res.json()) as { cert: string };
    return data.cert;
  } catch (e) {
    throw "Failed to query cert!";
  }
}

async function _login(cert: string, signature: string): Promise<UserInfo> {
  const res = await request({
    url: APIConfig["user.login"],
    // url: "https://request.worktile.com/2yStizLPV",
    method: "POST",
    headers: {
      signature: signature,
    },
    body: {
      cert,
    },
  });
  const data = (await res.json()) as UserInfo;
  return data;
}

/**
 * Login with the private key and the cert.
 * This workflow indicates the common case. After adding the user, its
 * private key and cert are stored locally.
 * @param privateKey hex
 * @param cert raw string
 */
export async function login(
  privateKey: string,
  cert: string
): Promise<UserInfo> {
  const sig = signAndEncode(cert, privateKey);
  return await _login(cert, sig);
}
