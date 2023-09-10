import type { MainScreenPropsGeneric } from "@src/@types/navigation";
import { PersonView } from "../PersonView";

export type PersonScreenProps = undefined;

export default function PersonScreen({
  route: { params },
}: MainScreenPropsGeneric<"Person">) {
  return <PersonView />;
}
