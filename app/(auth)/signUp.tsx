import { defaultStyle } from "@/constants/defaultStuff";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function SignUp() {
  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <StatusBar style={"auto"} />

          <Text>this is the sign-up page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
