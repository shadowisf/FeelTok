import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { defaultStyle } from "@/constants/defaultStuff";

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <StatusBar style={"auto"} />
          <Text>this is the home page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
