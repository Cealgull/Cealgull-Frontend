import { useState } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";

const inputCommonProps: TextInputProps = {
  multiline: true,
  autoCorrect: false,
  autoComplete: "off",
  spellCheck: false,
  textAlignVertical: "top",
};

interface PlaceHolderStyle {
  text?: string;
  color?: ColorValue;
}

/**
 *
 * @param inputStyle - the style property of {@link TextInputProps}
 * @param plhStyle - an object indicating the placeholder's text and color
 * @returns the inner text state, and the element to represent
 */
export default function useTextInput(
  inputStyle: StyleProp<TextStyle>,
  plhStyle: PlaceHolderStyle
): [string, React.ReactNode] {
  const [text, setText] = useState<string>("");
  const handleOnChangeText = (text: string) => {
    setText(text);
  };
  const textInputComponent = (
    <TextInput
      style={[styles.input, inputStyle]}
      placeholder={plhStyle.text}
      placeholderTextColor={plhStyle.color}
      value={text}
      onChangeText={handleOnChangeText}
      {...inputCommonProps}
    />
  );

  return [text, textInputComponent];
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingTop: 0, // clear
  },
});
