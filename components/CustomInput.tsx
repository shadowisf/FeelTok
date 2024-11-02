import { StyleSheet, Text, TextInput, View } from "react-native";
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
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={secureText ? true : false}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },

  inputField: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 15,
    color: "black",
  },
});
