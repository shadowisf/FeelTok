import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, {
  FirebaseAuthTypes,
  updateProfile,
} from "@react-native-firebase/auth";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

export async function googleSignIn() {
  GoogleSignin.configure({
    webClientId:
      "1071064634777-379l502bp0sk52sq0affujco4dko1dne.apps.googleusercontent.com",
  });

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;

    if (idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const result = await auth().signInWithCredential(googleCredential);
      const currentGoogleUser = GoogleSignin.getCurrentUser()?.user;

      if (result.user && currentGoogleUser?.name && currentGoogleUser?.id) {
        const createResponse = await googleCreateUser({
          firebaseUser: result.user,
          fullName: currentGoogleUser?.name,
          username: currentGoogleUser?.id,
        });

        if (createResponse === "ok") {
          console.log(
            googleSignIn.name,
            "|",
            "google user verified successfully"
          );
          return result.user;
        }
      }
    }
  } catch (error) {
    console.error(googleSignIn.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

type googleCreateUserProps = {
  username: string;
  firebaseUser: FirebaseAuthTypes.User;
  fullName: string;
};

export async function googleCreateUser({
  firebaseUser,
  fullName,
  username,
}: googleCreateUserProps) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();
    const defaultBio = `FeelTok user since ${new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
      }
    )}`;
    const defaultGender = "Prefer not to say";

    if (!docSnap.exists) {
      await userDoc.set({
        fullName: fullName,
        email: firebaseUser.email,
        username: username,
        profilePicture: firebaseUser.photoURL,
        otpStatus: false,
        bio: defaultBio,
        gender: defaultGender,
        userSince: firestore.FieldValue.serverTimestamp(),
      });

      await updateProfile(firebaseUser, {
        displayName: username,
      });

      console.log(googleCreateUser.name, "|", "new google user created");
    } else {
      console.log(googleCreateUser.name, "|", "google user already exists");
    }

    return "ok";
  } catch (error) {
    console.error(googleCreateUser.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}
