import type { ScreenPropsGeneric } from "@src/@types/navigation";
import { PersonView } from "../PersonView";

export default function PersonScreen({
  route: { params },
}: ScreenPropsGeneric<"Person">) {
  return <PersonView {...(params ?? {})} />;
}
