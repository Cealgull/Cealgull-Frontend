/**
 * @summary Definition of the User class.
 * @author Bojun Ren
 * @data 2023/08/28
 */

import { type Badge } from "./Badge";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageName } from "./config";
import { queryCert, restoreCert } from "@src/services/auth";
import {
  fixMnemonics,
  handleMnemonics,
  isValidMnemonics,
} from "@src/utils/bip";

/**
 * The canonical response POJO of the user information.
 * @alias LoginResponse
 * @alias UserProfileResponse
 */
export interface UserInfoPOJO {
  username: string;
  wallet: string;
  avatar: string;
  signature: string;
  muted: boolean;
  banned: boolean;
  balance: number;
  credibility: number;
  privilege: number;
  activeRole: string;
  rolesAssigned: string[];
  activeBadge: Badge;
  badgesReceived: Badge[];
  createdAt: Date;
  updateAt: Date;
}

/**
 * Convert a json object to the UserInfoPOJO
 * @param json The json object
 * @returns UserInfoPOJO
 */
export function jsonToUserInfoPOJO(
  json: Record<string, unknown>
): UserInfoPOJO {
  const res = {} as UserInfoPOJO;
  Object.assign(res, json);
  res.createdAt = new Date(json.createdAt as string);
  res.updateAt = new Date(json.updatedAt as string);
  return res;
}

type _UserInfo = UserInfoPOJO | null;
export class User {
  /** Locally stored information */
  /** Negative user_id indicates the entity isn't persisted. */
  private user_id = -1;
  private readonly privateKey: string;
  private readonly cert: string;

  /** Ephemeral data obtained from the backend */
  private _profile: Readonly<_UserInfo> = null;

  public constructor(privateKey: string, cert: string);
  public constructor(privateKey: string, cert: string, profile: _UserInfo);

  public constructor(
    privateKey: string,
    cert: string,
    profile: _UserInfo = null
  ) {
    this.privateKey = privateKey;
    this.cert = cert;
    this._profile = profile;
  }

  /**
   * This getter should only be used inside the forum (after login).
   *
   * The user instance obtained from `UserContext` is supposed to have non-null profile.
   */
  public get profile(): NonNullable<_UserInfo> {
    if (this._profile === null) {
      throw "Critical Error: No profile persisted locally!";
    }
    return this._profile;
  }

  public hasProfile(): boolean {
    return this._profile !== null;
  }

  /**
   * Get the number of users stored locally.
   */
  public static async getUserCount(): Promise<number> {
    const userCount = parseInt(
      (await AsyncStorage.getItem(storageName.userCount)) as string
    );
    return userCount;
  }

  /**
   * Persist the current user entity.
   * The `privateKey` and `cert` properties must be defined.
   */
  public async persist(): Promise<void> {
    const userCount = await User.getUserCount();
    if (Number.isNaN(userCount)) {
      throw `Can't parse the ${storageName.userCount} key`;
    }
    await Promise.all([
      AsyncStorage.setItem(
        storageName.userId(userCount),
        JSON.stringify({
          privateKey: this.privateKey,
          cert: this.cert,
          profile: this._profile,
        })
      ),
      AsyncStorage.setItem(storageName.userCount, (userCount + 1).toString()),
    ]);
    this.user_id = userCount;
  }

  public async detach(): Promise<void> {
    if (
      (await AsyncStorage.getItem(storageName.userId(this.user_id))) === null
    ) {
      this.user_id = -1;
      return;
    }
    const userCount = await User.getUserCount();
    if (this.user_id === userCount - 1) {
      await Promise.all([
        AsyncStorage.removeItem(storageName.userId(this.user_id)),
        AsyncStorage.setItem(storageName.userCount, (userCount - 1).toString()),
      ]);
      this.user_id = -1;
      return;
    }
    for (let i = this.user_id + 1; i < userCount; ++i) {
      const value = (await AsyncStorage.getItem(
        storageName.userId(i)
      )) as string;
      await AsyncStorage.setItem(storageName.userId(i - 1), value);
    }
    this.user_id = -1;
    await AsyncStorage.setItem(
      storageName.userCount,
      (userCount - 1).toString()
    );
  }

  /**
   * Get the user stored locally with the specified id.
   * @param id
   */
  public static async getUser(id: number): Promise<User> {
    const userCount = await User.getUserCount();
    if (id >= userCount || id < 0) {
      throw "Invalid id!";
    }
    const { cert, privateKey, profile } = JSON.parse(
      (await AsyncStorage.getItem(storageName.userId(id))) as string
    ) as {
      cert: string;
      privateKey: string;
      profile: _UserInfo;
    };
    const resUser = new User(privateKey, cert, profile);
    resUser.user_id = id;
    return resUser;
  }

  /**
   * Register an user with the word list.
   * @param wordList must be **incomplete**.
   */
  public static async registerFromMnemonic(wordList: string[]) {
    // If wordList is complete and invalid, the next line throws.
    if (wordList.length === 12) {
      throw (
        "The word list is complete (with length 12), it can't be used for register." +
        "Do you mean restoreFromMnemonic?"
      );
    }
    const mnemonic = fixMnemonics(wordList.join(" "));
    const { privateKey, publicKey } = handleMnemonics(mnemonic);
    const cert = await queryCert(publicKey);
    return new User(privateKey, cert);
  }

  /**
   * Restore an user with the mnemonic sentence.
   * @param mnemonic the mnemonic sentence
   */
  public static async restoreFromMnemonic(mnemonic: string) {
    if (!isValidMnemonics(mnemonic)) {
      throw "Invalid mnemonic sentence!";
    }
    const { privateKey } = handleMnemonics(mnemonic);
    const cert = await restoreCert(privateKey);
    return new User(privateKey, cert);
  }
}
