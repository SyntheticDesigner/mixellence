/*
! The following code relies on environmental variables that are configured to only be
! available in the next rest api in order to protect sensitive information.

! If you would like to use this code on the client side you must add NEXT_PUBLIC_
! before the Firebase "FB_" environment variables in the .env files and
! the firebaseConfig variable in /utils/firebaseSDK/firebaseConfig.js.
! This will create a major security risk and particularly dangerous for
! Service Account Variables.
*/
//? https://firebase.google.com/docs/admin/setup#add-sdk
import { initializeApp, getApps } from "firebase-admin/app";
import { auth, credential } from "firebase-admin";
import { adminCredentials } from "./firebaseConfig";

let admin;

export const adminConfig = {
  credential: credential.cert(adminCredentials),
  databaseURL: process.env.FB_DATABASE,
};

export const initializeAdmin = () => {
  try {
    admin = initializeApp(adminConfig);
    return admin;
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      throw error;
    }
  }
};

if (getApps().length === 0) {
  initializeAdmin();
}

//This function will validate a firebase token and return a user id.
export const validateUser = async (idToken) => {
  try {
    const { uid } = await auth().verifyIdToken(idToken);
    return uid;
  } catch (err) {
    return err;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const userRecord = await auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    return error;
  }
};

export default admin;
