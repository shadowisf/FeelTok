import { initializeApp } from "@firebase/app";
import {
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
} from "@firebase/auth";
import { doc, getDoc, getFirestore } from "@firebase/firestore";
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

type userProps = {
  email: string;
  password: string;
  fullName?: string;
  userName?: string;
  profilePicture?: string;
};

export async function authenticateUser({ email, password }: userProps) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    if (credential.user) {
      return "ok";
    }
  } catch (error) {
    Alert.alert("Error", "Incorrect credentials. Please try again.");
  }
}

export async function getUserInfo() {
  let email, fullName, userName, profilePicture;

  if (auth.currentUser) {
    const uid = auth.currentUser.uid;

    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        email = auth.currentUser.email;
        fullName = docSnap.data().fullName;
        userName = auth.currentUser.displayName;
        profilePicture = auth.currentUser.photoURL;

        return { email, fullName, userName, profilePicture };
      } else {
        console.log("no such document!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
