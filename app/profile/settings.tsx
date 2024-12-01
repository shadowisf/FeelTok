import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  RefreshControl,
  Text,
} from "react-native";
import { defaultColors, defaultStyle, delay } from "@/constants/defaultStuff";
import React, { useEffect, useState } from "react";
import { readUser, signOutUser } from "@/constants/userCRUD";
import Loader from "@/components/Loader";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import ProfileInfo from "@/components/ProfileInfo";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";

export default function ProfileSettings() {
  const [profilePicture, setProfilePicture] = useState("default");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [emailVerifyStatus, setEmailVerifyStatus] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  async function onRefresh() {
    // execute readUser function of currentUser
    const data = await readUser({ firebaseUser });

    if (data) {
      // if data exists, assign user data to states
      setEmail(data.email);
      setProfilePicture(
        data.profilePicture === "" ? "default" : data.profilePicture
      );
      setUsername(data.username);
      setFullName(data.fullName);
      setEmailVerifyStatus(data.emailVerified);
      setGender(data.gender);
      setBio(data.bio);
    }

    await delay(500);

    setIsRefreshing(false);
  }

  useEffect(() => {
    async function fetchUserInfo() {
      setIsPageLoading(true);
      await onRefresh();
      setIsPageLoading(false);
    }

    // on startup, fetch user info
    fetchUserInfo();
  }, []);

  async function handleResendVerificationEmail() {
    // execute verification email
    await firebaseUser.sendEmailVerification().then(() => {
      // after sending, display alert
      Alert.alert(
        "Verification Sent",
        "Verify your account via the link sent to your email."
      );
    });
  }

  async function handleSignOut() {
    // execute sign out for all user types
    const result = await signOutUser();

    if (result === "ok") {
      // if result is ok, redirect to index
      router.replace("/");
    }
  }

  return (
    <>
      <Loader isVisible={isPageLoading} />

      <SafeAreaView>
        <ScrollView
          style={defaultStyle.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                onRefresh();
              }}
            />
          }
        >
          <View
            style={[
              defaultStyle.container,
              styles.screenContainer,
              {
                pointerEvents: isPageLoading ? "none" : "auto",
              },
            ]}
          >
            <View>
              <ProfileInfo
                type="avatar"
                header="Profile Picture"
                value={profilePicture}
              />
              <ProfileInfo type="text" header="Name" value={fullName} />
              <ProfileInfo type="text" header="Username" value={username} />
              <ProfileInfo type="text" header="Gender" value={gender} />
              <ProfileInfo type="text" header="Bio" value={bio} />
              <ProfileInfo type="text" header="Email" value={email} />
            </View>

            <View style={{ gap: 15 }}>
              {emailVerifyStatus ? null : (
                <Text>
                  Email has to be verified before you can edit/delete your
                  profile.{" "}
                  <Text
                    style={styles.resend}
                    onPress={handleResendVerificationEmail}
                  >
                    Resend verification link
                  </Text>
                </Text>
              )}

              <CustomButton
                label="Edit Profile"
                handlePress={() => router.navigate("/profile/edit")}
                color={defaultColors.primary}
                isDisabled={!emailVerifyStatus}
              />
              <CustomButton
                label="Sign Out"
                handlePress={handleSignOut}
                color={defaultColors.primary}
              />
            </View>

            <CustomButton
              label="Delete Account"
              handlePress={() => router.navigate("/profile/delete")}
              color={"darkred"}
              isDisabled={!emailVerifyStatus}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 25,
    paddingBottom: 25,
    gap: 75,
  },

  resend: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },
});
