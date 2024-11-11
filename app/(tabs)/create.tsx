import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { defaultStyle } from "@/constants/defaultStuff";

export default function Create() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.screenContainer }}>
          <Text>this is the create page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
});
