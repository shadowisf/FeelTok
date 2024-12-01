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
  delay,
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
    // check if async storage has user credential entries
    const startup = auth().onAuthStateChanged(async (user) => {
      SplashScreen.preventAutoHideAsync();

      // google account re-authentication
      if (user && user.providerData[0]?.providerId === "google.com") {
        try {
          const response = await GoogleSignin.signInSilently();
          // execute signInSilently

          if (response) {
            // if user is signed in, redirect to home
            console.log("indexSignInPersistence", "|", "google user verified");
            router.replace("/home");
          }
        } catch (error) {
          console.error("indexSignInPersistence", "|", error);
        }
      }

      // password account re-authentication
      if (user && user.providerData[0]?.providerId === "password") {
        try {
          const data = await getCredentials();
          // get data from async storage
          const result = await auth().signInWithEmailAndPassword(
            data?.email,
            data?.password
          );
          // execute signInWithEmailAndPassword with stored credentials

          if (result.user) {
            // if user is signed in, redirect to home
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

      await delay(2000);

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
