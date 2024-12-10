import { router, Stack } from "expo-router";
import { defaultIcons } from "@/constants/defaultStuff";
import ClickableIcon from "@/components/ClickableIcon";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <ClickableIcon
            icon={defaultIcons.arrowLeft}
            onPress={() => router.back()}
          />
        ),
      }}
    >
      <Stack.Screen name="signIn" options={{ title: "Sign-in" }} />
      <Stack.Screen name="signUp" options={{ title: "Sign-up" }} />
    </Stack>
  );
}
