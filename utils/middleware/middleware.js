import nextConnect from "next-connect";
import { customRequestParser } from "./custom-request-parser";
//nextConnect allows me to redirect my api requests through middleware,
const middleware = nextConnect();
//currently the only middleware is for req containing multipart/form-data,
//it takes the form data and parses it separating files from json
middleware.use(customRequestParser);

export default middleware;
