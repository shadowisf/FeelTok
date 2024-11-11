import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { verifyUser } from "@/constants/firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function checkFields() {
      if (email && password) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkFields();
  }, [email, password]);

  function clearFields() {
    setEmail("");
    setPassword("");
  }

  async function handleSignIn() {
    setIsLoading(true);
    setIsDisabled(false);

    const result = await verifyUser({ email, password });

    if (result === "ok") {
      clearFields();
      router.replace("/home");
    }

    setIsLoading(false);
    setIsDisabled(false);
  }

  return (
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
              handleChange={(e) => {
                setEmail(e);
              }}
              label={"Email"}
              secureText={false}
            />

            <CustomInput
              value={password}
              handleChange={(e) => {
                setPassword(e);
              }}
              label={"Password"}
              secureText={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              label={"Sign In"}
              handlePress={handleSignIn}
              isLoading={isLoading}
              isDisabled={isDisabled}
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
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    gap: 50,
    paddingTop: 25,
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
