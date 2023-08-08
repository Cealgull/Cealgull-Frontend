import dayjs from "dayjs";

export function timeTransfer(ISOstring: string): string {
  const ISOTime = dayjs(ISOstring);
  return ISOTime.format("YYYY-MM-DD HH:mm:ss");
}
