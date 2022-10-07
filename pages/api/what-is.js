import nextConnect from "next-connect";
import middleware from "../../utils/middleware/middleware";
import {
  createData,
  readData,
  updateData,
  deleteData,
} from "../../utils/firebaseSDK/firebaseDB";
import {
  uploadToStorage,
  deleteFromStorage,
  createUploadableImage,
} from "../../utils/firebaseSDK/firebaseStorage";

const handler = nextConnect();

handler.use(middleware);

handler.all(async (req, res) => {
//* POST----------------------------------------------------POST
  if (req.method === "POST" || req.method === "PUT") {
    let { body } = req.body;
    try {
      if (body === "undefined" || !body || !body.length || !req.files.image) {
        throw new Error("All fields must be valid.");
      }
      //the file we get from formidable is not formatted correctly for firebase
      //the createUploadableImage function converts the file into one
      //we can use to make our firebase upload
      //TODO: Limit allowed filetypes to only images file types
      const { image, imageExt, mimetype } = createUploadableImage(
        req.files.image
      );
      //Simultaneously upload the image and get the image locations url thanks to the uploadToStorage function
      //Adapted the function to take an optional mimeType
      const uploadedImage = await uploadToStorage(
        image,
        `what-is/what-is.${imageExt}`,
        mimetype
      );
      //construct a object for the realtime database
      const dataObject = {
        body: body,
        image: {
          url: uploadedImage.url,
          fileLocation: `what-is/what-is.${imageExt}`,
        },
      };
      //add the new object to the realtime database
      await createData(`what-is`, dataObject);
      res.status(200).json({
        message: "Successfully added the what is section.",
        data: dataObject,
      });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
//* GET----------------------------------------------------GET
  else if (req.method === "GET") {
    const whatIs = await readData("what-is");
    res.status(200).json(whatIs);
  }
//* PATCH----------------------------------------------------PATCH
  else if (req.method === "PATCH") {
    //* Filter out any undefined entries to prevent losing data.
    let updatedObject = Object.fromEntries(
      //Wishing I was using typescript
      Object.entries(req.body).filter(
        ([key, value]) =>
          key !== "id" &&
          value !== "undefined" &&
          (typeof value === "number" || value.length)
      )
    );
    try {
      let oldData = await readData(`what-is`);
      //if there is an image update the cloud storage
      let imageSnapshot;
      if (req.files.image) {
        deleteFromStorage(oldData.image.fileLocation);
        const { image, imageExt, mimetype } = createUploadableImage(
          req.files.image
        );
        //TODO What if there server does not succeeded at uploading the new image
        imageSnapshot = await uploadToStorage(
          image,
          `what-is/what-is.${imageExt}`,
          mimetype
        );
        updatedObject["image"] = {
          url: imageSnapshot.url,
          fileLocation: `what-is/what-is.${imageExt}`,
        };
      }
      ////DONE Snapshot needs to reflect if an image was changed
      const snapshot = await updateData(`what-is`, updatedObject);

      res
        .status(200)
        .json({ message: "Successfully updated", snapshot: snapshot });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
//* DELETE----------------------------------------------------DELETE
  else if (req.method === "DELETE") {
    try {
      const { snapshot } = await deleteData(`what-is`);
      res
        .status(200)
        .json({ message: "Successfully deleted", snapshot: snapshot });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
});

//!Had to turn nextJs automatic bodyParser off to use middleware for formidable
////DONE Make sure to parse the request body ourselves for non form data types
////Implemented our own bodyParser in the multipartRequestParse function
////in /utils/middleware/multipart-request-parser.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
