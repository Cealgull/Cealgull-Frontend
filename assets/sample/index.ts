import { jsonToUserInfoPOJO } from "@src/models/User";
import _userInfo from "./userInfo.json";

const _userInfo_sample = jsonToUserInfoPOJO(_userInfo);

export { _userInfo_sample };
