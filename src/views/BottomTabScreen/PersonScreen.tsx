import type { TabScreenPropsGeneric } from "@src/@types/navigation";
import { PersonView } from "../PersonView";

export default function PersonScreen({
  route: { params },
}: TabScreenPropsGeneric<"Person">) {
  return <PersonView {...(params ?? {})} />;
}
