import { StyleSheet } from "react-native";

export const defaultIcons = {
  home: require("../assets/icons/home.png"),
  homeFill: require("../assets/icons/homeFill.png"),
  create: require("../assets/icons/create.png"),
  createFill: require("../assets/icons/createFill.png"),
  profile: require("../assets/icons/profile.png"),
  profileFill: require("../assets/icons/profileFill.png"),
  arrowLeft: require("../assets/icons/arrowLeft.png"),
  settings: require("../assets/icons/settings.png"),
};

export const defaultImages = {
  background: require("../assets/images/background.png"),
};

export const defaultColors = {
  primary: "#883AE1",
};

export const defaultStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    height: "100%",
    paddingLeft: 25,
    paddingRight: 25,
  },

  scrollContainer: {
    height: "100%",
  },

  h1: {
    fontSize: 48,
  },

  h2: {
    fontSize: 38,
  },

  h3: {
    fontSize: 30,
  },

  h4: {
    fontSize: 24,
  },

  h5: {
    fontSize: 20,
  },

  h6: {
    fontSize: 18,
  },

  body: {
    fontSize: 16,
  },
});
