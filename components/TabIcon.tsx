import { View, Image, Text, StyleSheet } from "react-native";

type TabIconProps = {
  name: string;
  icon: any;
  color: string;
  focused: boolean;
};

export function TabIcon({ name, icon, color, focused }: TabIconProps) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ ...styles.icon, tintColor: focused ? "#883AE1" : color }}
      />
      <Text
        style={{
          ...styles.text,
          color: focused ? "#883AE1" : color,
        }}
      >
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    marginTop: 20,
  },

  text: {
    fontSize: 9,
  },
});
