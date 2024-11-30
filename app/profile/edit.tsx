import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { defaultColors, defaultStyle, delay } from "@/constants/defaultStuff";
import { Dropdown } from "react-native-element-dropdown";
import Loader from "@/components/Loader";
import { readUser, signOutUser, updateUser } from "@/constants/userCRUD";
import { runImagePicker } from "@/constants/imagePicker";
import VerifyChangesToProfile from "./verify";
import { router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function EditProfile() {
  const [profilePicture, setProfilePicture] = useState("default");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [provider, setProvider] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  const genderData = [
    { value: "Male" },
    { value: "Female" },
    { value: "Other" },
    { value: "Prefer not to say" },
  ];

  let content;

  async function onRefresh() {
    const data = await readUser({ firebaseUser });

    if (data) {
      // assign user data to states
      setEmail(data.email);
      setProfilePicture(
        data.profilePicture === "" ? "default" : data.profilePicture
      );
      setUsername(data.username);
      setFullName(data.fullName);
      setProvider(data.provider);
      setOtpStatus(data.otpStatus);
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

    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function checkEditFields() {
      // checks fields in editing mode
      // this is for both social and normal accounts
      const data = await readUser({ firebaseUser });
      const mustNotBeEmpty =
        email && profilePicture && fullName && username && gender; // checks if all fields are not empty

      const mustNotBeSame =
        email !== firebaseUser.email ||
        fullName !== data?.fullName ||
        username !== firebaseUser.displayName ||
        profilePicture !== firebaseUser.photoURL ||
        otpStatus !== data?.otpStatus ||
        gender !== data?.gender ||
        bio !== data?.bio; // checks if any of the fields have changed

      if ((mustNotBeSame && mustNotBeEmpty) || newPassword) {
        // if check is successful, enable button
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkEditFields();
    // executes checkEditFields() everytime the values below changes
  }, [
    email,
    profilePicture,
    fullName,
    username,
    newPassword,
    otpStatus,
    gender,
    bio,
  ]);

  useEffect(() => {
    function checkPassword() {
      // checks if password is not empty
      if (password) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkPassword();
    // executes checkPassword() everytime password field changes
  }, [password]);

  async function handleUploadProfilePicture() {
    // execute image picker popup
    const result = await runImagePicker(1, 1);

    if (result) {
      // if result is not null, set profile picture
      setProfilePicture(result);
    }
  }

  async function handleSignOut() {
    // execute sign out for all user types
    const result = await signOutUser();

    if (result === "ok") {
      // if result is ok, redirect to index
      router.replace("/");
    }
  }

  async function handleSaveChanges() {
    if (provider === "password") {
      // if normal account, redirect to verification screen
      setIsDisabled(true);
      setIsVerifying(true);
    } else {
      // else if social account, directly save changes
      saveChanges();
    }
  }

  async function saveChanges() {
    setIsLoading(true);

    // execute update user with new values
    const result = await updateUser({
      firebaseUser,
      email,
      fullName,
      username,
      password,
      newPassword,
      profilePicture,
      otpStatus,
      bio,
      gender,
    });

    if (result?.includes("ok")) {
      // if result is ok, display alert for specific instances
      switch (true) {
        case result.includes("email"):
          // if user changes email, display alert for email verification
          Alert.alert(
            "Success",
            "Profile edited successfully. You will be logged out for security purposes.\n\nPlease verify your account again via the link sent to your newly assigned email.",
            [
              {
                text: "OK",
                onPress: handleSignOut,
              },
            ],
            { cancelable: false }
          );
          break;

        case result.includes("password"):
          // if user changes password, display alert for logging out
          Alert.alert(
            "Success",
            "Profile edited successfully. You will be logged out for security purposes.",
            [
              {
                text: "OK",
                onPress: handleSignOut,
              },
            ],
            { cancelable: false }
          );
          break;

        default:
          // if user changes something else, display alert
          Alert.alert(
            "Success",
            "Profile edited successfully.",
            [
              {
                text: "OK",
                onPress: () => {
                  router.back();
                },
              },
            ],
            { cancelable: false }
          );
          break;
      }
    }

    setIsLoading(false);
  }

  if (isVerifying) {
    content = (
      <VerifyChangesToProfile
        password={password}
        newPassword={newPassword}
        isLoading={isLoading}
        isDisabled={isDisabled}
        setPassword={setPassword}
        setNewPassword={setNewPassword}
        saveChanges={saveChanges}
        handleCancel={() => router.back()}
      />
    );
  }

  if (!isVerifying) {
    content = (
      <>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
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

          <CustomInput
            value={fullName}
            handleChange={setFullName}
            headerText="Name"
          />

          <CustomInput
            value={username}
            handleChange={setUsername}
            headerText={"Username"}
          />

          <View style={styles.genderContainer}>
            <Text style={{ width: 100 }}>Gender</Text>
            <Dropdown
              onChange={(item) => {
                setGender(item.value);
              }}
              style={styles.dropdown}
              labelField={"value"}
              valueField={"value"}
              data={genderData}
              placeholder={gender}
              value={gender}
              placeholderStyle={{ fontSize: 14 }}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
            />
          </View>

          <CustomInput
            value={bio}
            handleChange={setBio}
            headerText="Bio"
            numberOfLines={4}
          />
        </View>

        <View style={{ gap: 15 }}>
          <CustomInput
            value={email}
            handleChange={setEmail}
            headerText={"Email"}
            isDisabled={provider === "google.com" ? true : false}
          />
          {provider === "google.com" ? null : (
            <CustomInput
              value={newPassword}
              handleChange={setNewPassword}
              headerText={"New Password"}
              secureText={true}
            />
          )}

          <View style={styles.otpContainer}>
            <Text style={{ fontWeight: "bold" }}>
              Two-Factor Authentication By Email
            </Text>

            <Switch
              trackColor={{
                true: defaultColors.primary,
              }}
              onValueChange={() => {
                setOtpStatus(!otpStatus);
              }}
              value={otpStatus}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            label="Cancel"
            handlePress={() => router.back()}
            color={defaultColors.primary}
            additionalStyles={{ flex: 1 }}
          />

          <CustomButton
            label="Save Changes"
            handlePress={handleSaveChanges}
            isDisabled={isDisabled}
            color={defaultColors.primary}
            isLoading={isLoading}
            additionalStyles={{ flex: 1 }}
          />
        </View>
      </>
    );
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
                pointerEvents: isLoading || isPageLoading ? "none" : "auto",
              },
            ]}
          >
            {content}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 50,
    paddingBottom: 50,
    gap: 75,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },

  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },

  dropdown: {
    backgroundColor: defaultColors.secondary,
    padding: 15,
    borderRadius: 3,
    flex: 1,
  },

  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
