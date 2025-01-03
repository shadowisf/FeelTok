import admin from "firebase-admin";

export async function initAdmin() {
  const serviceAccount = require("../../serviceAccount.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        "https://feeltok-9a12f-default-rtdb.europe-west1.firebasedatabase.app",
    });
  } else {
    admin.app();
  }
}
