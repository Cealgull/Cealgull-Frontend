import type { MainScreenPropsGeneric } from "@src/@types/navigation";
import { PersonView, PersonViewProps } from "../PersonView";

export type PersonScreenProps = PersonViewProps;

export default function PersonScreen({
  route: { params },
}: MainScreenPropsGeneric<"Person">) {
  return <PersonView {...(params ?? {})} />;
}
