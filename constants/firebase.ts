import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

const config = {
  apiKey: "AIzaSyBchBa1_Cs5HoARMfUoUtNma5i9QMBUcFU",
  authDomain: "feeltok-9a12f.firebaseapp.com",
  projectId: "feeltok-9a12f",
  storageBucket: "feeltok-9a12f.appspot.com",
  messagingSenderId: "1071064634777",
  appId: "1:1071064634777:web:22de30e2ca0958bffe2f08",
};

/* setLogLevel("silent"); */

export const firebase = initializeApp(config);
export const auth = getAuth(firebase);
