import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import {
  MainScreenPropsGeneric,
  StackScreenPropsGeneric,
} from "@src/@types/navigation";
import { createTopic, uploadAvatarWithBase64 } from "@src/services/forum";
import { PublishViewProps } from "@src/views/PublishView/PublishView";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NavMyIcon = () => {
  const navigation =
    useNavigation<MainScreenPropsGeneric<"Person">["navigation"]>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Person")}
      style={NavbarIcon.wrapper}
    >
      <View>
        <Icon type="antdesign" name="user" />
        <Text style={[NavbarIcon.text, { marginTop: 5 }]}>个人</Text>
      </View>
    </TouchableOpacity>
  );
};

export const NavPublishIcon = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();

  const onPublish = useCallback<PublishViewProps["onPublish"]>(
    async (title, content, tagList, category, { imageBase64List }) => {
      const cidList: string[] = [];
      for (const imageBase64 of imageBase64List) {
        const cid = await uploadAvatarWithBase64(imageBase64);
        console.log("🚀 ~ file: NavItems.tsx:41 ~ cid:", cid);
        cidList.push(cid);
      }
      await createTopic(
        content,
        cidList,
        title,
        category.name,
        tagList.map((tag) => tag.name)
      );
      console.log("post success!");
    },
    []
  );

  return (
    <View style={NavbarIcon.wrapper}>
      <TouchableOpacity
        onPress={() =>
          navigation.push("Publish", { onPublish } as PublishViewProps)
        }
      >
        <Icon
          size={26}
          reverse
          color="red"
          testID="publishIcon"
          type="antdesign"
          name="pluscircle"
        />
      </TouchableOpacity>
      <Text style={NavbarIcon.text}>新建话题</Text>
    </View>
  );
};

export const NavHomeIcon = () => {
  const navigation =
    useNavigation<MainScreenPropsGeneric<"Home">["navigation"]>();
  return (
    <TouchableOpacity
      style={NavbarIcon.wrapper}
      onPress={() => navigation.navigate("Home")}
    >
      <View>
        <Icon type="antdesign" name="home" />
        <Text style={[NavbarIcon.text, { marginTop: 5 }]}>首页</Text>
      </View>
    </TouchableOpacity>
  );
};

const NavbarIcon = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  wrapper: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
  },
});
