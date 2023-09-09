/**
 * @author Bojun Ren
 * @data 2023/09/04
 */
import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";

interface LoadableProps<T> extends ActivityIndicatorProps {
  maybeProp: T | undefined;
  generator: (value: T) => React.ReactNode;
}

/**
 * A wrapper for components that may wait for some arguments
 * to be fulfilled (usually by promises), before which it's substituted
 * by the loading animation.
 *
 * @param maybeProp the waited argument that can be `undefined`. The
 * wrapped component is rendered as loading iff `maybeProp === undefined`.
 * @param generator a callback that accepts `maybeProp` as the only argument.
 * Called when `maybeProps !== undefined` to render the final components.
 */
export function Loadable<T>(props: LoadableProps<T>) {
  const { generator, maybeProp, ...otherProps } = props;
  if (maybeProp === undefined) {
    return <ActivityIndicator {...otherProps} />;
  }
  return generator(maybeProp);
}
