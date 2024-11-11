import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { defaultStyle } from "@/constants/defaultStuff";

type CustomButtonProps = {
  label: React.ReactNode;
  handlePress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  additionalStyles?: {};
  color: string;
};

export default function CustomButton({
  label,
  handlePress,
  isDisabled,
  isLoading,
  color,
  additionalStyles,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        opacity: isDisabled ? 0.25 : 1,
        ...additionalStyles,
        backgroundColor: color,
      }}
      onPress={handlePress}
      activeOpacity={0.75}
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text style={{ ...styles.label, ...defaultStyle.body }}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 15,
  },

  label: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
