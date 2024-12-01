import { router, Stack, useLocalSearchParams } from "expo-router";
import ClickableIcon from "@/components/ClickableIcon";
import { defaultIcons } from "@/constants/defaultStuff";
import { useState } from "react";
import { reportUser } from "@/constants/userCRUD";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import UserMoreOptionsModal from "@/components/UserMoreOptionsModal";

export default function OtherProfileLayout() {
  const [reason, setReason] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const { uid } = useLocalSearchParams<{ uid: string }>();
  // get dynamic uid from url

  const currentUser = auth().currentUser as FirebaseAuthTypes.User;

  async function handleReportUser() {
    // execute reportUser function with values from state and dynamic uid
    const reportUserResult = await reportUser({
      targetUID: uid,
      firebaseUser: currentUser,
      reason: reason,
    });

    if (reportUserResult === "ok") {
      // if reportUserResult is ok, display alert
      Alert.alert("Success", "User reported");
    }
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerLeft: () => (
            <ClickableIcon
              icon={defaultIcons.arrowLeft}
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="[uid]"
          options={{
            title: "Other User's Profile",
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
      />
    </>
  );
}
