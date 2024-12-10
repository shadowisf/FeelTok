import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  try {
    // initialize admin
    await initAdmin();

    // get all user reports
    const usersSnapshot = await getFirestore().collection("users").get();
    const allUserReports = await Promise.all(
      usersSnapshot.docs.map(async (doc) => {
        const targetUID = doc.id;

        // get all reports for each user
        const reportSnap = await getFirestore()
          .collection("users")
          .doc(targetUID)
          .collection("reports")
          .get();

        // for every report document, return it
        return reportSnap.docs.map((reportDoc) => {
          const reportData = reportDoc.exists ? reportDoc.data() : null;

          // return fields of report
          return {
            reportID: reportDoc.id,
            targetUID: targetUID,
            author: reportData?.author,
            reason: reportData?.reason,
          };
        });
      })
    );

    //  flatten array
    const flattenedReports = allUserReports.flat();

    return new Response(
      JSON.stringify({
        message: "User reports fetched successfully",
        data: flattenedReports,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "User reports fetch failed", error: error }),
      {
        status: 500,
      }
    );
  }
}
