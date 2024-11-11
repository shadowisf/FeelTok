import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/constants/firebase";
import Avatar from "@/components/Avatar";
import { Link, router } from "expo-router";
import { imagePicker } from "@/constants/imagePicker";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("default");

  const [isPickerLoading, setIsPickerLoading] = useState(false);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  useEffect(() => {
    function checkFields() {
      if (email && password && fullName && username) {
        setIsSignUpDisabled(false);
      } else {
        setIsSignUpDisabled(true);
      }
    }

    checkFields();
  }, [email, password, fullName, username]);

  function clearFields() {
    setEmail("");
    setPassword("");
    setFullName("");
    setUsername("");
    setProfilePicture("default");
  }

  async function handleUploadProfilePicture() {
    setIsPickerLoading(true);

    const result = await imagePicker();

    if (result) {
      setProfilePicture(result);
    }

    setIsPickerLoading(false);
  }

  async function handleSignUp() {
    setIsSignUpDisabled(false);
    setIsSignUpLoading(true);

    const result = await createUser({
      email,
      password,
      fullName,
      username,
      profilePicture,
    });

    if (result === "ok") {
      Alert.alert(
        "Success",
        "Account created successfully.\n\nPlease verify your account via the link sent to your email before signing in.",
        [
          {
            text: "Sign in",
            onPress: () => {
              clearFields();
              router.replace("/signIn");
            },
          },
        ],
        { cancelable: false }
      );
    }

    setIsSignUpDisabled(false);
    setIsSignUpLoading(false);
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View
          style={{
            ...defaultStyle.container,
            ...styles.screenContainer,
            pointerEvents: isSignUpLoading ? "none" : "auto",
          }}
        >
          <View style={styles.headerContainer}>
            <Text style={{ ...defaultStyle.h1, ...styles.header }}>
              Let's get acquainted!
            </Text>

            <Text style={{ ...defaultStyle.h5, ...styles.subHeader }}>
              Create a new account
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.avatarContainer}>
              <Avatar size={100} source={profilePicture} />

              <CustomButton
                label={"Upload Profile Picture"}
                handlePress={() => {
                  handleUploadProfilePicture();
                }}
                isLoading={isPickerLoading}
                additionalStyles={{ flex: 1 }}
                color={defaultColors.primary}
              />
            </View>

            <CustomInput
              value={fullName}
              handleChange={(e) => {
                setFullName(e);
              }}
              label={"Full Name"}
              secureText={false}
            />

            <CustomInput
              value={username}
              handleChange={(e) => {
                setUsername(e);
              }}
              label={"Username"}
              secureText={false}
            />

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
              label={"Sign Up"}
              handlePress={() => {
                handleSignUp();
              }}
              isDisabled={isSignUpDisabled}
              isLoading={isSignUpLoading}
              color={defaultColors.primary}
            />

            <Text style={styles.bottomText}>
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
  },

  headerContainer: {
    gap: 15, // Reduced space below header
  },

  inputContainer: {
    gap: 15, // Minimized spacing between fields
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

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },

  bottomText: {
    textAlign: "center",
  },

  signUpLink: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },
});
