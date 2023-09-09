/**
 * @file UserAvatar component
 * @author Bojun Ren
 * @data 2023/09/10
 */
import { Avatar } from "@rneui/themed";

interface UserAvatarProps {
  size?: ("small" | "medium" | "large" | "xlarge") | number;
  uri?: string;
  alt?: string;
}

/**
 * An user avatar component with auto-generated fallback.
 * @param [size=80]
 * @param [uri] - if not given, the avatar uses the fallback
 *        (generate a text avatar according to the argument `alt`)
 * @param [alt] - please give the argument whenever possible
 *
 */
export default function UserAvatar({ size = 80, uri, alt }: UserAvatarProps) {
  if (uri !== undefined) {
    return <Avatar rounded size={size} source={{ uri }} imageProps={{ alt }} />;
  }
  const altString = alt || "C";
  const color = colorList[_hashString(altString) % colorList.length];
  const title =
    altString.charAt(0).toUpperCase() +
    (altString.length >= 2 ? altString.charAt(1).toLowerCase() : "");
  return (
    <Avatar
      rounded
      size={size}
      title={title}
      imageProps={{ alt }}
      containerStyle={{ backgroundColor: color }}
    />
  );
}

/** @see https://stackoverflow.com/a/7616484/17838999 */
function _hashString(str: string): number {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
const colorList = [
  "red",
  "purple",
  "blue",
  "yellow",
  "green",
  "orange",
  "skyblue",
];
