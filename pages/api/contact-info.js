import {
  createData,
  deleteData,
  readData,
  updateData,
} from "../../utils/firebaseSDK/firebaseDB.js";

const handler = async (req, res) => {
  //* POST or PUT are used when you are adding data or replacing data.
  //* In this case this method replaces the entire contact-info object
  //* with the contents of the request body.
  if (req.method === "POST" || req.method === "PUT") {
    const dataObject = req.body;
    try {
      const result = await createData("contact-info", dataObject);
      if (result.ok) {
        res.status(201).json({
          message: `Successfully created contact-info`,
          data: dataObject,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  //* GET is for reading data from the db. The GET method is also the
  //* default method called when you make a fetch request.
  else if (req.method === "GET") {
    try {
      let contactInfo = await readData("contact-info");
      res.status(200).json(contactInfo);
    } catch (error) {
      res.status(404).json({ error: "File not found" });
    }
  }
  //* PATCH is for updating data in the database.
  //* This method expects one or multiple key:value pairs we want updated in
  //* contact-info to the request body and only those values will be modified
  //* in the db
  else if (req.method === "PATCH") {
    //!stopped filtering empty values in the event the user wants to remove information will need to account on the front end
    // let updatedObject = Object.fromEntries(
    //   Object.entries(req.body).filter(
    //     ([key, value]) =>
    //       value !== "undefined" && (typeof value === "number" || value.length)
    //   )
    // );
    try {
      const result = await updateData("contact-info", req.body);
      if (result.ok) {
        res.status(200).json({
          message: `Successfully updated contact-info`,
          updates: result.updates,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  //* DELETE is for... Well you guessed it. Deleting things!!!.
  //* This method expects a single string as the body specifying
  //* the key of the value you want deleted from contact info
  else if (req.method === "DELETE") {
    const fileLocation = req.body;
    //! Protected the contact info end point so it can not be deleted all at once.
    if (fileLocation.length > 0 && typeof fileLocation === "string") {
      const result = await deleteData("contact-info/" + fileLocation);
      if (result.ok) {
        res.status(200).json({
          message: result.message,
        });
      } else {
        res.status(404).json({ error: "File not found." });
      }
    } else {
      res.status(400).json({ error: "Must provide a file name" });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
};
export default handler;
