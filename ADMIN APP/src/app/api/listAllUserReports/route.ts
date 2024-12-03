import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  try {
    await initAdmin();

    const usersSnapshot = await getFirestore().collection("users").get();
    const allUserReports = await Promise.all(
      usersSnapshot.docs.map(async (doc) => {
        const targetUID = doc.id;
        const reportSnap = await getFirestore()
          .collection("users")
          .doc(targetUID)
          .collection("reports")
          .get();

        return reportSnap.docs.map((reportDoc) => {
          const reportData = reportDoc.exists ? reportDoc.data() : null;

          return {
            reportID: reportDoc.id,
            targetUID: targetUID,
            author: reportData?.author,
            reason: reportData?.reason,
          };
        });
      })
    );

    const flattenedReports = allUserReports.flat();

    console.log("listAllUsers", "|", "user reports listed successfully");
    return new Response(JSON.stringify(flattenedReports), {
      status: 200,
    });
  } catch (error) {
    console.error("listAllUsers", "|", error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
