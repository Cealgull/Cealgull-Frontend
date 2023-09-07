import { StackScreenPropsGeneric } from "@src/@types/navigation";
import { StatisticsView, StatisticsViewProps } from "../StatisticsView";

export type StatisticsScreenProps = StatisticsViewProps;

export default function StatisticsScreen({
  route: { params },
}: StackScreenPropsGeneric<"Statistics">) {
  return <StatisticsView {...(params ?? {})} />;
}
