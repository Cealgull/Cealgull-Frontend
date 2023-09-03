import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

interface RingsigSpec {
  priv: string;
  pubs: string;
  nr_mem: number;
  mine: number;
}

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  readonly ringSign: (msg: string, spec: RingsigSpec) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeCrypto");
