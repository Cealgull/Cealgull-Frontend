import { Image, ImageProps } from "@rneui/themed";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface ImageDisplayProps extends Omit<ImageProps, "source"> {
  base64: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  base64,
  ...imageProps
}) => {
  return (
    <>
      <View style={styles.image_container}>
        <Image
          source={{ uri: "data:image/jpeg;base64," + base64 }}
          style={styles.image}
          {...imageProps}
          resizeMode="cover"
        />
      </View>
    </>
  );
};

export interface ImageListProps {
  base64s: string[];
}

const ImageList: React.FC<ImageListProps> = ({ base64s }) => {
  if (base64s.length === 0) {
    return null;
  }
  return (
    <View style={styles.image_list_container}>
      {base64s.map((base64) => (
        <ImageDisplay base64={base64} key={base64} />
      ))}
    </View>
  );
};

const _half_gap = 4;
const _screen_gap = 12; // Expect to larger than `_half_gap * 2`
const _size =
  (Dimensions.get("screen").width - _half_gap * 4 - _screen_gap * 2) / 3;

const styles = StyleSheet.create({
  image: {
    height: _size,
    width: _size,
  },
  image_container: {
    borderRadius: 10,
    height: _size,
    marginBottom: _half_gap * 2,
    marginHorizontal: _half_gap,
    overflow: "hidden",
    width: _size,
  },
  image_list_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: _screen_gap - _half_gap,
  },
});

export default ImageList;
