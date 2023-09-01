import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import { TopicView, TopicViewProps } from "../TopicView";

export type TopicScreenProps = TopicViewProps;

export default function TopicScreen({
  route: { params },
}: StackScreenPropsGeneric<"Topic">) {
  return <TopicView {...params} />;
}
