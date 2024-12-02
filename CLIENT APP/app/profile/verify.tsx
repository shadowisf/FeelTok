import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { defaultStyle, defaultColors } from "@/constants/defaultStuff";

type VerifyChangesToProfileProps = {
  password: string;
  newPassword: string;
  isLoading: boolean;
  isDisabled: boolean;
  setPassword: (setPassword: string) => void;
  setNewPassword: (setNewPassword: string) => void;
  saveChanges: () => void;
  handleCancel: () => void;
};

export default function VerifyChangesToProfile({
  password,
  newPassword,
  isLoading,
  isDisabled,
  setPassword,
  saveChanges,
  handleCancel,
}: VerifyChangesToProfileProps) {
  return (
    <>
      <View style={{ gap: 15 }}>
        <Text style={[defaultStyle.h4, { fontWeight: "bold" }]}>
          Verification Required
        </Text>

        <Text>
          To apply changes to your profile, please enter your{" "}
          {newPassword === "" ? null : (
            // if newPassword is not empty, display "previous"
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              previous
            </Text>
          )}{" "}
          password.
        </Text>
      </View>

      {/* password input field */}
      <CustomInput
        value={password}
        handleChange={setPassword}
        label="Password"
        additionalStyles={{ textAlign: "center", fontSize: 36 }}
        secureText={true}
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          label="Cancel"
          handlePress={handleCancel}
          color={defaultColors.primary}
          additionalStyles={{ flex: 1 }}
        />

        <CustomButton
          label={"Confirm"}
          handlePress={saveChanges}
          isLoading={isLoading}
          isDisabled={isDisabled}
          color={defaultColors.primary}
          additionalStyles={{ flex: 1 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
