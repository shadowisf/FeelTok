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

  const currentUser = auth().currentUser as FirebaseAuthTypes.User;

  async function handleReportUser() {
    const reportUserResult = await reportUser({
      targetUID: uid,
      firebaseUser: currentUser,
      reason: reason,
    });

    if (reportUserResult === "ok") {
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
