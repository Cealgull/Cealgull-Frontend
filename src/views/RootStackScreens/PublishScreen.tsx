import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import PublishView from "../PublishView";

export type PublishScreenProps = undefined;

export default function PublishScreen({
  route: { params },
  navigation,
}: StackScreenPropsGeneric<"Publish">) {
  return (
    <PublishView
      onClose={() => navigation.pop()}
      onPublish={params.onPublish}
    />
  );
}
