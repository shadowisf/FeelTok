import { defaultColors } from "@/constants/defaultStuff";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoaderProps = {
  isVisible: boolean;
};

export default function Loader({ isVisible }: LoaderProps) {
  if (isVisible)
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      </View>
    );
  else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  innerContainer: {
    width: 125,
    height: 125,
    backgroundColor: defaultColors.secondary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
