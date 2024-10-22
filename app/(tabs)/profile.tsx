import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, getFullName } from "@/constants/firebase";

export default function Profile() {
  const uid = auth.currentUser?.uid;
  const [fullName, setFullName] = useState("");
  const displayName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const photoURL = auth.currentUser?.photoURL;

  useEffect(() => {
    if (auth.currentUser) {
      getFullName(auth.currentUser.uid).then((fullName) =>
        setFullName(fullName)
      );
    }
  }, [auth.currentUser?.uid]);

  return (
    <View>
      <Text>{uid}</Text>
      <Text>{fullName}</Text>
      <Text>{displayName}</Text>
      <Text>{email}</Text>
      <Text>{photoURL}</Text>
      <Text>this is the profile page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
