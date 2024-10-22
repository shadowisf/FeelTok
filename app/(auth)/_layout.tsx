import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function AuthLaytout() {
  return (
    <Stack>
      <Stack.Screen
        name="signIn"
        options={{ headerShown: false, headerLeft: () => null }}
      />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
