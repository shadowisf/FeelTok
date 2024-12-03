import { initAdmin } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  try {
    await initAdmin();

    const authUsers = await getAuth().listUsers();
    const allUsers = await Promise.all(
      authUsers.users.map(async (user) => {
        const userSnap = await getFirestore()
          .collection("users")
          .doc(user.uid)
          .get();

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

        const userData = userSnap.exists ? userSnap.data() : null;

        return {
          uid: user.uid,
          email: userData?.email,
          fullName: userData?.fullName,
          profilePicture: userData?.profilePicture,
          username: userData?.username,
          provider: user.providerData[0]?.providerId,
          emailVerified: user.emailVerified,
          otpStatus: userData?.otpStatus,
          userSince: creationDate,
          lastLogin: lastLoginDate,
          isDisabled: user.disabled,
        };
      })
    );

    console.log("listAllUsers", "|", "users listed successfully");
    return new Response(JSON.stringify(allUsers), {
      status: 200,
    });
  } catch (error) {
    console.error("listAllUsers", "|", error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
