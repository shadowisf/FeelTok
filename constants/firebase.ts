import {
  FirebaseAuthTypes,
  sendEmailVerification,
  updateProfile,
} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

type createUserProps = {
  email: string;
  password: string;
  fullName: string;
  username: string;
  profilePicture: string;
};

export async function createUser({
  email,
  password,
  fullName,
  username,
  profilePicture,
}: createUserProps) {
  try {
    const credential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    const userDoc = firestore().collection("users").doc(credential.user.uid);

    await sendEmailVerification(credential.user);

    await updateProfile(credential.user, {
      displayName: username,
      photoURL: profilePicture,
    });

    await userDoc.set({
      fullName: fullName,
      email: credential.user.email,
      userName: username,
      profilePicture: profilePicture,
    });

    return "ok";
  } catch (error: Error | any) {
    console.log("verifyUser error:" + error.code);

    Alert.alert(
      "Oops!",
      "Something went wrong. Please try again.\n\n Error code: " + error.code
    );
  }
}

type verifyUserProps = {
  email: string;
  password: string;
};

export async function verifyUser({ email, password }: verifyUserProps) {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);

    // commenting "result.user.emailVerified" for devs to login without verifying email. uncomment if project is finalized.
    if (result.user /* && result.user.emailVerified */) {
      return "ok";
    } else {
      Alert.alert(
        "Verification Required",
        "Verify your account via the link sent to your email."
      );
    }
  } catch (error: Error | any) {
    console.log("verifyUser error:" + error.code);

    Alert.alert(
      "Oops!",
      "Something went wrong. Please try again.\n\n Error code: " + error.code
    );
  }
}

export async function readUser(currentUser: FirebaseAuthTypes.User) {
  try {
    const userDoc = firestore().collection("users").doc(currentUser.uid);
    const docSnap = await userDoc.get();

    if (
      docSnap.exists &&
      currentUser.email &&
      currentUser.displayName &&
      currentUser.photoURL
    ) {
      const fullName = docSnap.data()?.fullName;
      const email = currentUser.email;
      const userName = currentUser.displayName;
      const profilePicture = currentUser.photoURL;

      return { email, fullName, userName, profilePicture };
    } else {
      console.log("readUser error: no document found");
    }
  } catch (error: Error | any) {
    console.log("verifyUser error:" + error.code);

    Alert.alert(
      "Oops!",
      "Something went wrong. Please try again.\n\n Error code: " + error.code
    );
  }
}
