import { defaultColors } from "@/constants/defaultStuff";
import { View, Image, StyleSheet } from "react-native";

type TabIconProps = {
  name: string;
  icon: any;
  color?: string;
  focused?: boolean;
};

export function TabIcon({ icon, color, focused }: TabIconProps) {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          styles.icon,
          { tintColor: focused ? defaultColors.primary : color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  icon: {
    width: 35,
    height: 35,
  },
});
