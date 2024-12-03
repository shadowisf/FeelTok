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

    console.log("disableUser", "|", "user report deleted successfully");
    return new Response(JSON.stringify(""), {
      status: 200,
    });
  } catch (error) {
    console.error("disableUser", "|", error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
