import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomerButton";

import { signInWithEmailAndPassword } from "@firebase/auth";
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
        alert("ok");
      }
    } catch (error) {
      alert("error");
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.container }}>
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
});
