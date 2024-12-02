import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import "server-only";

export async function readUser(uid: string) {
  try {
  } catch (error) {
    console.log(readUser.name, "|", error);
  }
}

export async function listAllUsers() {
  try {
    const authUsers = await getAuth().listUsers();

    const allUsers = await Promise.all(
      authUsers.users.map(async (user) => {
        const userSnap = await getFirestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (userSnap.exists) {
          const creationTimestamp = user.metadata.creationTime;
          const creationDate = new Date(creationTimestamp).toLocaleDateString(
            "en-US",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

          const lastLoginTimestamp = user.metadata.lastSignInTime;
          const lastLoginDate = new Date(lastLoginTimestamp).toLocaleDateString(
            "en-US",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

          return {
            uid: user.uid,
            email: userSnap.data()?.email,
            fullName: userSnap.data()?.fullName,
            profilePicture: userSnap.data()?.profilePicture,
            username: userSnap.data()?.username,
            provider: user.providerData[0]?.providerId,
            emailVerified: user.emailVerified,
            otpStatus: userSnap.data()?.otpStatus,
            userSince: creationDate,
            lastLogin: lastLoginDate,
            isDisabled: user.disabled,
          };
        }
      })
    );

    console.log(listAllUsers.name, "|", "users fetched successfully");
    return allUsers;
  } catch (error) {
    console.error(listAllUsers.name, "|", error);
  }
}
