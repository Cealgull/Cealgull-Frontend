import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { AccountView } from "../AccountView";
import { AccountViewProps } from "../AccountView";

export type AccountScreenProps = AccountViewProps;

export default function AccountScreen({
  route: { params },
}: StackScreenPropsGeneric<"Account">) {
  return <AccountView {...(params ?? {})} />;
}
