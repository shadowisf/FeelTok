import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";

type TabIconProps = {
  icon: any;
  onPress: () => void;
};

export default function ClickableIcon({ icon, onPress }: TabIconProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icon} style={styles.icon}></Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
});
