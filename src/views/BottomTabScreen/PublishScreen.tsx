import type { StackScreenPropsGeneric } from "@src/@types/navigation";
import PublishView from "../PublishView";

export default function PublishScreen({
  route: { params },
  navigation,
}: StackScreenPropsGeneric<"Publish">) {
  const onClose = () => {
    navigation.pop();
  };

  const props = { ...(params ?? {}), onClose };

  return <PublishView {...props} />;
}
