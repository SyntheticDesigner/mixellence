//Construct a url to perform a task using the auth REST API
//Ex tasks: signInWithPassword, signOut
export const authUrl = (task) => {
  return process.env.FB_AUTH_REST_URL + task + `?key=${process.env.FB_API}`;
  //environmental variables should be placed in /src/.env || .env.local || .env.production || .env.development
};

//Construct a url to access a file in the realtime database
export const databaseUrl = (location) => {
  return process.env.FB_DATABASE + location + ".json";
  //don't forget to add the .json at the end of these urls for fetching items from the firebase realtime database
};

//A function that uses the AUTH REST API to generate an authentication token.
export async function authenticateUser(email, password) {
  let result = await fetch(authUrl("signInWithPassword"), {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await result.json();
  return data;
}

//// A function that will give us a complete list of admins.
//// export async function getAdmins() {
////   const result = await fetch(databaseUrl("admins"));
////   let data = await result.json();
////   return data;
//// }
