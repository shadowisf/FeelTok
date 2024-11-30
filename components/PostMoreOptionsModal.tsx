import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle, delay, defaultColors } from "@/constants/defaultStuff";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type PostMoreOptionsModalProps = {
  author: string;
  isModalOpen: boolean;
  isReporting: boolean;
  reason: string;
  setReason: (reason: string) => void;
  setIsModalOpen: (value: boolean) => void;
  setIsReporting: (value: boolean) => void;
  handleDelete: () => void;
  handleReport: () => void;
};

export default function PostMoreOptionsModal({
  author,
  isModalOpen,
  isReporting,
  reason,
  setReason,
  setIsModalOpen,
  setIsReporting,
  handleDelete,
  handleReport,
}: PostMoreOptionsModalProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  let content;

  useEffect(() => {
    if (reason) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [reason]);

  if (isReporting) {
    content = (
      <>
        <Text
          style={[defaultStyle.h4, { fontWeight: "bold", textAlign: "center" }]}
        >
          Report Post
        </Text>

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
            handlePress={() => {
              setIsLoading(true);

              handleReport();

              setReason("");

              setIsModalOpen(false);
              setIsReporting(false);

              setIsLoading(false);
            }}
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
        <Text
          style={[defaultStyle.h4, { fontWeight: "bold", textAlign: "center" }]}
        >
          More Options
        </Text>

        <View style={{ gap: 10 }}>
          {author === firebaseUser.uid ? (
            <CustomButton
              label="Delete Post"
              color={"darkred"}
              handlePress={async () => {
                setIsModalOpen(false);
                await delay(500);
                handleDelete();
              }}
            />
          ) : (
            <CustomButton
              label="Report Post"
              color={defaultColors.primary}
              handlePress={async () => {
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
