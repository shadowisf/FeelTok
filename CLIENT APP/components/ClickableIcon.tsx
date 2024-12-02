import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

type TabIconProps = {
  icon: any;
  onPress: () => void;
  touchableAdditionalStyles?: {};
  imageAdditionalStyles?: {};
};

export default function ClickableIcon({
  icon,
  onPress,
  touchableAdditionalStyles,
  imageAdditionalStyles,
}: TabIconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[touchableAdditionalStyles]}>
      <Image
        source={icon}
        style={[styles.icon, imageAdditionalStyles]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
});
