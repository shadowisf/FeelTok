import { router, Tabs } from "expo-router";
import { defaultColors, defaultIcons } from "@/constants/defaultStuff";
import { TabIcon } from "@/components/TabIcon";
import ClickableIcon from "@/components/HeaderIcon";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native";

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
            <View style={{ paddingLeft: 20 }}>
              <Image source={defaultIcons.logo} style={styles.logo} />
            </View>
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
              additionalStyles={{ paddingRight: 20 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: defaultColors.primary,
  },
});
