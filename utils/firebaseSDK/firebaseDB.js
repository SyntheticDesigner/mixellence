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
  child,
  get,
  getDatabase,
  ref as dbRef,
  remove,
  set,
  update,
} from "firebase/database";
import { deleteFromStorage } from "./firebaseStorage";

// Initialize Firebase Database and get a reference to the service
const db = getDatabase(app);

//* This function takes a file location as a string and data as an object.
//* It will add the object to the file location in the Real Time Database.
//* Returns a copy of the data and file location.
export const createData = async (fileLocation, dataObject) => {
  const ref = dbRef(db, fileLocation);
  let result = await set(ref, dataObject);
  //we only get a result from this method if there is an error.
  //If everything works result should be undefined
  if (result !== undefined) {
    throw new Error(result.error || "Something went wrong when creating data");
  } else {
    return { ok: true, data: dataObject, fileLocation };
  }
};

//* This function takes a file location as a string.
//* Returns a snapshot of the data at that location
export const readData = async (fileLocation) => {
  const ref = dbRef(db);
  const snapshot = await get(child(ref, fileLocation));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return { error: "There was an error accessing files" };
  }
};

//* This function takes a file location as a string and data as an object.
//* Returns an object with the data passed and the updates made
export const updateData = async (fileLocation, updatedData) => {
  const ref = dbRef(db);
  let updates = {};
  Object.entries(updatedData).forEach((entry) => {
    const [key, value] = entry;
    updates[fileLocation + "/" + key] = value;
  });
  let result = await update(ref, updates);
  if (result) {
    throw new Error(result.error || "Something went wrong when updating data");
  } else {
    return { ok: true, data: updatedData, updates: updates };
  }
};

//* This function takes a file location as a string and delete the file endpoint.
//! IMPORTANT: This function does not protect any file routes and will gladly delete your entire database.
// In the api endpoints that consumes this function there need to be precautions in place to only
// delete what is intended. Returns a snapshot of the data
// that was delete excluding the image file
export const deleteData = async (fileLocation) => {
  const ref = dbRef(db, fileLocation);
  console.log(fileLocation);
  try {
    const snapshot = await readData(fileLocation);
    if (!snapshot.image) {
      await remove(ref);
    }
    //We combine the deleteFromStorage function with the deleteData to reduce function calls in api endpoints
    //The if else could be refactored to not make changes to storage and only change the database
    else {
      const storageResult = await deleteFromStorage(
        snapshot.image.fileLocation
      );
      const dbResult = await remove(ref);
      if (storageResult || dbResult) {
        throw new Error("Something went wrong when deleting data");
      } else {
        return { message: "Deleted successfully", snapshot: snapshot };
      }
    }
  } catch (err) {
    throw new Error(err);
  }
  // //DONE: Maybe return a snapshot of the object that is getting deleted.
};
