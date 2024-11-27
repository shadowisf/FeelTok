import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const EMAILJS_PUBLIC_KEY = "IQK6m6KVn2GfsEzlU";
const EMAILJS_PRIVATE_KEY = "MZc7VCeBQV5k_mEgzGLhx";
const EMAILJS_SERVICE_ID = "service_i5hx7rb";
const EMAILJS_TEMPLATE_ID = "template_rac60ac";

type checkOtpProps = {
  firebaseUser: FirebaseAuthTypes.User;
};

export async function checkOtp({ firebaseUser }: checkOtpProps) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();

    if (docSnap.exists) {
      console.log(checkOtp.name, "|", "user's otp status found");

      return docSnap.data()?.otpStatus;
    }
  } catch (error) {
    console.log(checkOtp.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

type sendOtpProps = {
  firebaseUser: FirebaseAuthTypes.User;
};

export async function sendOtp({ firebaseUser }: sendOtpProps) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();
    let otp = "";

    if (docSnap.exists) {
      // generates a random 6 digit number
      otp = Math.floor(100000 + Math.random() * 900000).toString();
    } else {
      console.error(sendOtp.name, "|", "no document found");
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
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();

    // uncomment "otp === 123456" if project is finalized
    if ((docSnap.exists && docSnap.data()?.otp === otp) || otp === "123456") {
      console.log(verifyOtp.name, "|", "OTP verified");
      return "ok";
    } else {
      console.error(verifyOtp.name, "|", "incorrect OTP");
    }
  } catch (error) {
    console.error(verifyOtp.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  } finally {
    await deleteOtp({ firebaseUser });
  }
}

type deleteOtpProps = {
  firebaseUser: FirebaseAuthTypes.User;
};

export async function deleteOtp({ firebaseUser }: deleteOtpProps) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();

    if (docSnap.exists) {
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
