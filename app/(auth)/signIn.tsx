import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import {
  defaultColors,
  defaultIcons,
  defaultStyle,
} from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { verifyUser } from "@/constants/userCRUD";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { googleSignIn } from "@/constants/googleAuth";
import SocialAuthButton from "@/components/SocialAuthButton";
import {
  deleteOtp,
  verifyOtp,
  sendOtp,
  checkOtp,
} from "@/constants/twoFactorAuth";
import OtpScreen from "./otp";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [isDisabled, SetIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [isOtp, setIsOtp] = useState(false);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  let content;

  useEffect(() => {
    function checkEmailAndPasswordFields() {
      // checks if email and password are not empty
      if (email && password) {
        SetIsDisabled(false);
      } else {
        SetIsDisabled(true);
      }
    }

    checkEmailAndPasswordFields();
    // every time email, password, and otp change; execute checkEmailAndPasswordFields()
  }, [email, password]);

  useEffect(() => {
    function checkOtpField() {
      // regex for numbers 0-9
      const numbers = /^[0-9]+$/;

      // checks if otp is not empty, is numbers and has length of 6
      if (otp && numbers.test(otp) && otp.length === 6) {
        SetIsDisabled(false);
      } else {
        SetIsDisabled(true);
      }
    }

    checkOtpField();
  }, [otp]);

  function clearImportantFields() {
    setPassword("");
    setOtp("");
  }

  function clearAllFields() {
    setEmail("");
    setPassword("");
    setOtp("");
  }

  async function handleOtpCancel() {
    clearImportantFields();
    setIsOtp(false);

    // deletes otp in firestore if user cancels
    await deleteOtp(firebaseUser);
  }

  async function handleOtpConfirm() {
    setIsLoading(true);

    // execute otp verification
    const verifyOtpResult = await verifyOtp({ otp, firebaseUser });

    // if otp is verified, redirect to home
    if (verifyOtpResult === "ok") {
      clearAllFields();
      router.replace("/home");
    } else {
      setIsOtp(false);
      clearImportantFields();

      Alert.alert("Oops!", "Incorrect OTP. Please try again.");
    }

    setIsLoading(false);
  }

  async function handleSignIn() {
    setIsLoading(true);

    // execute sign-in verification via email and password
    const verifyUserResult = await verifyUser({
      email,
      password,
    });

    if (verifyUserResult) {
      // if sign-in is successful, check if otp is enabled
      const checkOtpResult = await checkOtp(verifyUserResult);

      // if otp is enabled, send otp
      if (checkOtpResult === true) {
        const sendOtpResult = await sendOtp(verifyUserResult);

        // if otp is sent, redirect to otp screen
        if (sendOtpResult === "ok") {
          SetIsDisabled(true);
          setIsOtp(true);
        }
      }

      // if otp is disabled, redirect to home
      if (checkOtpResult === false) {
        router.replace("/home");
      }
    }

    setIsLoading(false);
  }

  async function handleContinueWithGoogle() {
    setIsGoogleLoading(true);

    // executes google sign-in popup
    const googleSignInResult = await googleSignIn();

    if (googleSignInResult) {
      // if google sign-in is successful, check if otp is enabled
      const checkOtpResult = await checkOtp(googleSignInResult);

      // if otp is enabled, send otp
      if (checkOtpResult === true) {
        const sendOtpResult = await sendOtp(googleSignInResult);

        // if otp is sent, redirect to otp screen
        if (sendOtpResult === "ok") {
          SetIsDisabled(true);
          setIsOtp(true);
        }
      }

      // if otp is disabled, redirect to home
      if (checkOtpResult === false) {
        router.replace("/home");
      }
    }

    setIsGoogleLoading(false);
  }

  // otp screen
  if (isOtp) {
    content = (
      <OtpScreen
        otp={otp}
        setOtp={setOtp}
        isDisabled={isDisabled}
        isLoading={isLoading}
        handleOtpConfirm={handleOtpConfirm}
        handleOtpCancel={handleOtpCancel}
      />
    );
  }

  // sign-in screen
  if (!isOtp) {
    content = (
      <>
        <View style={{ gap: 15 }}>
          <Text style={[defaultStyle.h1, styles.header]}>Welcome back!</Text>

          <Text style={[defaultStyle.h5, { fontWeight: "bold" }]}>
            Sign-in to FeelTok
          </Text>
        </View>

        <View style={{ gap: 15 }}>
          <CustomInput
            value={email}
            handleChange={setEmail}
            label={"Email"}
            secureText={false}
          />

          <CustomInput
            value={password}
            handleChange={setPassword}
            label={"Password"}
            secureText={true}
          />
        </View>

        <View style={{ gap: 15 }}>
          <CustomButton
            label={"Sign In"}
            handlePress={handleSignIn}
            isLoading={isLoading}
            isDisabled={isDisabled}
            color={defaultColors.primary}
          />

          <Text style={[defaultStyle.body, { textAlign: "center" }]}>
            New to FeelTok?{" "}
            <Link replace style={styles.signUpLink} href="/signUp">
              Sign-up
            </Link>
          </Text>
        </View>

        <View>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>
          <SocialAuthButton
            label="Continue with Google"
            icon={defaultIcons.google}
            handlePress={handleContinueWithGoogle}
            isLoading={isGoogleLoading}
          />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View
          style={[
            defaultStyle.container,
            styles.screenContainer,
            {
              pointerEvents: isLoading || isGoogleLoading ? "none" : "auto",
            },
          ]}
        >
          {content}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    gap: 50,
    paddingTop: 25,
    paddingBottom: 25,
  },

  header: {
    fontWeight: "bold",
    color: defaultColors.primary,
  },

  signUpLink: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: defaultColors.secondary,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  orText: {
    color: "gray",
    textAlign: "center",
  },
});
