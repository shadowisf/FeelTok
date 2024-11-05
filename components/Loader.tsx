import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoaderProps = {
  isVisible: boolean;
};

export default function Loader({ isVisible }: LoaderProps) {
  if (isVisible)
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size={"large"} />
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
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  innerContainer: {
    width: 150,
    height: 150,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
