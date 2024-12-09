import { deleteImage } from "@/utils/cloudinary";
import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function DELETE(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

    await getFirestore().collection("posts").doc(body.id).delete();
    await deleteImage(`post-${body.id}`);

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
