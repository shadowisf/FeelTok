import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLaytout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack>
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({});
