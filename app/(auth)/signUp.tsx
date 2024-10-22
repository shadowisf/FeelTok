import { defaultStyle } from "@/constants/defaultStuff";
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <StatusBar barStyle={"dark-content"} />

          <Text>this is the sign-up page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
