import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { defaultStyle, defaultColors } from "@/constants/defaultStuff";

type OtpScreenProps = {
  otp: string;
  setOtp: (setOtp: string) => void;
  isDisabled: boolean;
  isLoading: boolean;
  handleOtpConfirm: () => void;
  handleOtpCancel: () => void;
};

export default function OtpScreen({
  otp,
  setOtp,
  isDisabled,
  isLoading,
  handleOtpConfirm,
  handleOtpCancel,
}: OtpScreenProps) {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={[defaultStyle.h5, styles.subHeader]}>
          Two-Factor Authentication
        </Text>

        <Text>
          Enter the one-time password (OTP) sent to your email to sign-in.
        </Text>
      </View>

      <CustomInput
        value={otp}
        handleChange={setOtp}
        label="6-digit code"
        additionalStyles={styles.otp}
      />

      <View style={styles.inputContainer}>
        <CustomButton
          label={"Confirm"}
          handlePress={handleOtpConfirm}
          isDisabled={isDisabled}
          isLoading={isLoading}
          color={defaultColors.primary}
        />
        <CustomButton
          label={"Cancel"}
          handlePress={handleOtpCancel}
          color={defaultColors.primary}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 15,
  },

  subHeader: {
    fontWeight: "bold",
  },

  inputContainer: {
    gap: 15,
  },

  otp: {
    textAlign: "center",
    fontSize: 36,
  },
});
