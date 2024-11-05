import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { authenticateUser } from "@/constants/firebase";
import { StatusBar } from "expo-status-bar";
import Loader from "@/components/Loader";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkFields();
  }, [email, password]);

  function checkFields() {
    if (email && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function clearFields() {
    setEmail("");
    setPassword("");
  }

  async function handleSignIn() {
    setIsLoading(true);
    setIsDisabled(true);

    const result = await authenticateUser({ email, password });

    if (result === "ok") {
      clearFields();
      router.replace("/home");
    }

    setIsLoading(false);
    setIsDisabled(false);
  }

  return (
    <SafeAreaView>
      <Loader isVisible={isLoading} />
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.container }}>
          <StatusBar style={"auto"} />

          <Text style={{ ...defaultStyle.h1, ...styles.feeltok }}>
            FeelTok!
          </Text>

          <Text style={{ ...defaultStyle.h5, ...styles.header }}>
            Sign-in to FeelTok
          </Text>

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

          <CustomButton
            label={"Sign In"}
            handlePress={() => {
              handleSignIn();
            }}
            isDisabled={isDisabled}
          />

          <Text style={{ ...defaultStyle.body, ...styles.bottomText }}>
            Don't have an account?{" "}
            <Link replace style={styles.signup} href="/signUp">
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
  },

  feeltok: {
    fontWeight: "bold",
    color: defaultColors.primary,
  },

  header: {
    fontWeight: "bold",
  },

  signup: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },

  bottomText: {
    textAlign: "center",
  },
});
