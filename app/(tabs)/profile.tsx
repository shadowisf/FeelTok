import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { readUser } from "@/constants/userCRUD";
import { defaultColors, defaultStyle, delay } from "@/constants/defaultStuff";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("default");
  const [bio, setBio] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  async function onRefresh() {
    const userData = await readUser(firebaseUser);

    if (userData) {
      setProfilePicture(
        userData.profilePicture === "" ? "default" : userData.profilePicture
      );
      setUsername(userData.username);
      setFullName(userData.fullName);
      setBio(userData.bio);
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
          <View style={[defaultStyle.container, styles.screenContainer]}>
            <View style={styles.profileContainer}>
              <Avatar type="display" size={100} source={profilePicture} />
              <Text style={[defaultStyle.h4, { fontWeight: "bold" }]}>
                {fullName}
              </Text>
              <Text style={{ color: "gray" }}>@{username}</Text>
              <Text>{bio}</Text>
            </View>

            <View style={styles.myPostsContainer}>
              <View style={styles.line} />
              <Text style={styles.postText}>My Posts</Text>
              <View style={styles.line} />
            </View>
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
    gap: 50,
  },

  profileContainer: {
    alignItems: "center",
    gap: 10,
  },

  postText: {
    color: "gray",
    textAlign: "center",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgb(218, 220, 224)",
  },

  myPostsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  resend: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },
});
