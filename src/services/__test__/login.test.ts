import { handleMnemonics } from "@src/utils/bip";
import { startForumServer } from "./mirage";
import { login } from "../auth";

const mnemonics = "铝 北 肠 泼 舞 京 墙 色 谐 养 园 暗";

describe("Test login logic", () => {
  test("Test login function (only make sure the request is normally sent)", async () => {
    const server = startForumServer();

    const { privateKey } = handleMnemonics(mnemonics);
    await login(privateKey, "a fake cert");

    server.shutdown();
  });
});
