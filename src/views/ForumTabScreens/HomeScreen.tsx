import type { MainScreenPropsGeneric } from "@src/@types/navigation";
import { HomeView } from "../HomeView";
import { HomeViewProps } from "../HomeView";

export type HomeScreenProps = HomeViewProps;

export default function HomeScreen({
  route: { params },
}: MainScreenPropsGeneric<"Home">) {
  return <HomeView {...params} />;
}
