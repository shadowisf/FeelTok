import { router, Stack } from "expo-router";
import { defaultIcons } from "@/constants/defaultStuff";
import ClickableIcon from "@/components/HeaderIcon";

export default function AuthLaytout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: () => (
          <ClickableIcon
            icon={defaultIcons.arrowLeft}
            onPress={() => {
              router.back();
            }}
          />
        ),
      }}
    >
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
}
