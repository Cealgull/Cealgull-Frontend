import config from "@src/config";

interface SelectConfig {
  /**
   * How many words should be selected
   */
  index: number;
  count: number;
  least: number;
  most: number;
}

const counts = config["register.mnemonics.counts"];

const configs = counts.reduce<SelectConfig[]>((previous, count, i) => {
  const { most: previous_most } = previous.at(-1) ?? { most: 0 };
  return [
    ...previous,
    { count, least: previous_most, most: previous_most + count, index: i },
  ];
}, []);

export { configs as selectConfig };
export type { SelectConfig as SelectConfigType };
export const selectLength = counts.reduce((p, c) => p + c);
