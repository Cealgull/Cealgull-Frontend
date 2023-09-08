import { User } from "@src/models/User";
import React, { createContext, useContext } from "react";

const UserContext = createContext<
  ReturnType<typeof React.useState<User | undefined>> | undefined
>(undefined);

/**
 * The hook to read UserContext.
 * **Warning**: the hook can be dangerous, since it assume the context is initialized.
 * But in most cases, it's safe to use.
 * @returns the current user instance
 */
export default function useUser(): Readonly<User | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [user] = useContext(UserContext)!;
  return user;
}

/**
 * The hook is used to set UserContext.
 * @returns the callback to dispatch the user context
 */
export function useSetUser() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [, setUser] = useContext(UserContext)!;
  return setUser as Readonly<typeof setUser>;
}

export { UserContext };
