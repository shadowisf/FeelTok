import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomerButton";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Link, router } from "expo-router";
import { auth } from "@/constants/firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (credential.user) {
        router.push("/home");
      }
    } catch (error) {
      Alert.alert("Error", "Incorrect credentials. Please try again.");
    }
    setIsSubmitting(false);
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.container }}>
          <StatusBar barStyle={"dark-content"} />

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
            label={"Sign in"}
            handlePress={() => {
              handleSubmit();
            }}
            isLoading={isSubmitting}
          />

          <Text style={{ ...defaultStyle.body, ...styles.bottomText }}>
            Don't have an account?{" "}
            <Link style={styles.signup} href="/signUp">
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
    justifyContent: "center",
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
