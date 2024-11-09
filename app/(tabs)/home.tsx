import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { defaultStyle } from "@/constants/defaultStuff";

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <StatusBar style={"auto"} />
          <Text>this is the home page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
