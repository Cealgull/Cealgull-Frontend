/**
 * @author Bojun Ren
 * @data 2023/07/06
 */
import { useNavigation } from "@react-navigation/native";
import { Button, ButtonGroup, Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { Loadable } from "@src/components/Loadable";
import useImagePicker from "@src/hooks/useImagePicker";
import useTextInput from "@src/hooks/useTextInput";
import { getAllCategories, getAllTags } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageList from "./ImageList";

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
  imageBase64List: string[];
}
export type PublishHandler = (
  title: string,
  content: string,
  tagList: Tag[],
  category: Category,
  media: PublishMedia
) => Promise<void>;

export interface PublishViewProps {
  onClose: () => void;
  onPublish: PublishHandler;
}

/**
 * The view to publish a topic.
 * @param onClose callback to execute when click the close button.
 * @param onPublish callback to execute when click the publish button.
 */
export default function PublishView({ onClose, onPublish }: PublishViewProps) {
  const [title, titleInputComponent] = useTextInput(styles.input_title, {
    text: "标题",
    color: titlePlhColor,
  });
  const [content, contentInputComponent] = useTextInput(styles.input_content, {
    text: "正文内容",
    color: contentPlhColor,
  });
  const [imageBase64List, setImageBase64List] = useState<string[]>([]);
  const imagePicker = useImagePicker((options) => {
    return {
      ...options,
      allowsMultipleSelection: true,
      ...(Platform.OS === "ios" && { orderedSelection: true }),
    };
  });
  const { bottom } = useSafeAreaInsets();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedTagIndexes, setSelectedTagIndexes] = useState<number[]>([]);
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Publish">["navigation"]>();

  const handleSelectImage = async () => {
    const assets = await imagePicker();
    if (assets === null) {
      return;
    }
    setImageBase64List(assets.map((asset) => asset.base64 as string));
  };

  const publishBtnEnabled = useMemo<boolean>(() => {
    return (
      title.trim().length !== 0 &&
      content.trim().length !== 0 &&
      selectedTagIndexes.length !== 0
    );
  }, [title, content, selectedTagIndexes]);

  const { data: tagList } = useQuery<Tag[]>({
    queryKey: ["publish", "tag list"],
    queryFn: async () => {
      return (await getAllTags()).slice(0, 5);
    },
  });

  const { data: categoryList } = useQuery<Category[]>({
    queryKey: ["publish", "category list"],
    queryFn: async () => {
      return (await getAllCategories()).slice(0, 5);
    },
  });

  const handlePublish = async () => {
    await onPublish(
      title,
      content,
      (tagList as Tag[]).filter(
        (_tag, i) => selectedTagIndexes.find((index) => index === i) !== null
      ),
      (categoryList as Category[]).find(
        (_cat, i) => i === selectedCategoryIndex
      ) as Category,
      { imageBase64List }
    );
    navigation.pop();
  };

  const createCategoryList = useCallback(
    (categoryList: Category[]) => {
      return (
        <ButtonGroup
          buttons={categoryList.map((cat) => cat.name)}
          selectedIndex={selectedCategoryIndex}
          onPress={(value) => {
            setSelectedCategoryIndex(value);
          }}
          containerStyle={{ margin: 6, borderWidth: 0 }}
          innerBorderStyle={{ width: 10, color: "rgba(0,0,0,0.05)" }}
          buttonStyle={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 4,
          }}
        />
      );
    },
    [selectedCategoryIndex]
  );

  const createTagList = useCallback(
    (tagList: Tag[]) => {
      return (
        <ButtonGroup
          buttons={tagList.map((tag) => tag.name)}
          selectMultiple
          selectedIndexes={selectedTagIndexes}
          onPress={(value) => {
            setSelectedTagIndexes(value);
          }}
          containerStyle={{ margin: 6, borderWidth: 0 }}
          innerBorderStyle={{ width: 10, color: "rgba(0,0,0,0.05)" }}
          buttonStyle={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 4,
          }}
        />
      );
    },
    [selectedTagIndexes]
  );

  return (
    <>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* HeaderBar is inflexible */}
          <HeaderBarWrapper alignMethod="lcr">
            <Icon
              name="close"
              type="antdesign"
              size={30}
              onPress={() => navigation.pop()}
            />
            <Text style={styles.header}>创建新话题</Text>
            <PublishButton
              enabled={publishBtnEnabled}
              onPress={handlePublish}
            />
          </HeaderBarWrapper>
          <Text style={{ margin: 10 }}>选择话题：</Text>
          <Loadable maybeProp={categoryList} generator={createCategoryList} />
          <Text style={{ margin: 10 }}>选择标签：</Text>
          <Loadable maybeProp={tagList} generator={createTagList} />
          {/* flex: 1 */}
          <View style={styles.container}>
            <View>
              <ScrollView keyboardDismissMode="on-drag">
                {titleInputComponent}
                {contentInputComponent}
              </ScrollView>
            </View>
            <ImageList base64s={imageBase64List} />
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
  header: {
    fontSize: 22,
    fontWeight: "500",
  },
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
  input_content: {
    fontSize: 18, // default
    marginBottom: 20,
  },
  input_title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    marginTop: 16,
  },
});

const titlePlhColor = "#b3b3b3";
const contentPlhColor = "#ccc";
