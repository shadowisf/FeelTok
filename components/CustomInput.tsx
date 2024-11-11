import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { defaultColors } from "@/constants/defaultStuff";

type CustomInputProps = {
  label: string;
  value?: string;
  handleChange?: (e: string) => void;
  secureText?: boolean;
};

export default function CustomInput({
  label,
  value,
  handleChange,
  secureText,
}: CustomInputProps) {
  return (
    <TextInput
      style={styles.inputField}
      value={value}
      onChangeText={handleChange}
      secureTextEntry={secureText ? true : false}
      autoCapitalize="none"
      placeholder={label}
    />
  );
}

const styles = StyleSheet.create({
  inputField: {
    padding: 15, // Padding for better alignment
    borderRadius: 3, // Reduced radius for a tighter look
    color: "black",
    borderColor: defaultColors.primary,
    borderWidth: 1,
  },
});
