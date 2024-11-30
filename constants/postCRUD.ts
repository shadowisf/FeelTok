import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { deleteImage, uploadImage } from "./cloudinaryAPI";

export function giveThemeFromEmotion(feeling: string) {
  let backgroundColor;
  let textColor;
  let emotion;

  switch (feeling) {
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
    const postDoc = firestore().collection("posts").doc();

    let imageURL;

    if (image === "") {
      imageURL = "";
    } else {
      imageURL = await uploadImage({
        uri: image,
        publicID: `post-${postDoc.id}`,
        name: `post-${postDoc.id}`,
      });
    }

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
    const userCol = firestore().collection("users");
    const postCol = firestore().collection("posts");

    const postSnap = await postCol.get();

    let posts;

    if (firebaseUser) {
      posts = await Promise.all(
        postSnap.docs
          .filter((doc) => doc.data().author === firebaseUser.uid)
          .map(async (doc) => {
            const postData = doc.data();
            const userSnap = await userCol.doc(postData.author).get();
            const userData = userSnap.exists ? userSnap.data() : null;

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

    if (uid) {
      posts = await Promise.all(
        postSnap.docs
          .filter((doc) => doc.data().author === uid)
          .map(async (doc) => {
            const postData = doc.data();
            const userSnap = await userCol.doc(postData.author).get();
            const userData = userSnap.exists ? userSnap.data() : null;

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

    if (!firebaseUser && !uid) {
      posts = await Promise.all(
        postSnap.docs.map(async (doc) => {
          const postData = doc.data();
          const userSnap = await userCol.doc(postData.author).get();
          const userData = userSnap.exists ? userSnap.data() : null;

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
    await firestore().collection("posts").doc(postID).delete();
    await deleteImage(`post-${postID}`);

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
    const reportDoc = firestore()
      .collection("posts")
      .doc(postID)
      .collection("reports")
      .doc();

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
