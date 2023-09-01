import dayjs from "dayjs";

export function timeTransfer(timeData: string | Date): string {
  const ISOTime = dayjs(timeData);
  return ISOTime.format("YYYY-MM-DD HH:mm:ss");
}
