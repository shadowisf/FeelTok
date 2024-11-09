import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, getUserInfo } from "@/constants/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyle } from "@/constants/defaultStuff";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("default");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function fetchUserInfo() {
    setIsLoading(true);

    const data = await getUserInfo();

    if (
      data &&
      data.email &&
      data.fullName &&
      data.userName &&
      data.profilePicture
    ) {
      setEmail(data.email);
      setFullName(data.fullName);
      setUsername(data.userName);
      setProfilePicture(data.profilePicture);
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <Loader isVisible={isLoading} />
      <ScrollView style={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <Text>this is the profile page</Text>

          <Text>fullName: {fullName}</Text>
          <Text>username: {username}</Text>
          <Text>email: {email}</Text>
          <Avatar source={profilePicture} />

          <CustomButton
            label="Sign Out"
            handlePress={() => {
              auth.signOut();
              router.push("/");
            }}
            isDisabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
