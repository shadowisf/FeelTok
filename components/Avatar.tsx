import { Image } from "react-native";

type AvatarProps = {
  source: string;
  size: number;
};

export default function Avatar({ source, size }: AvatarProps) {
  const image = require("../assets/images/default-profile.jpg");

  return (
    <Image
      source={source === "default" ? image : { uri: source }}
      resizeMode="contain"
      style={{ width: size, height: size, borderRadius: size / 4 }}
    />
  );
}
