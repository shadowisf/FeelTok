import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { defaultStyle } from "@/constants/defaultStuff";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";

export default function Profile() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={defaultStyle.scrollContainer}>
        <View style={{ ...defaultStyle.container, ...styles.screenContainer }}>
          <Text>this is the profile page</Text>

          <CustomInput
            label={"Phone Number"}
            value={phoneNumber}
            handleChange={setPhoneNumber}
          />
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
