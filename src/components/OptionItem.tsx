import { ListItem } from "@rneui/themed";
import { View } from "react-native";

interface OptionItemProps {
  title: string;
  icon: JSX.Element;
  titleColor?: string;
  isCenter?: boolean;
}

export const OptionItem = ({
  title,
  icon,
  titleColor = "black",
  isCenter = false,
}: OptionItemProps) => {
  return (
    <ListItem
      containerStyle={{ justifyContent: isCenter ? "center" : "space-between" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        <ListItem.Title style={{ color: titleColor, paddingLeft: 10 }}>
          {title}
        </ListItem.Title>
      </View>
      {!isCenter ? <ListItem.Chevron {...ChevronStyle} /> : null}
    </ListItem>
  );
};

const ChevronStyle = {
  color: "black",
  size: 20,
};
