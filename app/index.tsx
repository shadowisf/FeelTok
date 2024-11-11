import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  function handleContinueWithEmail() {
    router.push("/signIn");
  }
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.screenContainer }}>
          <Text style={{ ...defaultStyle.h1, ...styles.header }}>FeelTok!</Text>

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
            handlePress={handleContinueWithEmail}
            color={defaultColors.primary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
    gap: 20,
  },

  image: {
    alignSelf: "center",
    width: "100%",
    height: "40%",
  },

  header: {
    textAlign: "center",
    fontWeight: "bold",
    color: defaultColors.primary,
  },

  tagline: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
