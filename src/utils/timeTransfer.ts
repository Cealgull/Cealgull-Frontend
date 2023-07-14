export default function timeTransfer(ISOtime: string): string {
  const date = new Date(ISOtime);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
