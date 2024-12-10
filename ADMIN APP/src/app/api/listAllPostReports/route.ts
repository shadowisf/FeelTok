import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  try {
    // initialize admin
    await initAdmin();

    // get all post reports
    const postSnap = await getFirestore().collection("posts").get();
    const allPostReports = await Promise.all(
      postSnap.docs.map(async (doc) => {
        const targetPostID = doc.id;

        // get all reports for each post
        const reportSnap = await getFirestore()
          .collection("posts")
          .doc(targetPostID)
          .collection("reports")
          .get();

        // for every report document, return it
        return reportSnap.docs.map((reportDoc) => {
          const reportData = reportDoc.exists ? reportDoc.data() : null;

          // return fields of report
          return {
            id: reportDoc.id,
            targetPostID: targetPostID,
            author: reportData?.author,
            reason: reportData?.reason,
          };
        });
      })
    );

    // flatten all reports
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
