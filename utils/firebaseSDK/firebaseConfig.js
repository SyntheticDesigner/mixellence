import { credential } from "firebase-admin";

// TODO: Add the environment variables to a .env or .env.local file in the root folder
/*
! These environment variables are currently configured to only be available in
! server side code, any operations dependent on these variables will not work
! in client side code. To make operations dependent on these variables
! usable in client side code add NEXT_PUBLIC_ in from of all environment variables.
! this is inadvisable and will create security risks.
*/

//* You can find the firebaseConfig object in your firebase project settings > general
export const firebaseConfig = {
  apiKey: process.env.FB_API,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
};
/*
 * You can download the admin credentials json after creating a Service account.
 * Go to project setting > service accounts then click generate new private key.
 * this will download a json that look like this
 ?   {
 ?   "type": "...",
 ?   "project_id": "...",
 ?   "private_key_id": "...",
 ?   "private_key": "-----BEGIN PRIVATE KEY-----\...\n-----END PRIVATE KEY-----\n",
 ?   "client_email": "...",
 ?   "client_id": "...",
 ?   "auth_uri": "...",
 ?   "token_uri": "...",
 ?   "auth_provider_x509_cert_url": "...",
 ?   "client_x509_cert_url": "..."
 ?   }
* You will only need the project_id, private_key, and client_email, however I
* recommend creating env variables for all of them if the json we get the
* variables from is deleted and we need the rest of the info in the future
* we would have to generate entirely new ones. This way everything needed
* for future development is saved in this project.
 */
export const adminCredentials = {
  projectId: process.env.ADMIN_PROJECT_ID,
  privateKey: process.env.ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.ADMIN_CLIENT_EMAIL,
};

export const adminConfig = {
  credential: credential.cert(adminCredentials),
  databaseURL: process.env.FB_DATABASE,
};
