import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Loader from "@/components/Loader";

export default function Index() {
  return (
    <SafeAreaView>
      <Loader isVisible={false} />
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.container }}>
          <StatusBar style={"auto"} />

          <Text style={{ ...defaultStyle.h1, ...styles.feeltok }}>
            FeelTok!
          </Text>

          <Image
            source={require("../assets/images/onboard-splash.png")}
            resizeMode="contain"
            style={styles.image}
          />

          <Text style={{ ...defaultStyle.h3, ...styles.tagline }}>
            Feel the need, {"\n"} knead the feel
          </Text>

          <Text style={defaultStyle.body}>
            Nurture deeper connections through love, gratitude, apology,
            appreciation, mindfulness and thankfulness.
          </Text>

          <CustomButton
            label={"Continue with Email"}
            handlePress={() => {
              router.navigate("/signIn");
            }}
            isDisabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  image: {
    width: 350,
    height: 350,
  },

  feeltok: {
    fontWeight: "bold",
    color: defaultColors.primary,
  },

  tagline: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
