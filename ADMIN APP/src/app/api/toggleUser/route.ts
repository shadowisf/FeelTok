import { initAdmin } from "@/utils/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

    await getAuth().updateUser(body.uid, { disabled: body.status });

    console.log(
      `disableUser", "|", "user ${
        body.status === true ? "enabled" : "disabled"
      } successfully`
    );
    return new Response(JSON.stringify("OK"), {
      status: 200,
    });
  } catch (error) {
    console.error("disableUser", "|", error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
