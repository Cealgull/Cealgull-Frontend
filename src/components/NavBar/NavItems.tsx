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

interface NavMyIconProps {
  focused: boolean;
}
export const NavMyIcon = ({ focused }: NavMyIconProps) => {
  const navigation =
    useNavigation<MainScreenPropsGeneric<"Person">["navigation"]>();

  const content = focused ? (
    <View style={{ alignItems: "center" }}>
      <Icon type="antdesign" name="user" color={"red"} size={32} />
      <Text style={[NavbarIconStyle.text, { marginTop: 5, color: "red" }]}>
        个人
      </Text>
    </View>
  ) : (
    <View style={{ alignItems: "center" }}>
      <Icon type="antdesign" name="user" size={32} />
      <Text style={[NavbarIconStyle.text, { marginTop: 5 }]}>个人</Text>
    </View>
  );
  return (
    <TouchableOpacity
      /*FIX ME:we need wallet in auth login service */
      onPress={() => navigation.navigate("Person")}
      style={NavbarIconStyle.wrapper}
    >
      {content}
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
    <View style={NavbarIconStyle.wrapper}>
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
      <Text style={NavbarIconStyle.text}>新建话题</Text>
    </View>
  );
};

interface NavHomeIconProps {
  focused: boolean;
}

export const NavHomeIcon = ({ focused }: NavHomeIconProps) => {
  const navigation =
    useNavigation<MainScreenPropsGeneric<"Home">["navigation"]>();
  const content = focused ? (
    <View style={{ alignItems: "center" }}>
      <Icon type="antdesign" name="home" size={32} color={"red"} />
      <Text style={[NavbarIconStyle.text, { marginTop: 5, color: "red" }]}>
        首页
      </Text>
    </View>
  ) : (
    <View style={{ alignItems: "center" }}>
      <Icon type="antdesign" name="home" size={32} />
      <Text style={[NavbarIconStyle.text, { marginTop: 5 }]}>首页</Text>
    </View>
  );
  return (
    <TouchableOpacity
      style={NavbarIconStyle.wrapper}
      onPress={() =>
        navigation.navigate("Home", {
          pageSize: 10,
          category: "",
          tags: [],
        })
      }
    >
      {content}
    </TouchableOpacity>
  );
};

const NavbarIconStyle = StyleSheet.create({
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
