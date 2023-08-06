import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TopicView } from "../TopicView";

export type TopicScreenProps = {
  id: string; // The topic id
};

export default function TopicScreen({
  route: { params },
}: StackScreenPropsGeneric<"Topic">) {
  return <TopicView id={params.id} />;
}
