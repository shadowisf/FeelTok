import auth, {
  updateProfile,
  reauthenticateWithCredential,
  deleteUser,
  verifyBeforeUpdateEmail,
  updatePassword,
  FirebaseAuthTypes,
  sendEmailVerification,
} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { deleteCredentials, setCredentials } from "./asyncStorage";
import { deleteImage, uploadImage } from "./cloudinaryAPI";
import { deletePost } from "./postCRUD";

type verifyUserProps = {
  email: string;
  password: string;
};

export async function verifyUser({ email, password }: verifyUserProps) {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);

    if (result.user) {
      await setCredentials({ email, password });

      console.log(verifyUser.name, "|", "password user verified successfully");
      return result.user;
    }
  } catch (error) {
    console.error(verifyUser.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

type createUserProps = {
  email: string;
  password: string;
  fullName: string;
  username: string;
  profilePicture: string;
};

export async function createUser({
  email,
  password,
  fullName,
  username,
  profilePicture,
}: createUserProps) {
  try {
    const credential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const userDoc = firestore().collection("users").doc(credential.user.uid);
    const defaultBio = `FeelTok user since ${new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
      }
    )}`;
    const defaultGender = "Prefer not to say";

    let profileURL;

    if (profilePicture === "default") {
      profileURL = "default";
    } else {
      profileURL = await uploadImage({
        uri: profilePicture,
        publicID: `user-${credential.user.uid}`,
        name: `user-${credential.user.uid}`,
      });
    }

    await updateProfile(credential.user, {
      displayName: username,
      photoURL: profileURL,
    });

    await userDoc.set({
      fullName: fullName,
      email: credential.user.email,
      username: username,
      profilePicture: profileURL,
      otpStatus: false,
      bio: defaultBio,
      gender: defaultGender,
      userSince: firestore.FieldValue.serverTimestamp(),
    });

    // uncomment if project is finalized
    /* await sendEmailVerification(credential.user);
    console.log(createUser.name, "|", "email verification sent to user"); */

    console.log(createUser.name, "|", "new password user created");

    return "ok";
  } catch (error) {
    console.error(createUser.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

type ReadUserProps = {
  firebaseUser?: FirebaseAuthTypes.User;
  uid?: string;
};

export async function readUser({ firebaseUser, uid }: ReadUserProps) {
  try {
    let userDoc;
    let docSnap;

    // current user
    if (firebaseUser) {
      userDoc = firestore().collection("users").doc(firebaseUser.uid);
      docSnap = await userDoc.get();
    }

    // reading other users
    if (uid) {
      userDoc = firestore().collection("users").doc(uid);
      docSnap = await userDoc.get();
    }

    const fullName = docSnap?.data()?.fullName;
    const email = docSnap?.data()?.email;
    const username = docSnap?.data()?.username;
    const profilePicture = docSnap?.data()?.profilePicture;
    const otpStatus = docSnap?.data()?.otpStatus;
    const gender = docSnap?.data()?.gender;
    const bio = docSnap?.data()?.bio;
    const provider = firebaseUser
      ? firebaseUser.providerData[0].providerId
      : "";
    const emailVerified = firebaseUser ? firebaseUser.emailVerified : false;

    console.log(readUser.name, "|", "user read successfully");
    return {
      email,
      fullName,
      username,
      profilePicture,
      provider,
      emailVerified,
      otpStatus,
      gender,
      bio,
    };
  } catch (error) {
    console.error(readUser.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

type updateUser = {
  firebaseUser: FirebaseAuthTypes.User;
  email: string;
  fullName: string;
  username: string;
  password: string;
  newPassword: string;
  profilePicture: string;
  otpStatus: boolean;
  bio: string;
  gender: string;
};

export async function updateUser({
  firebaseUser,
  email,
  fullName,
  username,
  password,
  newPassword,
  profilePicture,
  otpStatus,
  bio,
  gender,
}: updateUser) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);

    let changes = [];
    let profileURL;

    if (profilePicture === "default") {
      profileURL = "default";
    } else if (profilePicture === firebaseUser.photoURL) {
      profileURL = firebaseUser.photoURL;
    } else {
      profileURL = await uploadImage({
        uri: profilePicture,
        publicID: `user-${firebaseUser.uid}`,
        name: `user-${firebaseUser.uid}`,
      });
    }

    if (firebaseUser.providerData[0]?.providerId === "password") {
      const emailCredential = auth.EmailAuthProvider.credential(
        firebaseUser.email ? firebaseUser.email : "",
        password
      );
      await reauthenticateWithCredential(firebaseUser, emailCredential);
      console.log(updateUser.name, "|", "password user verified");
    }

    if (firebaseUser.providerData[0]?.providerId === "google.com") {
      const idToken = GoogleSignin.getCurrentUser()?.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken ? idToken : ""
      );
      await reauthenticateWithCredential(firebaseUser, googleCredential);
      console.log(updateUser.name, "|", "google user verified");
    }

    if (firebaseUser.email !== email) {
      await verifyBeforeUpdateEmail(firebaseUser, email);
      console.log(
        updateUser.name,
        "|",
        "sent email verification to user's new email"
      );
      changes.push("email");
    }

    if (newPassword !== password && newPassword !== "") {
      await updatePassword(firebaseUser, newPassword);
      console.log(updateUser.name, "|", "new password updated");
      changes.push("password");
    }

    await updateProfile(firebaseUser, {
      displayName: username,
      photoURL: profileURL,
    });

    await userDoc.set(
      {
        email: email,
        fullName: fullName,
        username: username,
        profilePicture: profileURL,
        otpStatus: otpStatus,
        gender: gender,
        bio: bio,
      },
      { merge: true }
    );

    console.log(updateUser.name, "|", "user profile updated successfully");
    return "ok " + changes;
  } catch (error) {
    console.error(updateUser.name, "|", error);
    Alert.alert("Error", "Something went wrong. Please try again.\n\n" + error);
  }
}

type deleteUserProps = {
  firebaseUser: FirebaseAuthTypes.User;
  password: string;
  email?: string;
};

export async function killEmAll({
  firebaseUser,
  password,
  email,
}: deleteUserProps) {
  try {
    const userCol = firestore().collection("users");
    const postCol = firestore().collection("posts");

    let verified;

    // google account re-authentication
    if (firebaseUser.providerData[0]?.providerId === "google.com") {
      const idToken = GoogleSignin.getCurrentUser()?.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken ? idToken : ""
      );
      const reAuthResult = await reauthenticateWithCredential(
        firebaseUser,
        googleCredential
      );

      if (reAuthResult.user && firebaseUser.email === email) {
        verified = true;
        console.log(killEmAll.name, "|", "google user verified");
      }
    }

    // password account re-authentication
    if (firebaseUser.providerData[0]?.providerId === "password") {
      const emailCredential = auth.EmailAuthProvider.credential(
        firebaseUser.email ? firebaseUser.email : "",
        password
      );
      const reAuthResult = await reauthenticateWithCredential(
        firebaseUser,
        emailCredential
      );

      if (reAuthResult.user) {
        verified = true;
        console.log(killEmAll.name, "|", "password user verified");
      }
    }

    if (verified) {
      const postSnap = await postCol
        .where("author", "==", firebaseUser.uid)
        .get();

      postSnap.docs.map(async (postDoc) => {
        await deletePost(postDoc.id);
      });

      await deleteUser(firebaseUser);
      await userCol.doc(firebaseUser.uid).delete();
      await deleteImage(`user-${firebaseUser.uid}`);
      await deleteCredentials();

      console.log(killEmAll.name, "|", "deleted user and all related data");
      return "ok";
    }
  } catch (error) {
    console.error(killEmAll.name, "|", error);
    Alert.alert("Error", "something went wrong. Please try again.\n\n" + error);
  }
}

export async function signOutUser() {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    await deleteCredentials();

    console.log(signOutUser.name, "|", "user logged out successfully");
    return "ok";
  } catch (error) {
    console.error(signOutUser.name, "|", error);
    Alert.alert("Error", "Something went wrong. Please try again.\n\n" + error);
  }
}

type reportUserProps = {
  firebaseUser: FirebaseAuthTypes.User;
  targetUID: string;
  reason: string;
};

export async function reportUser({
  targetUID,
  firebaseUser,
  reason,
}: reportUserProps) {
  try {
    const userDoc = firestore().collection("users").doc(targetUID);
    const docSnap = await userDoc.get();

    if (docSnap.exists) {
      const reportCol = userDoc.collection("reports");
      await reportCol.add({
        author: firebaseUser.uid,
        reason: reason,
      });
      console.log(reportUser.name, "|", "user reported successfully");
      return "ok";
    }
  } catch (error) {
    console.error(reportUser.name, "|", error);
  }
}
