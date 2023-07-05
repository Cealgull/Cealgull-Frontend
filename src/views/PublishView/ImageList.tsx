import { Image, ImageProps } from "@rneui/themed";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface ImageDisplayProps extends Omit<ImageProps, "source"> {
  uri: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ uri, ...imageProps }) => {
  return (
    <>
      <View style={styles.image_container}>
        <Image
          source={{ uri }}
          style={styles.image}
          {...imageProps}
          resizeMode="cover"
        />
      </View>
    </>
  );
};

export interface ImageListProps {
  uris: string[];
}

const ImageList: React.FC<ImageListProps> = ({ uris }) => {
  if (uris.length === 0) {
    return null;
  }
  return (
    <View style={styles.image_list_container}>
      {uris.map((uri) => (
        <ImageDisplay uri={uri} key={uri} />
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
