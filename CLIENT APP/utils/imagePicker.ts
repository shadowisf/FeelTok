import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function runImagePicker(
  aspectRatioWidth: number,
  aspectRatioHeight: number
) {
  try {
    // execute ask gallery permission to user
    const galleryPermissionResult = await askMediaPermission();

    if (galleryPermissionResult === "ok") {
      // if permission is granted, execute image picker
      const popup = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [aspectRatioWidth, aspectRatioHeight],
        quality: 1,
      });

      if (!popup.canceled) {
        // if image is selected, return uri

        console.log(runImagePicker.name, "|", "image selected");
        return popup.assets[0].uri;
      }
    }
  } catch (error) {
    console.error(runImagePicker.name, "|", error);
    Alert.alert("Error", "Something went wrong. Please try again.\n\n" + error);
  }
}

export async function askMediaPermission() {
  try {
    // execute ask gallery permission to user
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      // if permission is granted
      console.log(askMediaPermission.name, "|", "gallery permission granted");

      return "ok";
    } else {
      // if permission is denied
      console.error("imagePicker error: permission denied");
      Alert.alert(
        "Permission Denied",
        "FeelTok requires permission to access your gallery to upload a profile picture."
      );
    }
  } catch (error) {
    console.error(askMediaPermission.name, "|", error);
  }
}
