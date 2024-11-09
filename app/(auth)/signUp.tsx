import { View, ScrollView, Text, SafeAreaView, StyleSheet } from "react-native";
import { defaultStyle } from "@/constants/defaultStuff";
import { StatusBar } from "expo-status-bar";

export default function SignUp() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.container }}>
          <StatusBar style={"auto"} />

          <Text>this is the sign up page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
});
