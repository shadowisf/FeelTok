import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { defaultStyle } from "@/constants/defaultStuff";

export default function Create() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={defaultStyle.container}>
          <StatusBar style={"auto"}></StatusBar>

          <Text>this is the create page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
