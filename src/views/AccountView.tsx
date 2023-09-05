import { useNavigation } from "@react-navigation/native";
import { Icon, Dialog, Input } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { OptionItem } from "@src/components/OptionItem";
import { modifyUserInfo, uploadAvatarWithBase64 } from "@src/services/forum";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import ImageList from "./PublishView/ImageList";
import useImagePicker from "@src/hooks/useImagePicker";

export interface AccountViewProps {
  wallet: string;
  userName: string;
  userSignature: string;
  userAvatar: string;
}

export const AccountView = ({
  wallet,
  userName,
  userSignature,
  userAvatar,
}: AccountViewProps) => {
  type ModifyMode = "None" | "Name" | "Signature" | "Avatar";
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Account">["navigation"]>();
  const [openMode, setOpenMode] = useState<ModifyMode>("None");
  const [imageUriList, setImageUriList] = useState<string[]>(["empty"]);
  let inputData = "";
  const [avatarBase64, setAvatarBase64] = useState<string>("");

  const imagePicker = useImagePicker((options) => {
    return {
      ...options,
      allowsMultipleSelection: false,
      ...(Platform.OS === "ios" && { orderedSelection: true }),
    };
  });

  const handleSelectImage = async () => {
    const assets = await imagePicker();
    if (assets === null) {
      return;
    }
    setImageUriList(
      assets.map((asset) => {
        if (asset.base64) {
          setAvatarBase64(asset.base64);
        }
        return asset.uri;
      })
    );
  };

  const AvatarPicker = (option: { preAvatar: string }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={handleSelectImage}>
          <ImageList uris={imageUriList} />
        </TouchableOpacity>
      </View>
    );
  };

  const ModifyDialog = () => {
    return (
      <Dialog isVisible={openMode !== "None"}>
        <Dialog.Title title={`Modify User ${openMode}`} />
        {openMode !== "Avatar" ? (
          <Input
            onChangeText={(value) => {
              inputData = value;
            }}
            placeholder={openMode === "Name" ? userName : userSignature}
          />
        ) : (
          <AvatarPicker preAvatar={userAvatar} />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Dialog.Button title={"确认"} onPress={handleApply} />
          <Dialog.Button title={"取消"} onPress={handleCancel} />
        </View>
      </Dialog>
    );
  };

  const handleApply = async () => {
    if (inputData === "" && avatarBase64 === "") {
      setImageUriList(["empty"]);
      setOpenMode("None");
      return;
    }
    console.log(inputData);
    try {
      if (openMode === "Name") {
        await modifyUserInfo({ username: inputData });
      } else if (openMode === "Signature") {
        await modifyUserInfo({ signature: inputData });
      } else if (openMode === "Avatar") {
        const cid = await uploadAvatarWithBase64(avatarBase64);
        await modifyUserInfo({ avatar: cid });
      }
      Toast.show({
        type: "success",
        text1: "Modify Success 🙂",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Modify Error 🙁",
        text2: "Please check your network",
      });
    }
    setAvatarBase64("");
    setImageUriList(["empty"]);
    setOpenMode("None");
  };
  const handleCancel = () => {
    setOpenMode("None");
  };

  const handleModifyName = () => {
    setOpenMode("Name");
  };
  const handleModifySignature = () => {
    setOpenMode("Signature");
  };
  const handleModifyAvatar = () => {
    setOpenMode("Avatar");
  };

  return (
    <View style={AccountViewStyle.whole}>
      <View style={AccountViewStyle.header}>
        <HeaderBarWrapper alignMethod="lc">
          <Icon
            size={24}
            type="antdesign"
            name="left"
            onPress={() => navigation.pop()}
          />
          <Text style={AccountViewStyle.headerTitle}>账户</Text>
        </HeaderBarWrapper>
      </View>

      <View style={AccountViewStyle.content}>
        <ScrollView>
          <Text style={{ padding: 10, color: "#8B8989" }}>账户信息修改</Text>
          <TouchableOpacity onPress={handleModifyName}>
            <OptionItem
              title="修改用户名"
              icon={<Icon type="feather" name="edit" />}
              isCenter={true}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleModifySignature}>
            <OptionItem
              title="修改个性签名"
              icon={<Icon type="feather" name="edit" />}
              isCenter={true}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleModifyAvatar}>
            <OptionItem
              title="上传头像"
              icon={<Icon type="feather" name="upload-cloud" />}
              isCenter={true}
            />
          </TouchableOpacity>

          <Text style={{ padding: 10, color: "#8B8989" }}>账户切换</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <OptionItem
              title="退出登录"
              icon={<Icon color="red" type="feather" name="log-out" />}
              isCenter={true}
              titleColor="red"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ModifyDialog />
    </View>
  );
};

const AccountViewStyle = StyleSheet.create({
  content: { flex: 1 },
  whole: { flex: 1 },
  header: { backgroundColor: "rgb(230, 230, 230)" },
  headerTitle: { fontWeight: "bold", fontSize: 18 },
});
