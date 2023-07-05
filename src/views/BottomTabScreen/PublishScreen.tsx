import type { ScreenPropsGeneric } from "@src/@types/navigation";
import PublishView from "../PublishView";

export default function PublishScreen({
  route: { params },
}: ScreenPropsGeneric<"Publish">) {
  return <PublishView {...(params ?? {})} />;
}
