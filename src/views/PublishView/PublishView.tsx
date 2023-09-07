/**
 * @author Bojun Ren
 * @data 2023/07/06
 */
import { Button, Icon } from "@rneui/themed";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import useImagePicker from "@src/hooks/useImagePicker";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageList from "./ImageList";
import MultilineInput, { InputControlProps } from "./MultilineInput";

interface PublishButtonProps {
  enabled: boolean;
  onPress: () => Promise<void>;
}

const PublishButton: React.FC<PublishButtonProps> = ({ enabled, onPress }) => {
  const [backgroundColor, color] = useMemo(() => {
    if (enabled) {
      return ["#0096c7", "#fff"];
    }
    return ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"];
  }, [enabled]);
  return (
    <>
      <Button
        buttonStyle={styles.btn}
        color={backgroundColor}
        onPress={async () => {
          if (enabled) await onPress();
        }}
      >
        <Text style={[styles.btn_text, { color }]}>发布</Text>
        <Icon name="send" type="feather" size={20} color={color} />
      </Button>
    </>
  );
};

interface PublishMedia {
  imageUrl: string[];
}
type PublishHandler = (
  title: string,
  content: string,
  media: PublishMedia
) => Promise<void>;

interface PublishViewProps {
  onClose: () => void;
  onPublish: PublishHandler;
}

/**
 * The view to publish a topic.
 * @param onClose callback to execute when click the close button.
 * @param onPublish callback to execute when click the publish button.
 */
export default function PublishView({ onClose, onPublish }: PublishViewProps) {
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

  const handlePublish = async () => {
    await onPublish(title, content, { imageUrl: imageUriList });
  };

  const publishBtnEnabled = useMemo<boolean>(() => {
    return title.trim().length !== 0 && content.trim().length !== 0;
  }, [title, content]);

  return (
    <>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* HeaderBar is inflexible */}
          <HeaderBarWrapper alignMethod="lr">
            <Icon name="close" type="antdesign" size={30} onPress={onClose} />
            <PublishButton
              enabled={publishBtnEnabled}
              onPress={handlePublish}
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
      </Pressable>
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
    flexGrow: 1,
  },
});
