/*
! The following code relies on environmental variables that are configured to only be
! available in the next rest api in order to protect sensitive information.

! If you would like to use this code on the client side you must add NEXT_PUBLIC_
! before the Firebase "FB_" environment variables in the .env files and
! the firebaseConfig variable in /utils/firebaseSDK/firebaseConfig.js.
! This will create a security risk.
*/
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

let app;

try {
  app = initializeApp(firebaseConfig);
  console.log("APP INITIALIZED.");
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}
export default app;
