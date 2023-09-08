import type { MainScreenPropsGeneric } from "@src/@types/navigation";
import { HomeView } from "../HomeView";

export type HomeScreenProps = undefined;

export default function HomeScreen({
  route: { params },
}: MainScreenPropsGeneric<"Home">) {
  return <HomeView {...(params ?? {})} />;
}
