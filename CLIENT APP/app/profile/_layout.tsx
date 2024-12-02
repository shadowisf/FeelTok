import { StyleSheet } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import ClickableIcon from "@/components/ClickableIcon";
import { defaultIcons } from "@/constants/defaultStuff";

export default function ProfileSettingsLayout() {
  return (
    <Stack
      screenOptions={{
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
      <Stack.Screen
        name="settings"
        options={{
          title: "Profile Settings",
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          headerShown: false,
          title: "Edit Profile",
        }}
      />

      <Stack.Screen
        name="delete"
        options={{
          headerShown: false,
          title: "Delete Account",
        }}
      />
    </Stack>
  );
}
