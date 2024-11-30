import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { defaultColors } from "@/constants/defaultStuff";

type CustomInputProps = {
  label?: string;
  value?: string;
  handleChange?: (e: string) => void;
  secureText?: boolean;
  additionalStyles?: {};
  isDisabled?: boolean;
  headerText?: string;
  numberOfLines?: number;
};

export default function CustomInput({
  label,
  value,
  handleChange,
  secureText,
  additionalStyles,
  isDisabled,
  headerText,
  numberOfLines,
}: CustomInputProps) {
  if (headerText) {
    return (
      <View style={styles.inputContainer}>
        <Text style={{ width: 100 }}>{headerText}</Text>
        <TextInput
          style={[
            styles.inputField,
            additionalStyles,
            {
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={secureText}
          autoCapitalize="none"
          placeholder={label}
          multiline={numberOfLines ? true : false}
          numberOfLines={numberOfLines}
        />
      </View>
    );
  }

  if (!headerText) {
    return (
      <TextInput
        style={[
          styles.inputField,
          additionalStyles,
          {
            pointerEvents: isDisabled ? "none" : "auto",
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={secureText}
        autoCapitalize="none"
        placeholder={label}
        multiline={numberOfLines ? true : false}
        numberOfLines={numberOfLines}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    padding: 15, // Padding for better alignment
    borderRadius: 3, // Reduced radius for a tighter look
    color: "black",
    backgroundColor: defaultColors.secondary,
    flex: 1,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
