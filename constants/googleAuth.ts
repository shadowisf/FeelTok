import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, {
  FirebaseAuthTypes,
  updateProfile,
} from "@react-native-firebase/auth";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

export async function googleSignIn() {
  const webClientID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID as string;

  // web client id from firebase authentication
  GoogleSignin.configure({
    webClientId: webClientID,
  });

  try {
    // check if play services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // execute google sign in
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;

    if (idToken) {
      // if idToken exists, assign idToken to credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // execute firebase sign in using google credential
      const result = await auth().signInWithCredential(googleCredential);

      // get current google user details
      const currentGoogleUser = GoogleSignin.getCurrentUser()?.user;

      if (result.user && currentGoogleUser?.name && currentGoogleUser?.id) {
        // if user is signed in, execute create user function with user details
        const createResponse = await googleCreateUser({
          firebaseUser: result.user,
          fullName: currentGoogleUser?.name,
          username: currentGoogleUser?.id,
        });

        if (createResponse === "ok") {
          // if create user is successful, return the user object
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
    // assign general references
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
      // if user does not exist, create new user in firestore
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

      // update user display name in authentication
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
