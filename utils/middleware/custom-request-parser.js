import formidable from "formidable-serverless";
//! This function is highly unpredictable when working with firebase.
//? This function works in development environments with normal http requests
//? the firebase function seems to provide a custom req with a parsed body
//? so we don't need this under those circumstances
async function bodyParser(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  let buffer = Buffer.concat(chunks);
  let rawBody = buffer.toString("utf8");
  try {
    let body = JSON.parse(rawBody);
    return body;
  } catch {
    return rawBody;
  }
}

//Initialize a formidable form object
const form = new formidable.IncomingForm(); // multiples means req.files will be an array

// This function parses the information for multiple content types.
// "content-type": "multipart/form-data" will use the formidable form parser to extract
// the files and data separate them and pass them on to the next api.
// "content-type": "application/json" uses a home made bodyParser for json data.
// This was needed to account for the built-in body parser being turned off in the testimonials
// and mixologist api endpoints, which was necessary in order to use formidable to pass files
// through the api
export const customRequestParser = async (req, res, next) => {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        req.body = fields; // sets the body field in the request object
        req.files = files; // sets the files field in the request object
        next(); // continues to the next middleware or to the route
      } else {
        next(); // continues to the next middleware or to the route
      }
    });
  }

  //! This code is no longer necessary it was being used to parse req with content type json
  //! which we no longer need to do here
  // else if (contentType && contentType.indexOf("application/json") !== -1) {
  //   //we parse the request and extract the body before moving it on in the req data.
  //   const body = await bodyParser(req);
  //   req.body = body;
  //   next();
  // }
  else {
    next();
  }
  // Don't forget this next at the end without it we can
  // only parse requests with contentType headers.
};
