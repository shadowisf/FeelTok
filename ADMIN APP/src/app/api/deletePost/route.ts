import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function DELETE(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

    const postSnap = await getFirestore()
      .collection("posts")
      .doc(body.id)
      .get();

    await postSnap.ref.delete();

    return new Response(
      JSON.stringify({
        message: "Post deleted successfully",
        data: `${body.id}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Post delete failed", error: error }),
      {
        status: 500,
      }
    );
  }
}
