import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  defaultColors,
  defaultIcons,
  defaultImages,
} from "@/constants/defaultStuff";

type AvatarProps = {
  source: string;
  size: number;
  imageKey?: number;
  type: string;
  handleButtonPress?: () => void;
  additionalStyles?: {};
};

export default function Avatar({
  type,
  imageKey,
  source,
  size,
  handleButtonPress,
  additionalStyles,
}: AvatarProps) {
  if (type === "upload") {
    return (
      <View
        style={[
          additionalStyles,
          { width: size, height: size, position: "relative" },
        ]}
      >
        <Image
          key={imageKey}
          source={
            source === "default"
              ? defaultImages.defaultProfile
              : { uri: source }
          }
          resizeMode="contain"
          style={[{ width: size, height: size, borderRadius: 100 }]}
        />

        <TouchableOpacity onPress={handleButtonPress}>
          <Image
            source={defaultIcons.addFill}
            resizeMode="contain"
            style={[styles.addIcon, { width: size * 0.3, height: size * 0.3 }]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (type === "display") {
    return (
      <Image
        key={imageKey}
        source={
          source === "default" ? defaultImages.defaultProfile : { uri: source }
        }
        resizeMode="contain"
        style={[{ width: size, height: size, borderRadius: 100 }]}
      />
    );
  }
}

const styles = StyleSheet.create({
  addIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    tintColor: defaultColors.primary,
  },
});
