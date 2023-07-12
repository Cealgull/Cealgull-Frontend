import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { AccountView } from "../AccountView";

export type AccountScreenProps = undefined;

export default function AccountScreen({
  route: { params },
}: StackScreenPropsGeneric<"Account">) {
  return <AccountView {...(params ?? {})} />;
}
