import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { ProductionInfoView } from "../ProductInfoView";

export type ProductionInfoScreenProps = undefined;

export function ProductionInfoScreen({
  route: { params },
}: StackScreenPropsGeneric<"ProductionInfo">) {
  return <ProductionInfoView {...(params ?? {})} />;
}
