import admin from "firebase-admin";

const serviceAccount = require("../../serviceAccount.json");

export async function initAdmin() {
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
