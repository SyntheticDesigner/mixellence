import { nanoid } from "nanoid";
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
  if (req.method === "POST" || req.method === "PUT") {
    let { name, bio } = req.body;
    const id = nanoid(15).toLowerCase();
    try {
      if (!req.files.image) {
        throw new Error("Must upload an Image!");
      }
      if (name === "undefined" || !name || !name.length) {
        throw new Error("Must have a name!");
      }
      if (bio === "undefined" || !bio || !bio.length) {
        throw new Error("Must have a bio!");
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
        `mixologists/${id}.${imageExt}`,
        mimetype
      );
      //construct an object for the realtime database
      const dataObject = {
        id: id,
        name: name,
        bio: bio,
        image: {
          url: uploadedImage.url,
          fileLocation: `mixologists/${id}.${imageExt}`,
        },
      };
      //add the new object to the realtime database
      await createData(`mixologists/${id}`, dataObject);
      res.status(200).json({
        message: "Successfully added mixologist",
        data: dataObject,
      });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else if (req.method === "GET") {
    const mixologists = await readData("mixologists");
    res.status(200).json(mixologists);
  } else if (req.method === "PATCH") {
    //!The body must have an id or it will not know which file to update.
    //* Filter out any undefined entries to prevent losing data.
    const id = req.body.id;
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
      //is there an id in the body?
      if (!id) {
        throw new Error("Request body must contain an id key.");
      }
      //does the id exist in the db?
      let oldData = await readData(`mixologists/${id}`);
      //if there is an image update the cloud storage
      let imageSnapshot;
      if (req.files.image) {
        deleteFromStorage(oldData.image.fileLocation);
        const { image, imageExt, mimetype } = createUploadableImage(
          req.files.image
        );
        imageSnapshot = await uploadToStorage(
          image,
          `mixologists/${id}.${imageExt}`,
          mimetype
        );
        updatedObject["image"] = {
          url: imageSnapshot.url,
          fileLocation: `mixologists/${id}.${imageExt}`,
        };
      }
      ////DONE Snapshot needs to reflect if an image was changed
      const snapshot = await updateData(`mixologists/${id}`, updatedObject);

      res
        .status(200)
        .json({ message: "Successfully updated", snapshot: snapshot });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { snapshot } = await deleteData(`mixologists/${req.body.id}`);
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
