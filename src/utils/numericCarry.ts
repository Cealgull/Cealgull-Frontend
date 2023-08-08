export function numericCarry(num: number): string {
  if (num >= 0 && num < 1000) return String(num);
  const tmp = num / 1000;
  if (tmp > 99) return "99k+";
  const str = String(tmp * 10);
  const match = str.match(/^\d+$|^\d+\./) as RegExpExecArray;
  return `${parseFloat(match[0]) / 10.0}k`;
}
