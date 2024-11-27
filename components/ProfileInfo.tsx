import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { defaultStyle } from "@/constants/defaultStuff";

type ProfileInfoProps = {
  type: string;
  header: string;
  value: string;
  imageKey?: number;
};

export default function ProfileInfo({
  imageKey,
  type,
  header,
  value,
}: ProfileInfoProps) {
  let component;

  if (type === "avatar") {
    component = (
      <Avatar type="display" key={imageKey} source={value} size={100} />
    );
  }

  if (type === "text") {
    component = <Text style={defaultStyle.h6}>{value}</Text>;
  }

  return (
    <View style={styles.individualInfoContainer}>
      <Text style={[defaultStyle.h6, { fontWeight: "bold" }]}>{header}</Text>
      {component}
    </View>
  );
}

const styles = StyleSheet.create({
  individualInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "rgb(218, 220, 224)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: "wrap",
  },
});
