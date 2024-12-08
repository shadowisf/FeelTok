import { initAdmin } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

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

    const filteredUsers = allUsers.filter((user) => user.uid === body.uid);

    return new Response(
      JSON.stringify({
        message: "Users fetched successfully",
        data: body.uid ? filteredUsers : allUsers,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "User/s not found", error: error }),
      {
        status: 500,
      }
    );
  }
}
