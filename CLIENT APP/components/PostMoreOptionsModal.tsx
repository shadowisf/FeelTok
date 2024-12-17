import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyle, delay, defaultColors } from "@/constants/defaultStuff";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type PostMoreOptionsModalProps = {
  firebaseUser: FirebaseAuthTypes.User;
  author: string;
  isModalOpen: boolean;
  isReporting: boolean;
  reason: string;
  isLoading: boolean;
  isDisabled: boolean;
  setReason: (reason: string) => void;
  setIsModalOpen: (value: boolean) => void;
  setIsReporting: (value: boolean) => void;
  handleDelete: () => void;
  handleReport: () => void;
};

export default function PostMoreOptionsModal({
  firebaseUser,
  author,
  isModalOpen,
  isReporting,
  reason,
  isLoading,
  isDisabled,
  setReason,
  setIsModalOpen,
  setIsReporting,
  handleDelete,
  handleReport,
}: PostMoreOptionsModalProps) {
  let content;

  // if user is in reporting page
  if (isReporting) {
    content = (
      <>
        <Text style={[defaultStyle.h4, styles.header]}>Report Post</Text>

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

  if (!isReporting) {
    content = (
      <>
        <Text style={[defaultStyle.h4, styles.header]}>More Options</Text>

        <View style={{ gap: 10 }}>
          {author === firebaseUser.uid ? (
            /* if post author is current user, show delete button */
            <CustomButton
              label="Delete Post"
              color={"darkred"}
              handlePress={handleDelete}
            />
          ) : (
            /*  if post author is not current user, show report button */
            <CustomButton
              label="Report Post"
              color={defaultColors.primary}
              handlePress={() => {
                setIsReporting(true);
              }}
            />
          )}
        </View>

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
