import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Switch,
} from "react-native";
import { defaultColors, defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import auth from "@react-native-firebase/auth";
import { readUser } from "@/constants/firebase";

export default function Profile() {
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);

  return (
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
          <View
            style={{ ...defaultStyle.container, ...styles.screenContainer }}
          >
            <Switch value={isOtpEnabled} onValueChange={setIsOtpEnabled} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
});
