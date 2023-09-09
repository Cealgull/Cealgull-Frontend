import { Button, Text } from "@rneui/base";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Icon } from "@rneui/themed";

interface PostEditorProps {
  inputRef: React.RefObject<TextInput>;
  replyTo: string;
  publish: (content: string) => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  inputRef,
  replyTo,
  publish,
}: PostEditorProps) => {
  const [input, setInput] = useState<string>("");
  const [wholeFlex, setWholeFlex] = useState<number>(1);
  const [inputHeight, setInputHeight] = useState<string>("40%");

  const isFocus = (): boolean => {
    if (inputRef.current) {
      return inputRef.current.isFocused();
    }
    return false;
  };

  const handleFocus = () => {
    setWholeFlex(2.5);
    setInputHeight("80%");
  };

  const handleCancleFocus = () => {
    setWholeFlex(1);
    setInputHeight("40%");
  };

  const handlePublish = () => {
    publish(input);
    inputRef.current?.clear();
    inputRef.current?.blur();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: wholeFlex }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={PostEditorStyle.content}>
          <TextInput
            placeholder={`回复 ${replyTo}:`}
            onFocus={handleFocus}
            onBlur={handleCancleFocus}
            style={[PostEditorStyle.input, { height: inputHeight }]}
            onChangeText={(value) => {
              setInput(value);
            }}
            ref={inputRef}
            multiline
          />
          <View style={{ height: "80%", justifyContent: "space-around" }}>
            {isFocus() && (
              <Button
                buttonStyle={{ padding: 6, backgroundColor: "red" }}
                onPress={() => {
                  setInput("");
                  inputRef.current?.clear();
                }}
              >
                <Icon
                  type="antdesign"
                  name={"delete"}
                  size={20}
                  color={"white"}
                />
                <Text style={[PostEditorStyle.buttonText, { color: "white" }]}>
                  清空
                </Text>
              </Button>
            )}
            <Button
              onPress={handlePublish}
              buttonStyle={{ padding: 6 }}
              disabled={input.length == 0}
            >
              <Icon
                type="simple-line-icon"
                name="paper-plane"
                size={18}
                color={input.length == 0 ? "#696969" : "white"}
              />
              <Text
                style={[
                  PostEditorStyle.buttonText,
                  { color: input.length == 0 ? "#696969" : "white" },
                ]}
              >
                发布
              </Text>{" "}
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const PostEditorStyle = StyleSheet.create({
  input: {
    backgroundColor: "white",
    width: "70%",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonText: {
    marginLeft: 4,
    fontSize: 16,
  },
});
