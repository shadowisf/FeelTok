import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { sendOtp, verifyOtp, verifyUser } from "@/constants/firebase";
import auth from "@react-native-firebase/auth";
import Dialog from "react-native-dialog";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [isSignInDisabled, setIsSignInDisabled] = useState(true);
  const [isOtpConfirmDisabled, setIsOtpConfirmDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isOtpVisible, setIsOtpVisible] = useState(false);

  useEffect(() => {
    function checkFields() {
      const numbers = /^[0-9]+$/;

      if (email && password) {
        setIsSignInDisabled(false);
      } else {
        setIsSignInDisabled(true);
      }

      if (otp && numbers.test(otp)) {
        setIsOtpConfirmDisabled(false);
      } else {
        setIsOtpConfirmDisabled(true);
      }
    }

    checkFields();
  }, [email, password, otp]);

  function clearSomeFields() {
    setPassword("");
    setOtp("");
  }

  function clearAllFields() {
    setEmail("");
    setPassword("");
    setOtp("");
  }

  function handleOtpCancel() {
    clearSomeFields();

    setIsOtpVisible(false);
    setIsLoading(false);
    setIsSignInDisabled(false);
  }

  async function handleOtpConfirm() {
    const currentUser = auth().currentUser;

    if (currentUser) {
      const result = await verifyOtp({ otp, currentUser });

      if (result === "ok") {
        router.replace("/home");
        clearAllFields();
      } else {
        setIsOtpVisible(false);
        clearSomeFields();
      }
    }

    setIsLoading(false);
    setIsSignInDisabled(false);
  }

  async function handleSignIn() {
    setIsLoading(true);
    setIsSignInDisabled(false);

    const userResult = await verifyUser({ email, password });
    const currentUser = auth().currentUser;

    if (userResult === "ok" && currentUser) {
      const otpResult = await sendOtp(currentUser);

      if (otpResult === "ok") {
        setIsOtpVisible(true);
      }
    }

    setIsLoading(false);
    setIsSignInDisabled(false);
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
          <View
            style={{
              ...defaultStyle.container,
              ...styles.screenContainer,
              pointerEvents: isLoading ? "none" : "auto",
            }}
          >
            <View style={styles.headerContainer}>
              <Text style={{ ...defaultStyle.h1, ...styles.header }}>
                Welcome back!
              </Text>

              <Text style={{ ...defaultStyle.h5, ...styles.subHeader }}>
                Sign-in to FeelTok
              </Text>
            </View>

            <View style={styles.inputContainer}>
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

            <View style={styles.buttonContainer}>
              <CustomButton
                label={"Sign In"}
                handlePress={handleSignIn}
                isLoading={isLoading}
                isDisabled={isSignInDisabled}
                color={defaultColors.primary}
              />

              <Text style={{ ...defaultStyle.body, ...styles.bottomText }}>
                Don't have an account?{" "}
                <Link replace style={styles.signUpLink} href="/signUp">
                  Sign-up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Dialog.Container visible={isOtpVisible}>
        <Dialog.Title>Two-Factor Authentication</Dialog.Title>
        <Dialog.Description>
          Enter the OTP sent to your email to sign-in.
        </Dialog.Description>
        <Dialog.Input
          placeholder="One-time password"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        <Dialog.Button label="Cancel" onPress={handleOtpCancel} />
        <Dialog.Button
          disabled={isOtpConfirmDisabled}
          label="Confirm"
          onPress={handleOtpConfirm}
        />
      </Dialog.Container>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    gap: 50,
    paddingTop: 25,
    paddingBottom: 25,
  },

  headerContainer: {
    gap: 15,
  },

  inputContainer: {
    gap: 15,
  },

  buttonContainer: {
    gap: 15,
  },

  header: {
    fontWeight: "bold",
    color: defaultColors.primary,
  },

  subHeader: {
    fontWeight: "bold",
  },

  bottomText: {
    textAlign: "center",
  },

  signUpLink: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },
});
