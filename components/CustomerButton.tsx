import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";

type CustomButtonProps = {
  label: string;
  handlePress: () => void;
  isLoading: boolean;
};

export default function CustomButton({
  label,
  handlePress,
  isLoading,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        opacity: isLoading ? 0.25 : 1,
      }}
      onPress={handlePress}
      activeOpacity={0.75}
      disabled={isLoading}
    >
      <Text style={{ ...styles.label, ...defaultStyle.body }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultColors.primary,
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },

  label: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
