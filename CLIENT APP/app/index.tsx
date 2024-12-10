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
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getCredentials } from "@/utils/asyncStorage";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    let isMounted = true;

    const checkAuthState = async (user: FirebaseAuthTypes.User | null) => {
      try {
        if (!isMounted) return;

        // Google account re-authentication
        if (user && user.providerData[0]?.providerId === "google.com") {
          try {
            const response = await GoogleSignin.signInSilently();
            if (response) {
              console.log(
                "indexSignInPersistence",
                "|",
                "google user verified"
              );
              router.replace("/home");
              return;
            }
          } catch (error) {
            console.error("indexSignInPersistence", "|", error);
          }
        }

        // Password account re-authentication
        else if (user && user.providerData[0]?.providerId === "password") {
          try {
            const data = await getCredentials();
            if (data) {
              const result = await auth().signInWithEmailAndPassword(
                data.email,
                data.password
              );
              if (result.user) {
                console.log(
                  "indexSignInPersistence",
                  "|",
                  "password user verified"
                );
                router.replace("/home");
                return;
              }
            }
          } catch (error) {
            console.error("indexSignInPersistence", "|", error);
          }
        }

        // Redirect to sign in if no user is signed in
        else {
          router.navigate("/");
        }
      } finally {
        if (isMounted) {
          await delay(2000);
          SplashScreen.hideAsync();
        }
      }
    };

    const startup = auth().onAuthStateChanged((user) => {
      checkAuthState(user);
    });

    return () => {
      isMounted = false;
      startup(); // Unsubscribe from the listener
    };
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
