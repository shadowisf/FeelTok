import { router, Stack, useLocalSearchParams } from "expo-router";
import ClickableIcon from "@/components/ClickableIcon";
import { defaultIcons } from "@/constants/defaultStuff";
import { useEffect, useState } from "react";
import { readUser, reportUser } from "@/utils/userCRUD";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import UserMoreOptionsModal from "@/components/UserMoreOptionsModal";
import React from "react";

export default function OtherProfileLayout() {
  const [fullName, setFullName] = useState("");
  const [reason, setReason] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { uid } = useLocalSearchParams<{ uid: string }>();
  // get dynamic uid from url

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  useEffect(() => {
    async function startup() {
      // execute readUser function using dynamic uid
      const data = await readUser({ uid });

      if (data) {
        // if data exists, assign full name to state
        setFullName(data.fullName);
      }
    }

    startup();
  }, []);

  useEffect(() => {
    function checkField() {
      if (reason) {
        // check if reason is not empty
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkField();
    // execute checkField function every time reason value changes
  }, [reason]);

  async function handleReportUser() {
    setIsLoading(true);

    // execute reportUser function with values from state and dynamic uid
    const reportUserResult = await reportUser({
      targetUID: uid,
      firebaseUser: firebaseUser,
      reason: reason,
    });

    if (reportUserResult === "ok") {
      // if reportUserResult is ok, display alert
      Alert.alert("Success", "User reported");
    }

    setReason("");

    setIsModalOpen(false);
    setIsReporting(false);

    setIsLoading(false);
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerLeft: () => (
            <ClickableIcon
              icon={defaultIcons.arrowLeft}
              onPress={() => router.back()}
            />
          ),
        }}
      >
        <Stack.Screen
          name="[uid]"
          options={{
            title: `${fullName}'s Profile`,
            headerRight: () => (
              // three dots button
              <ClickableIcon
                icon={defaultIcons.more}
                onPress={() => setIsModalOpen(true)}
              />
            ),
          }}
        />
      </Stack>

      <UserMoreOptionsModal
        isModalOpen={isModalOpen}
        isReporting={isReporting}
        reason={reason}
        setReason={setReason}
        setIsModalOpen={setIsModalOpen}
        setIsReporting={setIsReporting}
        handleReport={handleReportUser}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </>
  );
}
