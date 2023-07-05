import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

const inputCommonProps: TextInputProps = {
  multiline: true,
  autoCorrect: false,
  autoComplete: "off",
  spellCheck: false,
  textAlignVertical: "top",
};

export interface InputControlProps {
  title?: string;
  content?: string;
  onTitleChangeText?: (text: string) => void;
  onContentChangeText?: (text: string) => void;
}

export interface MultilineInputProps extends InputControlProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const MultilineInput: React.FC<MultilineInputProps> = ({
  title,
  content,
  onContentChangeText,
  onTitleChangeText,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <ScrollView keyboardDismissMode="on-drag">
        <TextInput
          style={[styles.input, styles.input_title]}
          placeholder="标题"
          placeholderTextColor={titlePlhColor}
          value={title}
          onChangeText={onTitleChangeText}
          {...inputCommonProps}
        />
        <TextInput
          style={[styles.input, styles.input_content]}
          placeholder="正文内容（可选）"
          placeholderTextColor={contentPlhColor}
          value={content}
          onChangeText={onContentChangeText}
          {...inputCommonProps}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingTop: 0, // clear
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

export default MultilineInput;
