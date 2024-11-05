import { Button, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";

export default function AuthLaytout() {
  return (
    <Stack>
      <Stack.Screen
        name="signIn"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Button
              onPress={() => {
                router.back();
              }}
              title="Back"
            />
          ),
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Button
              onPress={() => {
                router.back();
              }}
              title="Back"
            />
          ),
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
