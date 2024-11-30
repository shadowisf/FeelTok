import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";

type FeelingProps = {
  currentFeeling: string;
  feeling: string;
  setFeeling: (feeling: string) => void;
  emoji: string;
};

export default function Feeling({
  currentFeeling,
  feeling,
  setFeeling,
  emoji,
}: FeelingProps) {
  return (
    <TouchableOpacity
      style={[
        styles.feeling,
        {
          backgroundColor:
            currentFeeling === feeling
              ? defaultColors.primary
              : defaultColors.secondary,
        },
      ]}
      onPress={() => setFeeling(feeling)}
      activeOpacity={1}
    >
      <Text style={defaultStyle.h3}>{emoji}</Text>
      <Text
        style={[
          {
            fontSize: 11,
            color: currentFeeling === feeling ? "white" : "black",
          },
        ]}
      >
        {feeling}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  feeling: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    minWidth: 75,
    width: "auto",
    height: 75,
    borderRadius: 10,
    flex: 1,
  },
});
