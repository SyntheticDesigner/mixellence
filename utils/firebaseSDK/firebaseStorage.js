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
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import fs from "fs";

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

/*
* This function is designed to test and upload files to firebase storage.
* file should be a file object you want uploaded fileLocation is a string specifying
* the location in the firebase storage you want it to go, must include the file name and extension.
* Returns an object with the url of the images location in the cloud storage and a snapshot of the
* file that was uploaded.

! This function will also overwrite files when given the same file location 
! and can will be used as an update function.

* The fileLocation is the actual location where you want the file stored in the firebase storage.
* If the file Location does not exists it will be generated with all needed subsequent folders.
* For example if my fileLocation = "images/people/person1.png", and those files don't exist
* firebase will create a images folder, a people folder and place the image person1.png inside.

? UPDATE: uploadToStorage takes an optional mimetype parameter in order to add custom configuration for the uploaded bytes
*/
export const uploadToStorage = async (file, fileLocation, mimetype) => {
  // Create a reference to the fileLocation in the storage.
  const reference = storageRef(storage, fileLocation);
  //We take the reference and the file and pass them to uploadByte()
  //which uploads the files to the firebase storage.
  let snapshot = await uploadBytes(
    reference,
    file,
    mimetype ? { contentType: mimetype } : null
  );
  //Get the url location of the file in cloud storage
  let url = await getDownloadURL(reference);
  //If we do not get a snapshot the upload failed
  if (!snapshot || snapshot.error) {
    throw new Error(
      snapshot.error || "Something went wrong when adding image to storage"
    );
  } else {
    return { url, snapshot };
  }
};

//* This function takes a file location as a string and deletes the file.
export const deleteFromStorage = async (fileLocation) => {
  // Create a reference to the file to delete.
  const reference = storageRef(storage, fileLocation);
  // Delete the file
  deleteObject(reference)
    .then(() => {
      return { message: `${fileLocation} was successfully deleted.` };
    })
    .catch((error) => {
      throw new Error(error || "Something went wrong when creating data");
    });
};

//* This takes a images file location and return an object
//* with a image blob, the images extension, and the mimetype
export function createUploadableImage(cachedFileLocation) {
  const mimetype = cachedFileLocation.type;
  const imageExt = mimetype.split("/")[1]; //jpg || png
  const image = fs.readFileSync(cachedFileLocation.path);
  //? image is a unit8Array... I think... We just have to manually assign the mimeType
  //? And firebase will gladly take the unit8Array image
  return { image, imageExt, mimetype };
}

//! If you are using an input field of type="file" to upload a file you do not need this.
//* This function will take a file src and convert its file into a File() object.
export async function srcToFile(src, fileName, mimeType) {
  const res = await fetch(src);
  const buffer = await res.arrayBuffer();
  return new File([buffer], fileName, { type: mimeType });
}
/*
If you are getting the file from the input.files[0] it should already be a File object
and will not need to be converted this function serves to upload files that already exist
on your project for testing purposes
*/

//? Here is an example of using the srcToFile function to create a File object from a src file in my current project.
// let image = srcToFile(
//   "/images/people/mixologist1.png",
//   "mixologist1.png",
//   "image/png"
// ).then((res) => console.log(res));
