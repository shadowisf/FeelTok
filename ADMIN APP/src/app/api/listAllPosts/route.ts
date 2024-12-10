import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

// Fetch all posts
export async function POST(req: Request) {
  try {
    // initialize admin
    await initAdmin();

    // get body from request
    const body = await req.json();

    // get all posts
    const postsSnapshot = await getFirestore().collection("posts").get();
    const allPosts = postsSnapshot.docs.map((doc) => {
      const data = doc.exists ? doc.data() : null;

      // format date
      const date = data?.createdAt.toDate().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // format time
      const time = data?.createdAt.toDate().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // format year
      const year = data?.createdAt.toDate().getFullYear().toString();

      // return all field of post
      return {
        id: doc.id,
        author: data?.author,
        caption: data?.caption,
        feeling: data?.feeling,
        date: date,
        time: time,
        image: data?.image,
        year: year,
      };
    });

    // filter posts by post id
    const filteredPosts = allPosts.filter((post) => {
      return post.id === body.id;
    });

    return new Response(
      JSON.stringify({
        message: "Posts fetched successfully",
        // if post id is provided, return filtered posts, else return all posts
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
