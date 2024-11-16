import {
  FirebaseAuthTypes,
  sendEmailVerification,
  updateProfile,
} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { send } from "@emailjs/react-native";
import emailjs from "@emailjs/react-native";

const EMAILJS_PUBLIC_KEY = "IQK6m6KVn2GfsEzlU";
const EMAILJS_PRIVATE_KEY = "MZc7VCeBQV5k_mEgzGLhx";
const EMAILJS_SERVICE_ID = "service_i5hx7rb";
const EMAILJS_TEMPLATE_ID = "template_rac60ac";

type verifyUserProps = {
  email: string;
  password: string;
};

export async function verifyUser({ email, password }: verifyUserProps) {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);

    // uncomment "result.user.emailVerified" if project is finalized
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

export async function sendOtp(currentUser: FirebaseAuthTypes.User) {
  try {
    const userDoc = firestore().collection("users").doc(currentUser.uid);
    const docSnap = await userDoc.get();
    let otp = "";

    if (docSnap.exists) {
      otp = Math.floor(Math.random() * 1000000).toString();
    }

    await userDoc.update({
      otp: otp,
    });

    // uncomment this method if project is finalized
    /* await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        otp: otp,
        to_name: currentUser.displayName,
        to_email: currentUser.email,
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    ); */

    return "ok";
  } catch (error: Error | any) {
    console.log("sendOTP error: " + error.code);
  }
}

type verifyOtpProps = {
  otp: string;
  currentUser: FirebaseAuthTypes.User;
};

export async function verifyOtp({ otp, currentUser }: verifyOtpProps) {
  try {
    const userDoc = firestore().collection("users").doc(currentUser.uid);
    const docSnap = await userDoc.get();

    if (docSnap.exists && docSnap.data()?.otp === otp) {
      return "ok";
    } else {
      Alert.alert("Oops!", "Incorrect OTP. Please try again.");
    }
  } catch (error: Error | any) {
    console.log("verifyOtp error: " + error.code);

    Alert.alert(
      "Oops!",
      "Something went wrong. Please try again.\n\n Error code: " + error.code
    );
  }
}

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
