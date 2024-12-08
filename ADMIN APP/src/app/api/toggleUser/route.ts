import { initAdmin } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

    await getAuth().updateUser(body.uid, { disabled: body.status });

    return new Response(
      JSON.stringify({
        message: "User status updated successfully",
        data: `${body.uid} ${body.status ? "enabled" : "disabled"}`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "User status update failed", error: error }),
      {
        status: 500,
      }
    );
  }
}
