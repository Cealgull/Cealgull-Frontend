import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

interface RingSignSpec {
  priv: string;
  pubs: string;
  num: number;
  mine: number;
}

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  readonly ringSign: (msg: string, spec: RingSignSpec) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeCrypto");
