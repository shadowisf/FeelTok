import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function imagePicker() {
  try {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      console.log("imagePicker error: permission denied");

      Alert.alert(
        "Permission Denied",
        "FeelTok requires permission to access your gallery to upload a profile picture."
      );

      return;
    }

    let popup = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!popup.canceled) {
      return popup.assets[0].uri;
    }
  } catch (error) {
    console.log("imagePicker error:" + error);

    Alert.alert(
      "Error",
      "Something went wrong. Please try again.\n\nError code: " + error
    );
  }
}
