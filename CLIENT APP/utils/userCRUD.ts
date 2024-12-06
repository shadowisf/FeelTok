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
    // execute sign-in with entered email and password
    const result = await auth().signInWithEmailAndPassword(email, password);

    if (result.user) {
      // if user is verified, store credentials in async storage
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
    // execute sign-up with entered email and password
    const credential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    // assign general references
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
      // if user does not upload profile picture, use default value
      profileURL = "default";
    } else {
      // else upload profile picture to cloudinary
      profileURL = await uploadImage({
        uri: profilePicture,
        publicID: `user-${credential.user.uid}`,
        name: `user-${credential.user.uid}`,
      });
    }

    // update user's display name and photo url in authentication
    await updateProfile(credential.user, {
      displayName: username,
      photoURL: profileURL,
    });

    // create new user entry in firestore
    await userDoc.set({
      fullName: fullName,
      email: email,
      username: username,
      profilePicture: profileURL,
      otpStatus: false,
      bio: defaultBio,
      gender: defaultGender,
      userSince: firestore.FieldValue.serverTimestamp(),
    });

    // send email verification once sign-up is done
    await sendEmailVerification(credential.user);
    console.log(createUser.name, "|", "email verification sent to user");

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
      firebaseUser.reload();
      userDoc = firestore().collection("users").doc(firebaseUser.uid);
      docSnap = await userDoc.get();
    }

    // reading other users
    if (uid) {
      userDoc = firestore().collection("users").doc(uid);
      docSnap = await userDoc.get();
    }

    // assign general references
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
    // return user data
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
    // assign general references
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);

    let changes = [];
    let profileURL;

    if (profilePicture === "default") {
      profileURL = "default";
    } else if (profilePicture === firebaseUser.photoURL) {
      // if profile picture is same as before
      profileURL = firebaseUser.photoURL;
    } else {
      // if profile picture is new or different
      profileURL = await uploadImage({
        uri: profilePicture,
        publicID: `user-${firebaseUser.uid}`,
        name: `user-${firebaseUser.uid}`,
      });
    }

    // password account re-authentication
    if (firebaseUser.providerData[0]?.providerId === "password") {
      const emailCredential = auth.EmailAuthProvider.credential(
        firebaseUser.email ? firebaseUser.email : "",
        password
      );
      await reauthenticateWithCredential(firebaseUser, emailCredential);
      console.log(updateUser.name, "|", "password user verified");
    }

    // google account re-authentication
    if (firebaseUser.providerData[0]?.providerId === "google.com") {
      const idToken = GoogleSignin.getCurrentUser()?.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken ? idToken : ""
      );
      await reauthenticateWithCredential(firebaseUser, googleCredential);
      console.log(updateUser.name, "|", "google user verified");
    }

    if (firebaseUser.email !== email) {
      // if email and current email are not similar, update email
      await verifyBeforeUpdateEmail(firebaseUser, email);
      console.log(
        updateUser.name,
        "|",
        "sent email verification to user's new email"
      );
      changes.push("email");
    }

    if (newPassword !== password && newPassword !== "") {
      // if new password and current password is not same, update password
      await updatePassword(firebaseUser, newPassword);
      console.log(updateUser.name, "|", "new password updated");
      changes.push("password");
    }

    // update user profile
    await updateProfile(firebaseUser, {
      displayName: username,
      photoURL: profileURL,
    });

    // update user firestore
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
      // if verified, delete user, user posts, and references
      const postSnap = await postCol
        .where("author", "==", firebaseUser.uid)
        .get();

      // for ever user's post delete every post
      postSnap.docs.map(async (postDoc) => {
        await deletePost(postDoc.id);
      });

      // delete every reference of user
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
    // signs out user whether password or google account
    await auth().signOut();
    await GoogleSignin.signOut();

    // delete stored credentials
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
    // assign general references
    const userDoc = firestore().collection("users").doc(targetUID);
    const docSnap = await userDoc.get();

    if (docSnap.exists) {
      // if user exists, add report
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
