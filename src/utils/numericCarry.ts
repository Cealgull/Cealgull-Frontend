export function numericCarry(num: number): string {
  if (num >= 0 && num < 1000) return String(num);
  const tmpnum: number = num / 1000;
  if (tmpnum > 99) return "99k+";
  const tmpstr = String(tmpnum * 10);
  const reg = /^\d+$|^\d+\./;
  const match = tmpstr.match(reg);
  if (match === null) return String(num);
  return parseFloat(match[0]) / 10.0 + "k";
}
