import {
  ImagePickerOptions,
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { Alert } from "react-native";

const initialOptions: ImagePickerOptions = {
  mediaTypes: MediaTypeOptions.Images,
  allowsEditing: false,
  base64: true,
  allowsMultipleSelection: false,
};

/**
 *
 * @param _options ImagePickerOptions
 *        or a callback to generate options from default
 * @returns an async function to select pictures
 */
export default function useImagePicker(
  _options?:
    | ImagePickerOptions
    | ((options: ImagePickerOptions) => ImagePickerOptions)
) {
  const options = (function (
    _options?:
      | ImagePickerOptions
      | ((options: ImagePickerOptions) => ImagePickerOptions)
  ) {
    if (_options === undefined) return initialOptions;
    if (typeof _options === "function") return _options(initialOptions);
    return _options;
  })(_options);

  const [mediaLibraryPermissions, requestMediaLibraryPermission] =
    useMediaLibraryPermissions();

  return async function () {
    if (mediaLibraryPermissions === null) {
      console.error("An error occurs.");
      return null;
    }
    const { canAskAgain, granted } = mediaLibraryPermissions;
    if (!granted && canAskAgain) {
      const { granted: granted_new } = await requestMediaLibraryPermission();
      if (!granted_new) {
        Alert.alert("无法访问相簿，请前往设置界面调整访问权限！");
        return null;
      }
    }
    const { canceled, assets } = await launchImageLibraryAsync(options);
    if (!canceled) {
      return assets;
    }
    return null;
  };
}
