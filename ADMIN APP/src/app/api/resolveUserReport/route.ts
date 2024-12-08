import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

    await getFirestore()
      .collection("users")
      .doc(body.targetUID)
      .collection("reports")
      .doc(body.reportID)
      .delete();

    return new Response(
      JSON.stringify({
        message: "User report resolved",
        data: `user ${body.targetUID} - report ${body.reportID}`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to resolve user report",
        error: error,
      }),
      {
        status: 500,
      }
    );
  }
}