import { router, Tabs } from "expo-router";
import {
  defaultColors,
  defaultIcons,
  defaultStyle,
} from "@/constants/defaultStuff";
import { TabIcon } from "@/components/TabIcon";
import ClickableIcon from "@/components/ClickableIcon";
import { StyleSheet, Text } from "react-native";

export default function TabsLayout() {
  function handleProfileSettings() {
    router.navigate("/profile/settings");
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? defaultIcons.homeFill : defaultIcons.home}
              color={color}
              focused={focused}
              name="Home"
            />
          ),
          headerLeft: () => (
            <Text style={[defaultStyle.h3, styles.feeltok]}>FeelTok!</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create Post",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? defaultIcons.createFill : defaultIcons.create}
              color={color}
              focused={focused}
              name="Create"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? defaultIcons.profileFill : defaultIcons.profile}
              color={color}
              focused={focused}
              name="Profile"
            />
          ),
          headerRight: () => (
            <ClickableIcon
              icon={defaultIcons.settings}
              onPress={handleProfileSettings}
              touchableAdditionalStyles={{ paddingRight: 20 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  feeltok: {
    fontWeight: "bold",
    color: defaultColors.primary,
    paddingLeft: 20,
  },
});