import { Button, Icon } from "@rneui/themed";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import useImagePicker from "@src/services/useImagePicker";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageList from "./ImageList";
import MultilineInput, { InputControlProps } from "./MultilineInput";

interface PublishButtonProps {
  backGroundColor: string;
  color: string;
}

const PublishButton: React.FC<PublishButtonProps> = ({
  backGroundColor,
  color,
}) => {
  return (
    <>
      <Button buttonStyle={styles.btn} color={backGroundColor}>
        <Text style={[styles.btn_text, { color }]}>发布</Text>
        <Icon name="send" type="feather" size={20} color={color} />
      </Button>
    </>
  );
};

export default function PublishView() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUriList, setImageUriList] = useState<string[]>([]);
  const imagePicker = useImagePicker((options) => {
    return {
      ...options,
      allowsMultipleSelection: true,
      ...(Platform.OS === "ios" && { orderedSelection: true }),
    };
  });
  const { bottom } = useSafeAreaInsets();

  const handleSelectImage = async () => {
    const assets = await imagePicker();
    if (assets === null) {
      return;
    }
    setImageUriList(assets.map((asset) => asset.uri));
  };

  const [iconBackgroundColor, iconColor] = useMemo(() => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      return ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"];
    }
    return ["#0096c7", "#fff"];
  }, [title, content]);

  const inputProps: InputControlProps = {
    title,
    content,
    onContentChangeText(text) {
      setContent(text);
    },
    onTitleChangeText(text) {
      setTitle(text);
    },
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* HeaderBar is inflexible */}
          <HeaderBarWrapper alignMethod="lr">
            <Icon name="close" type="antdesign" size={30} />
            <PublishButton
              color={iconColor}
              backGroundColor={iconBackgroundColor}
            />
          </HeaderBarWrapper>
          {/* flex: 1 */}
          <View style={styles.container}>
            <MultilineInput {...inputProps} />
            <ImageList uris={imageUriList} />
          </View>
          {/* Bottom menu is inflexible */}
          <View style={[styles.bottom_container, { marginBottom: bottom }]}>
            <Icon
              name="file-image"
              type="material-community"
              size={30}
              onPress={handleSelectImage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  bottom_container: {
    borderTopColor: "rgba(0,0,0,0.1)",
    borderTopWidth: 0.8,
    flex: 0,
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.08,
    justifyContent: "space-evenly",
    padding: 10,
  },
  btn: {
    borderRadius: 50,
    height: 30,
    padding: 0,
  },
  btn_text: {
    fontSize: 16,
    fontWeight: "900",
    marginRight: 4,
  },
  container: {
    flex: 1,
  },
});
