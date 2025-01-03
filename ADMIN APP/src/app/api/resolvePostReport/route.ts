import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    // initialize admin
    await initAdmin();

    // get body from request
    const body = await req.json();

    // delete post report via report id
    await getFirestore()
      .collection("posts")
      .doc(body.targetPostID)
      .collection("reports")
      .doc(body.id)
      .delete();

    return new Response(
      JSON.stringify({
        message: "Post report resolved",
        data: `post ${body.targetPostID} - report ${body.id}`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to resolve post report",
        error: error,
      }),
      {
        status: 500,
      }
    );
  }
}
