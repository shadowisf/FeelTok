import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

// Fetch all posts
export async function POST(req: Request) {
  try {
    await initAdmin();

    const body = await req.json();

    const postsSnapshot = await getFirestore().collection("posts").get();
    const allPosts = postsSnapshot.docs.map((doc) => {
      const data = doc.exists ? doc.data() : null;

      const date = data?.createdAt?.toDate().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return {
        id: doc.id,
        author: data?.author,
        caption: data?.caption,
        feeling: data?.feeling,
        createdAt: date,
        image: data?.image,
      };
    });

    const filteredPosts = allPosts.filter((post) => {
      return post.id === body.id;
    });

    return new Response(
      JSON.stringify({
        message: "Posts fetched successfully",
        data: body.id ? filteredPosts : allPosts,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch posts", error: error }),
      {
        status: 500,
      }
    );
  }
}
