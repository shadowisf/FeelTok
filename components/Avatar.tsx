import { StyleSheet } from "react-native";
import { Image } from "react-native";

type AvatarProps = {
  source: string;
};

export default function Avatar({ source }: AvatarProps) {
  const image = require("../assets/images/default-profile.jpg");

  return (
    <Image
      source={source === "default" ? image : { uri: source }}
      resizeMode="contain"
      style={styles.avatar}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
