import dayjs from "dayjs";

export function timeTransfer(timeData: string | Date): string {
  const ISOTime = dayjs(timeData);
  return ISOTime.format("YYYY-MM-DD HH:mm:ss");
}

export const tagColorSwitcher = (tagText: string) => {
  switch (tagText) {
    case "1": {
      return "red";
    }
    case "2": {
      return "blue";
    }
    case "3": {
      return "green";
    }
    case "4": {
      return "yellow";
    }
    default: {
      return "grey";
    }
  }
};

export function numericCarry(num: number): string {
  if (num >= 0 && num < 1000) return String(num);
  const tmp = num / 1000;
  if (tmp > 99) return "99k+";
  const str = String(tmp * 10);
  const match = str.match(/^\d+$|^\d+\./) as RegExpExecArray;
  return `${parseFloat(match[0]) / 10.0}k`;
}

export const isInVoteList = (
  voteList: string[],
  loginWallet: string
): boolean => {
  for (const item of voteList) {
    if (item === loginWallet) return true;
  }
  return false;
};

export const upvoteColorSelector = (isActive: boolean): string => {
  return isActive ? "#76EE00" : "#8B8989";
};

export const downvoteColorSelector = (isActive: boolean): string => {
  return isActive ? "#FF4500" : "#8B8989";
};
