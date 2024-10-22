import { auth } from "@/constants/firebase";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const uid = auth.currentUser?.uid;

  return (
    <View>
      <Text>welcome, {uid}</Text>
      <Text>this is the home page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
