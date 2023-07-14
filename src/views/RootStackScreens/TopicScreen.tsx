import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TopicView } from "../TopicView";

export type TopicScreenProps = {
  tid: string;
};

export default function TopicScreen({
  route: { params },
}: StackScreenPropsGeneric<"Topic">) {
  return <TopicView tid={params.tid} />;
}
