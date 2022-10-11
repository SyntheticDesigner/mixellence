/*
! The following code relies on environmental variables that are configured to only be
! available in the next rest api in order to protect sensitive information.

! If you would like to use this code on the client side you must add NEXT_PUBLIC_
! before the Firebase "FB_" environment variables in the .env files and
! the firebaseConfig variable in /utils/firebaseSDK/firebaseConfig.js.
! This will create a security risk.
*/
import app from "./firebaseApp";

import {
  confirmPasswordReset,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//TODO encrypt the idToken before it is saved to the cookies and decrypt in validateUser
export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await user.getIdToken();
    const uid = user.uid;
    return { idToken, uid };
  } catch (err) {
    return { error: err };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { message: "Password reset email was sent." };
  } catch (err) {
    return { error: err.message, errorCode: err.code };
  }
};

export const confirmPassword = async (code) => {
  try {
    await confirmPasswordReset(auth, code);
    return { message: "Password was reset" };
  } catch (err) {
    return { error: err.message, errorCode: err.code };
  }
};
