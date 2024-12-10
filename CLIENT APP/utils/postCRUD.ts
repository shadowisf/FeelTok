import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { deleteImage, uploadImage } from "./cloudinaryAPI";

export type PostData = {
  id: string;
  fullName: string;
  username: string;
  profilePicture: string;
  caption: string;
  feeling: string;
  image: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  author: string;
};

export function giveThemeFromEmotion(feeling: string) {
  let backgroundColor;
  let textColor;
  let emotion;

  switch (feeling) {
    // returns backgroundColor, textColor, and emotion based on what emotion the user has selected

    case "Love":
      backgroundColor = "#FCE7F3"; // bg-pink-100
      textColor = "#9B2C2C"; // text-pink-800
      emotion = "love ❤️";
      break;

    case "Gratitude":
      backgroundColor = "#F3E8FF"; // bg-purple-100
      textColor = "#6B46C1"; // text-purple-800
      emotion = "grateful ☀️";
      break;

    case "Apology":
      backgroundColor = "#DBEAFE"; // bg-blue-100
      textColor = "#2B6CB0"; // text-blue-800
      emotion = "apologetic 🥀";
      break;

    case "Appreciation":
      backgroundColor = "#FEF3C7"; // bg-yellow-100
      textColor = "#D69E2E"; // text-yellow-800
      emotion = "appreciative 🌟";
      break;

    case "Mindfulness":
      backgroundColor = "#DCFCE7"; // bg-green-100
      textColor = "#22543D"; // text-green-800
      emotion = "mindful 🧘";
      break;

    case "Thankfulness":
      backgroundColor = "#FFEDD5"; // bg-pink-100
      textColor = "#9C4221"; // text-pink-800
      emotion = "thankful 👍";
      break;
  }

  return {
    backgroundColor,
    textColor,
    emotion,
  };
}

type createPostProps = {
  firebaseUser: FirebaseAuthTypes.User;
  feeling: string;
  image: string;
  caption: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
};

export async function createPost({
  firebaseUser,
  feeling,
  caption,
  image,
  createdAt,
}: createPostProps) {
  try {
    // assign references
    const postDoc = firestore().collection("posts").doc();

    let imageURL;

    if (image === "") {
      // if user selected no image, assign imageURL to be empty
      imageURL = "";
    } else {
      // else upload image using uploadImage function
      imageURL = await uploadImage({
        uri: image,
        publicID: `post-${postDoc.id}`,
        name: `post-${postDoc.id}`,
      });
    }

    // create new post and store details in firestore database
    await postDoc.set({
      author: firebaseUser.uid,
      feeling: feeling,
      caption: caption,
      image: imageURL,
      createdAt: createdAt,
    });

    console.log(createPost.name, "|", "post created succesfully");
    return "ok";
  } catch (error) {
    console.error(createPost.name, "|", error);
  }
}

type readPostProps = {
  firebaseUser?: FirebaseAuthTypes.User;
  uid?: string;
};

export async function readPost({ firebaseUser, uid }: readPostProps) {
  try {
    // assign general references
    const userCol = firestore().collection("users");
    const postCol = firestore().collection("posts");

    // get all the posts in firestore database
    const postSnap = await postCol.get();

    let posts;

    // if querying posts for current user
    if (firebaseUser) {
      posts = await Promise.all(
        postSnap.docs
          .filter((doc) => doc.data().author === firebaseUser.uid)
          // filters out posts that belong to the current user
          .map(async (doc) => {
            const postData = doc.data();
            const userSnap = await userCol.doc(postData.author).get();
            const userData = userSnap.exists ? userSnap.data() : null;

            // maps through all the posts and returns an array of post data
            return {
              id: doc.id || "",
              caption: postData.caption || "",
              feeling: postData.feeling || "",
              image: postData.image || "",
              createdAt: postData.createdAt || "",
              fullName: userData?.fullName || "",
              username: userData?.username || "",
              profilePicture: userData?.profilePicture || "",
              author: postData.author || "",
            };
          })
      );
    }

    // if querying posts for a specific user
    if (uid) {
      posts = await Promise.all(
        postSnap.docs
          .filter((doc) => doc.data().author === uid)
          // filters out posts that belong to specific user
          .map(async (doc) => {
            const postData = doc.data();
            const userSnap = await userCol.doc(postData.author).get();
            const userData = userSnap.exists ? userSnap.data() : null;

            // maps through all the posts and returns an array of post data
            return {
              id: doc.id || "",
              caption: postData.caption || "",
              feeling: postData.feeling || "",
              image: postData.image || "",
              createdAt: postData.createdAt || "",
              fullName: userData?.fullName || "",
              username: userData?.username || "",
              profilePicture: userData?.profilePicture || "",
              author: postData.author || "",
            };
          })
      );
    }

    // if querying posts for ALL users
    // this is default for home page
    if (!firebaseUser && !uid) {
      posts = await Promise.all(
        postSnap.docs.map(async (doc) => {
          // does not filter anything
          const postData = doc.data();
          const userSnap = await userCol.doc(postData.author).get();
          const userData = userSnap.exists ? userSnap.data() : null;

          // maps through all the posts and returns an array of post data
          return {
            id: doc.id || "",
            caption: postData.caption || "",
            feeling: postData.feeling || "",
            image: postData.image || "",
            createdAt: postData.createdAt || "",
            fullName: userData?.fullName || "",
            username: userData?.username || "",
            profilePicture: userData?.profilePicture || "",
            author: postData.author || "",
          };
        })
      );
    }

    console.log(readPost.name, "|", "post read successfully");
    return posts;
  } catch (error) {
    console.error(readPost.name, "|", error);
  }
}

export async function deletePost(postID: string) {
  try {
    // assign general references
    const postSnap = await firestore().collection("posts").doc(postID).get();
    const postData = postSnap.exists ? postSnap.data() : null;

    // deletes post from firestore
    await firestore().collection("posts").doc(postID).delete();

    // deletes post image from cloudinary
    if (postData?.image !== "") {
      await deleteImage(`post-${postID}`);
    }

    console.log(deletePost.name, "|", "post deleted successfully");
    return "ok";
  } catch (error) {
    console.error(deletePost.name, "|", error);
  }
}

type reportPostProps = {
  firebaseUser: FirebaseAuthTypes.User;
  postID: string;
  reason: string;
};

export async function reportPost({
  firebaseUser,
  postID,
  reason,
}: reportPostProps) {
  try {
    // assign general references
    const reportDoc = firestore()
      .collection("posts")
      .doc(postID)
      .collection("reports")
      .doc();

    // create a new report collection on specific post, and store report details
    await reportDoc.set({
      author: firebaseUser.uid,
      reason: reason,
    });

    console.log(reportPost.name, "|", "post reported successfully");
    return "ok";
  } catch (error) {
    console.error(reportPost.name, "|", error);
  }
}
