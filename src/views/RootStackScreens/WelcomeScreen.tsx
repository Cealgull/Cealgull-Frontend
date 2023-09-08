import { StackScreenPropsGeneric } from "@src/@types/navigation";
import WelcomeView from "../WelcomeView";

export type WelcomeScreenProps = Parameters<typeof WelcomeView>[0];

export default function WelcomeScreen({
  route: { params },
}: StackScreenPropsGeneric<"Welcome">) {
  return <WelcomeView {...params} />;
}
