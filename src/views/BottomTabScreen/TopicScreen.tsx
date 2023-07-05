import type { ScreenPropsGeneric } from "@src/@types/navigation";
import { TopicView } from "../TopicView";

export default function TopicScreen({
  route: { params },
}: ScreenPropsGeneric<"Topic">) {
  return <TopicView {...(params ?? {})} />;
}
