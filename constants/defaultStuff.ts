import { StyleSheet } from "react-native";

// delay function
export async function delay(seconds: number) {
  await new Promise((resolve) => setTimeout(resolve, seconds));
}

// icons to be used in project
export const defaultIcons = {
  home: require("../assets/icons/home.png"),
  homeFill: require("../assets/icons/homeFill.png"),
  create: require("../assets/icons/create.png"),
  createFill: require("../assets/icons/createFill.png"),
  profile: require("../assets/icons/profile.png"),
  profileFill: require("../assets/icons/profileFill.png"),
  arrowLeft: require("../assets/icons/arrowLeft.png"),
  settings: require("../assets/icons/settings.png"),
  google: require("../assets/icons/google.png"),
  addFill: require("../assets/icons/addFill.png"),
  imageAdd: require("../assets/icons/imageAdd.png"),
  folderClose: require("../assets/icons/folderClose.png"),
  logo: require("../assets/icons/logo.png"),
  more: require("../assets/icons/more.png"),
};

// images to be used in project
export const defaultImages = {
  defaultProfile: require("../assets/images/default-profile.jpeg"),
};

// colors to be used in project
export const defaultColors = {
  primary: "#883AE1",
  secondary: "rgb(218, 220, 224)",
};

// default styles to be used in project
export const defaultStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
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
