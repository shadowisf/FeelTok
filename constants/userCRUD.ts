import auth, {
  updateProfile,
  reauthenticateWithCredential,
  deleteUser,
  verifyBeforeUpdateEmail,
  updatePassword,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { deleteCredentials, setCredentials } from "./asyncStorage";
import { months } from "./defaultStuff";
import { uploadImage, deleteImage } from "./cloudinaryAPI";

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
    const defaultBio = `FeelTok user since ${
      months[new Date().getMonth()]
    } ${new Date().getFullYear()}`;
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
    });

    // uncomment if project is finalized
    /* await sendEmailVerification(credential.user); */
    /* console.log(createUser.name, "|", "email verification sent to user"); */

    console.log(createUser.name, "|", "new password user created");

    return "ok";
  } catch (error) {
    console.error(createUser.name, "|", error);
    Alert.alert("Oops!", "Something went wrong. Please try again.\n\n" + error);
  }
}

export async function readUser(firebaseUser: FirebaseAuthTypes.User) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);
    const docSnap = await userDoc.get();

    const idToken = await firebaseUser.getIdToken();

    if (
      docSnap.exists &&
      firebaseUser.email &&
      firebaseUser.displayName &&
      firebaseUser.photoURL &&
      firebaseUser.providerData[0].providerId
    ) {
      const fullName = docSnap.data()?.fullName;
      const email = firebaseUser.email;
      const username = firebaseUser.displayName;
      const profilePicture = firebaseUser.photoURL;
      const provider = firebaseUser.providerData[0].providerId;
      const emailVerified = firebaseUser.emailVerified;
      const otpStatus = docSnap.data()?.otpStatus;
      const gender = docSnap.data()?.gender;
      const bio = docSnap.data()?.bio;

      return {
        email,
        fullName,
        username,
        profilePicture,
        provider,
        emailVerified,
        otpStatus,
        idToken,
        gender,
        bio,
      };
    }

    console.log(readUser.name, "|", "user data read successfully");
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

export async function killEmAll({ firebaseUser, password }: deleteUserProps) {
  try {
    const userDoc = firestore().collection("users").doc(firebaseUser.uid);

    let verified;

    // password account
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
      await deleteUser(firebaseUser);
      await userDoc.delete();
      await deleteImage(`user-${firebaseUser.uid}`);
      await deleteCredentials();

      console.log(killEmAll.name, "|", "deleted user and user data");
      return "ok";
    }
  } catch (error) {
    console.error(killEmAll.name, "|", error);
    Alert.alert("Error", "Something went wrong. Please try again.\n\n" + error);
  }
}

export async function signOutUser() {
  try {
    await auth().signOut();
    await deleteCredentials();

    console.log(signOutUser.name, "|", "user logged out successfully");
    return "ok";
  } catch (error) {
    console.error(signOutUser.name, "|", error);
    Alert.alert("Error", "Something went wrong. Please try again.\n\n" + error);
  }
}
