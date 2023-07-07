import type { TabScreenPropsGeneric } from "@src/@types/navigation";
import { HomeView } from "../HomeView";

export type HomeScreenProps = undefined;

export default function HomeScreen({
  route: { params },
}: TabScreenPropsGeneric<"Home">) {
  return <HomeView {...(params ?? {})} />;
}
