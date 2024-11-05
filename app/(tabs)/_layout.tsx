import { Image, View, Text } from "react-native";
import { Tabs } from "expo-router";
import { defaultIcons } from "@/constants/defaultStuff";

type TabIconProps = {
  name: string;
  icon: any;
  color: string;
  focused: boolean;
};

function TabIcon({ name, icon, color, focused }: TabIconProps) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 30,
          height: 30,
          tintColor: focused ? "#883AE1" : color,
        }}
      />
      <Text
        style={{
          color: focused ? "#883AE1" : color,
          fontSize: 11,
        }}
      >
        {name}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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
