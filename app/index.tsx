import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  defaultColors,
  defaultIcons,
  defaultStyle,
} from "@/constants/defaultStuff";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getCredentials } from "@/constants/asyncStorage";

export default function Index() {
  useEffect(() => {
    const startup = auth().onAuthStateChanged(async (user) => {
      SplashScreen.preventAutoHideAsync();

      if (user && user.providerData[0]?.providerId === "google.com") {
        try {
          const response = await GoogleSignin.signInSilently();

          if (response) {
            console.log("indexSignInPersistence", "|", "google user verified");
            router.replace("/home");
          }
        } catch (error) {
          console.error("indexSignInPersistence", "|", error);
        }
      }

      if (user && user.providerData[0]?.providerId === "password") {
        try {
          const data = await getCredentials();
          const result = await auth().signInWithEmailAndPassword(
            data?.email,
            data?.password
          );

          if (result.user) {
            console.log(
              "indexSignInPersistence",
              "|",
              "password user verified"
            );
            router.replace("/home");
          }
        } catch (error) {
          console.error("indexSignInPersistence", "|", error);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      SplashScreen.hide();
    });

    startup();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={[defaultStyle.container, styles.screenContainer]}>
          <View style={styles.headerContainer}>
            <Image source={defaultIcons.logo} style={styles.logo} />
            <Text style={[defaultStyle.h1, styles.feeltok]}>eelTok!</Text>
          </View>

          <Image
            source={require("../assets/images/onboard-splash.png")}
            resizeMode="contain"
            style={styles.image}
          />

          <Text style={[defaultStyle.h3, styles.tagline]}>
            Feel the need, {"\n"} knead the feel
          </Text>

          <Text style={defaultStyle.body}>
            Nurture deeper connections through love, gratitude, apology,
            appreciation, mindfulness and thankfulness.
          </Text>

          <CustomButton
            label={"Continue"}
            handlePress={() => router.navigate("/signIn")}
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

  feeltok: {
    textAlign: "center",
    fontWeight: "bold",
    color: defaultColors.primary,
    marginLeft: -20,
  },

  tagline: {
    fontWeight: "bold",
    textAlign: "center",
  },

  logo: {
    width: 65,
    height: 100,
    tintColor: defaultColors.primary,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
