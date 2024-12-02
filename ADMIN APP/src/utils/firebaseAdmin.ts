import "server-only";
import admin from "firebase-admin";

type firebaseAdminParameters = {
  projectID: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
};

export function createFirebaseAdminApp(parameters: firebaseAdminParameters) {
  const privateKey = parameters.privateKey.replace(/\\n/g, "\n");

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: parameters.projectID,
    clientEmail: parameters.clientEmail,
    privateKey: privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: parameters.projectID,
    storageBucket: parameters.storageBucket,
  });
}

export async function initializeAdmin() {
  const parameters = {
    projectID: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(parameters);
}
