import { initAdmin } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    // initialize admin
    await initAdmin();

    // get body from request
    const body = await req.json();

    // get all users
    const authUsers = await getAuth().listUsers();
    const allUsers = await Promise.all(
      authUsers.users.map(async (user) => {
        // get user data
        const userSnap = await getFirestore()
          .collection("users")
          .doc(user.uid)
          .get();

        const userData = userSnap.exists ? userSnap.data() : null;

        // format creation date
        const creationDate = userData?.userSince
          .toDate()
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

        // format last login date
        const lastLoginDate = new Date(
          user.metadata.lastSignInTime
        ).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        // format year
        const year = userData?.userSince.toDate().getFullYear().toString();

        // return fields of user
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
          year: year,
        };
      })
    );

    // filter users
    const filteredUsers = allUsers.filter((user) => user.uid === body.uid);

    return new Response(
      JSON.stringify({
        message: "Users fetched successfully",
        // if user id is provided, return filtered users, else return all users
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
