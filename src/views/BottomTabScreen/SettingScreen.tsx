import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { SettingView } from "../SettingView";

export type SettingScreenProps = undefined;

export default function SettingScreen({
  route: { params },
}: StackScreenPropsGeneric<"Setting">) {
  return <SettingView {...(params ?? {})} />;
}
