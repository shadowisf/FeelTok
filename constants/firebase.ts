import { FirebaseError, initializeApp } from "@firebase/app";
import {
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  User,
} from "@firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";
import { Alert } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  apiKey: "AIzaSyBchBa1_Cs5HoARMfUoUtNma5i9QMBUcFU",
  authDomain: "feeltok-9a12f.firebaseapp.com",
  projectId: "feeltok-9a12f",
  storageBucket: "feeltok-9a12f.appspot.com",
  messagingSenderId: "1071064634777",
  appId: "1:1071064634777:web:22de30e2ca0958bffe2f08",
};

export const firebase = initializeApp(config);
export const firestore = getFirestore(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

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
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = doc(firestore, "users", credential.user.uid);

    await sendEmailVerification(credential.user);

    await updateProfile(credential.user, {
      displayName: username,
      photoURL: profilePicture,
    });

    await setDoc(docRef, {
      fullName: fullName,
      email: credential.user.email,
      userName: username,
      profilePicture: profilePicture,
    });

    return "ok";
  } catch (error) {
    const errorCode = (error as FirebaseError).code;

    console.log("createUser error:" + errorCode);

    Alert.alert(
      "Error",
      "Something went wrong. Please try again.\n\nError code: " + errorCode
    );
  }
}

type verifyUserProps = {
  email: string;
  password: string;
};

export async function verifyUser({ email, password }: verifyUserProps) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    // commenting "result.user.emailVerified" for devs to login without verifying email. uncomment if project is finalized.
    if (result.user /* && result.user.emailVerified */) {
      return "ok";
    } else {
      Alert.alert(
        "Verification Required",
        "Verify your account via the link sent to your email."
      );
    }
  } catch (error) {
    const errorCode = (error as FirebaseError).code;

    console.log("authenticateUser error:" + errorCode);

    Alert.alert(
      "Error",
      "Something went wrong. Please try again.\n\nError code: " + errorCode
    );
  }
}

export async function readUser(currentUser: User) {
  try {
    const docRef = doc(firestore, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (
      docSnap.exists() &&
      currentUser.email &&
      currentUser.displayName &&
      currentUser.photoURL
    ) {
      const fullName = docSnap.data().fullName;
      const email = currentUser.email;
      const userName = currentUser.displayName;
      const profilePicture = currentUser.photoURL;

      return { email, fullName, userName, profilePicture };
    } else {
      console.log("getUserInfo error: no document found");
    }
  } catch (error) {
    const errorCode = (error as FirebaseError).code;

    console.log("getUserInfo error:" + errorCode);

    Alert.alert(
      "Error",
      "Something went wrong. Please try again.\n\nError code: " + errorCode
    );
  }
}
