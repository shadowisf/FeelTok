import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  try {
    await initAdmin();

    const postSnap = await getFirestore().collection("posts").get();
    const allPostReports = await Promise.all(
      postSnap.docs.map(async (doc) => {
        const targetPostID = doc.id;

        const reportSnap = await getFirestore()
          .collection("posts")
          .doc(targetPostID)
          .collection("reports")
          .get();

        return reportSnap.docs.map((reportDoc) => {
          const reportData = reportDoc.exists ? reportDoc.data() : null;

          return {
            id: reportDoc.id,
            targetPostID: targetPostID,
            author: reportData?.author,
            reason: reportData?.reason,
          };
        });
      })
    );

    const flattenedReports = allPostReports.flat();

    return new Response(
      JSON.stringify({
        message: "Post reports fetched successfully",
        data: flattenedReports,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Post reports fetch failed", error: error }),
      {
        status: 500,
      }
    );
  }
}
