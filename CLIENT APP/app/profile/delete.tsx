import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { defaultStyle, defaultColors, delay } from "@/constants/defaultStuff";
import { readUser, killEmAll } from "@/utils/userCRUD";
import { router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function DeleteProfile() {
  const [emailReEnter, setEmailReEnter] = useState("");
  const [password, setPassword] = useState("");
  const [provider, setProvider] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  useEffect(() => {
    async function onRefresh() {
      // execute readUser function of currentUser
      const data = await readUser({ firebaseUser });

      if (data) {
        // if data exists, assign provider to states
        setProvider(data.provider);
      }

      await delay(500);
    }

    onRefresh();
  }, []);

  useEffect(() => {
    function checkEmailAndPasswordField() {
      // checks if emailReEnter or password is not empty
      // emailResend is for social accounts only
      // password is for normal accounts only
      if (emailReEnter || password) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkEmailAndPasswordField();
    // executes checkEmailAndPasswordField() everytime the values below changes
  }, [emailReEnter, password]);

  async function deleteAccount() {
    setIsLoading(true);

    // execute delete user
    const result = await killEmAll({
      firebaseUser,
      password,
      email: emailReEnter,
    });

    if (result === "ok") {
      // if result is ok, redirect to index
      router.replace("/");
    }

    setIsLoading(false);
  }

  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View
          style={[
            defaultStyle.container,
            styles.screenContainer,
            {
              pointerEvents: isLoading ? "none" : "auto",
            },
          ]}
        >
          <View style={{ gap: 15 }}>
            <Text style={[defaultStyle.h4, { fontWeight: "bold" }]}>
              We hate goodbyes :(
            </Text>

            <Text>
              Are you sure you want to delete your account?{" "}
              {provider === "password"
                ? "If yes, please re-enter your password"
                : "If yes, please re-enter your email"}
              .
            </Text>

            <Text>This cannot be undone.</Text>
          </View>

          {provider === "password" ? (
            <CustomInput
              value={password}
              handleChange={setPassword}
              label="Password"
              additionalStyles={{ textAlign: "center", fontSize: 36 }}
              secureText={true}
            />
          ) : (
            <CustomInput
              value={emailReEnter}
              handleChange={setEmailReEnter}
              label="Email"
              additionalStyles={{ textAlign: "center", fontSize: 24 }}
            />
          )}

          <View style={styles.buttonContainer}>
            <CustomButton
              label="Cancel"
              handlePress={() => router.back()}
              color={defaultColors.primary}
              additionalStyles={{ flex: 1 }}
            />

            <CustomButton
              label={"Confirm"}
              handlePress={deleteAccount}
              isLoading={isLoading}
              isDisabled={isDisabled}
              color={"darkred"}
              additionalStyles={{ flex: 1 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },

  screenContainer: {
    paddingTop: 50,
    paddingBottom: 50,
    gap: 75,
  },
});
