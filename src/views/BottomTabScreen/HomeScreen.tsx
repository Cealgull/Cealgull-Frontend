import type { ScreenPropsGeneric } from "@src/@types/navigation";
import { HomeView } from "../HomeView";

export default function HomeScreen({
  route: { params },
}: ScreenPropsGeneric<"Home">) {
  return <HomeView {...(params ?? {})} />;
}
