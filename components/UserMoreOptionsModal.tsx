import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle, defaultColors } from "@/constants/defaultStuff";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

type UserMoreOptionsModalProps = {
  isModalOpen: boolean;
  isReporting: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  reason: string;
  setReason: (reason: string) => void;
  setIsModalOpen: (value: boolean) => void;
  setIsReporting: (value: boolean) => void;
  handleReport: () => void;
};

export default function UserMoreOptionsModal({
  isModalOpen,
  isReporting,
  isLoading,
  isDisabled,
  reason,
  setReason,
  setIsModalOpen,
  setIsReporting,
  handleReport,
}: UserMoreOptionsModalProps) {
  let content;

  // if user is in reporting page
  if (isReporting) {
    content = (
      <>
        <Text style={[defaultStyle.h4, styles.header]}>Report User</Text>

        <View style={{ height: 100 }}>
          <CustomInput
            label="Reason for reporting..."
            value={reason}
            handleChange={setReason}
            numberOfLines={4}
          />
        </View>

        <View style={{ gap: 15 }}>
          <CustomButton
            label="Send Report"
            color={defaultColors.primary}
            handlePress={handleReport}
            isDisabled={isDisabled}
          />

          <CustomButton
            label="Cancel"
            color={defaultColors.primary}
            handlePress={() => setIsReporting(false)}
          />
        </View>
      </>
    );
  }

  // if user is not in reporting page
  if (!isReporting) {
    content = (
      <>
        <Text style={[defaultStyle.h4, styles.header]}>More Options</Text>

        <CustomButton
          label="Report User"
          color={defaultColors.primary}
          handlePress={() => setIsReporting(true)}
        />

        <CustomButton
          label="Cancel"
          color={defaultColors.primary}
          handlePress={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      style={{ pointerEvents: isLoading ? "none" : "auto" }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>{content}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultColors.secondary,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    gap: 50,
  },
});
