import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, getFullName } from "@/constants/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyle } from "@/constants/defaultStuff";

export default function Profile() {
  const uid = auth.currentUser?.uid;
  const [fullName, setFullName] = useState("");
  const displayName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const photoURL = auth.currentUser?.photoURL;
  const phoneNumber = auth.currentUser?.phoneNumber;

  useEffect(() => {
    if (auth.currentUser) {
      getFullName(auth.currentUser.uid).then((fullName) =>
        setFullName(fullName)
      );
    }
  }, [auth.currentUser?.uid]);

  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <Text>UID: {uid}</Text>
          <Text>fullName: {fullName}</Text>
          <Text>displayName: {displayName}</Text>
          <Text>email: {email}</Text>
          <Text>photoURL: {photoURL}</Text>
          <Text>phoneNumber: {phoneNumber}</Text>
          <Text>this is the profile page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
