import { Image } from "@rneui/themed";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native";

interface ImageCardProps {
  imageUri: string;
}

const ImageCard = ({ imageUri }: ImageCardProps) => {
  return (
    <View style={ImageCardStyle.whole}>
      <Image
        source={{ uri: imageUri }}
        containerStyle={ImageCardStyle.image}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
  );
};

interface ImageListProps {
  imageUri: string[];
}

export const ImageList = ({ imageUri }: ImageListProps) => {
  const renderImageCard = ({ item }: { item: string }) => {
    return <ImageCard imageUri={item} />;
  };

  if (imageUri.length === 0) return <></>;
  return (
    <FlatList
      style={ImageListStyle.list}
      data={imageUri}
      renderItem={renderImageCard}
      horizontal={true}
    />
  );
};

const ImageListStyle = StyleSheet.create({
  list: {
    width: "100%",
    aspectRatio: 3,
    paddingVertical: "2%",
  },
});

const ImageCardStyle = StyleSheet.create({
  image: {
    backgroundColor: "rgb(225,225,225)",
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  whole: {
    marginLeft: 12,
    height: "100%",
    aspectRatio: 1,
  },
});
