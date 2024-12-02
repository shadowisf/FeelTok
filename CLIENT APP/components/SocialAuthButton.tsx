import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { defaultStyle } from "@/constants/defaultStuff";

type CustomButtonWithIconProps = {
  label: string;
  handlePress: () => void;
  icon: any;
  isLoading: boolean;
};

export default function SocialAuthButton({
  label,
  handlePress,
  icon,
  isLoading,
}: CustomButtonWithIconProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, styles.content]}
    >
      {isLoading ? (
        // if isLoading is true, show ActivityIndicator
        <ActivityIndicator color={"black"} />
      ) : (
        <>
          <Image source={icon} style={styles.logo} />
          <Text style={[{ fontWeight: "bold" }, defaultStyle.body]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#F2F2F2",
    borderColor: "#ccc",
    borderWidth: 1,
  },

  content: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  logo: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
