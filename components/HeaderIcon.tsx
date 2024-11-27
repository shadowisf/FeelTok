import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

type TabIconProps = {
  icon: any;
  onPress: () => void;
  additionalStyles?: {};
};

export default function HeaderIcon({
  icon,
  onPress,
  additionalStyles,
}: TabIconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[additionalStyles]}>
      <Image source={icon} style={styles.icon} />
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
