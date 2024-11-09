import { Tabs } from "expo-router";
import { defaultIcons } from "@/constants/defaultStuff";
import { TabIcon } from "@/components/TabIcon";
import Loader from "@/components/Loader";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={defaultIcons.home}
              color={color}
              focused={focused}
              name="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={defaultIcons.create}
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
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={defaultIcons.profile}
              color={color}
              focused={focused}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
