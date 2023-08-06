// FIXME: native Date API is enough to do formatting and parsing.
export default function timeTransfer(ISOtime: string): string {
  const localDate = new Date(ISOtime);
  const fullyear = localDate.getFullYear().toString();
  const month = (localDate.getMonth() + 1).toString();
  const date = localDate.getDate().toString();
  const hour = localDate.getHours().toString();
  const minute = localDate.getMinutes().toString();
  const second = localDate.getSeconds().toString();

  return `${fullyear}-${month}-${date} ${hour}:${minute}:${second}`;
}
