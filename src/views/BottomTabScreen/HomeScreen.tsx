import type { TabScreenPropsGeneric } from "@src/@types/navigation";
import { HomeView } from "../HomeView";

export default function HomeScreen({
  route: { params },
}: TabScreenPropsGeneric<"Home">) {
  return <HomeView {...(params ?? {})} />;
}
