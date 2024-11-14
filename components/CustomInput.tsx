import { StyleSheet, TextInput } from "react-native";
import React from "react";

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
    backgroundColor: "rgb(218, 220, 224)",
  },
});
