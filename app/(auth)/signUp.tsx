import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { createUser, verifyUser } from "@/constants/userCRUD";
import Avatar from "@/components/Avatar";
import { Link, router } from "expo-router";
import { runImagePicker } from "@/constants/imagePicker";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("default");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function checkFields() {
      // checks if all fields are not empty
      if (email && password && fullName && username) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkFields();
    // if email, password, fullName or username changes, execute checkFields()
  }, [email, password, fullName, username]);

  function clearFields() {
    setEmail("");
    setPassword("");
    setFullName("");
    setUsername("");
    setProfilePicture("default");
  }

  async function handleUploadProfilePicture() {
    const result = await runImagePicker(1, 1);

    if (result) {
      setProfilePicture(result);
    }
  }

  async function handleSignUp() {
    setIsLoading(true);

    // execute user creation
    const createUserResult = await createUser({
      email,
      password,
      fullName,
      username,
      profilePicture,
    });

    if (createUserResult === "ok") {
      // if user is created, execute user verification
      const verifyUserResult = await verifyUser({ email, password });

      // if user is verified, redirect to home
      if (verifyUserResult) {
        clearFields();
        router.replace("/home");
      }
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
            <Text style={[defaultStyle.h1, styles.header]}>
              Let's be friends!
            </Text>

            <Text style={[defaultStyle.h5, { fontWeight: "bold" }]}>
              Sign-up to FeelTok
            </Text>
          </View>

          <View style={{ gap: 15 }}>
            <View style={styles.avatarContainer}>
              {/* avatar component */}
              <Avatar
                type="upload"
                handleButtonPress={handleUploadProfilePicture}
                size={100}
                source={profilePicture}
              />

              <CustomButton
                label="Remove Profile Picture"
                handlePress={() => setProfilePicture("default")}
                color={defaultColors.primary}
                isDisabled={profilePicture === "default"}
              />
            </View>

            {/* name input field */}
            <CustomInput
              value={fullName}
              handleChange={setFullName}
              label={"Name"}
              secureText={false}
            />

            {/* username input field */}
            <CustomInput
              value={username}
              handleChange={setUsername}
              label={"Username"}
              secureText={false}
            />

            {/* email input field */}
            <CustomInput
              value={email}
              handleChange={setEmail}
              label={"Email"}
              secureText={false}
            />

            {/* password input field */}
            <CustomInput
              value={password}
              handleChange={setPassword}
              label={"Password"}
              secureText={true}
            />
          </View>

          <View style={{ gap: 15 }}>
            <CustomButton
              label={"Sign Up"}
              handlePress={handleSignUp}
              isDisabled={isDisabled}
              isLoading={isLoading}
              color={defaultColors.primary}
            />

            <Text style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link replace href="/signIn" style={styles.signUpLink}>
                Sign-in
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
    gap: 50, // Minimized gap between items
    paddingTop: 25, // Padding for better alignment
    paddingBottom: 25,
  },

  header: {
    fontWeight: "bold",
    color: defaultColors.primary,
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },

  signUpLink: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },
});
