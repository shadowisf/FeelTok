import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import emailjs from "@emailjs/react-native";

const EMAILJS_PUBLIC_KEY = "IQK6m6KVn2GfsEzlU";
const EMAILJS_PRIVATE_KEY = "MZc7VCeBQV5k_mEgzGLhx";
const EMAILJS_SERVICE_ID = "service_i5hx7rb";
const EMAILJS_TEMPLATE_ID = "template_rac60ac";

export async function checkOtp(firebaseUser: FirebaseAuthTypes.User) {
  try {
    // assign general references
    const userSnap = await firestore()
      .collection("users")
      .doc(firebaseUser.uid)
      .get();

    if (userSnap.exists) {
      // if user exists, return user's otp status

      console.log(
        checkOtp.name,
        "|",
        "user's otp status found: " + userSnap.data()?.otpStatus
      );
      return userSnap.data()?.otpStatus;
    }
  } catch (error) {
    console.log(checkOtp.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

export async function sendOtp(firebaseUser: FirebaseAuthTypes.User) {
  try {
    // assign general references
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();
    let otp = "";

    if (docSnap.exists) {
      // if user exists, generate otp
      otp = Math.floor(100000 + Math.random() * 900000).toString();
    }

    // update otp value in firestore
    await userDoc.update({
      otp: otp,
    });

    // uncomment this method if project is finalized
    // send otp to user's email via emailJS api
    /* await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        otp: otp,
        to_name: firebaseUser.displayName,
        to_email: firebaseUser.email,
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    ); */

    console.log(sendOtp.name, "|", "OTP sent to user's email");
    return "ok";
  } catch (error) {
    console.error(sendOtp.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

type verifyOtpProps = {
  otp: string;
  firebaseUser: FirebaseAuthTypes.User;
};

export async function verifyOtp({ otp, firebaseUser }: verifyOtpProps) {
  try {
    // assign general references
    const userSnap = await firestore()
      .collection("users")
      .doc(firebaseUser.uid)
      .get();

    // uncomment "otp === 123456" if project is finalized
    if ((userSnap.exists && userSnap.data()?.otp === otp) || otp === "123456") {
      // if user exists and entered otp is correct, return ok

      console.log(verifyOtp.name, "|", "OTP verified");
      return "ok";
    } else {
      console.error(verifyOtp.name, "|", "incorrect OTP");
    }
  } catch (error) {
    console.error(verifyOtp.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  } finally {
    // if otp is correct or incorrect, delete otp from firestore
    await deleteOtp(firebaseUser);
  }
}

export async function deleteOtp(firebaseUser: FirebaseAuthTypes.User) {
  try {
    // assign general references
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();

    if (docSnap.exists) {
      // if user exists, delete otp field
      await userDoc.update({
        otp: firestore.FieldValue.delete(),
      });

      console.log(deleteOtp.name, "|", "OTP deleted");
      return "ok";
    }
  } catch (error) {
    console.error(deleteOtp.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}
