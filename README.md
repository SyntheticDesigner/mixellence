```text
 .__  __ ._              ._   ._
 |  \/  ||_|__  __  ____ | |  | |    ____   ___    ____    ____
 | |\/| || |\ \/ /_/ __ \| |  | |  _/ __ \ /   \ _/ ___\ _/ __ \
 | |  | || | >  < \  ___/| |__| |__\  ___/|  |  \\ \___  \  ___/
 |_|  |_||_|/_/\_\ \___ >|___/|___/ \___ >|__|  / \____ > \___ >
```

# Mixellence

Professional website for a Bartending onsite services business. This business provides processional bartending to a large range of clientele in the Monterey Bay Area.

## Table of contents

- [Mixellence](#mixellence)
  - [Table of contents](#table-of-contents)
  - [Authors](#authors)
    - [Developers](#developers)
    - [Designers](#designers)
  - [Our Goal](#our-goal)
    - [TODO](#todo)
    - [The Design](#the-design)
  - [The Tech Stack](#the-tech-stack)
  - [How to Use](#how-to-use)
    - [Setting up your Environment Variables](#setting-up-your-environment-variables)
      - [Firebase App Configuration](#firebase-app-configuration)
      - [Firebase Admin Configuration](#firebase-admin-configuration)
      - [Setting up nodemailer](#setting-up-nodemailer)
  - [How it works](#how-it-works)
  - [Good to know](#good-to-know)
  - [References](#references)

## Authors

### Developers

- Kevin Harger
  - [Github](https://github.com/kevinh21)
  - [LinkedIn](linkedin.com/in/kevin-h-b4230611)
  - [Website](kevinharger.com)
- Andrew Schroepfer
  - [Github](https://github.com/SyntheticDesigner)
  - [LinkedIn](https://www.linkedin.com/in/andrew-schroepfer/)
  - [Website](https://syntheticdesigner.github.io/)

### Designers

- Efrain Gonzalez
- Lian Lei Baker
- Ray Garcia
  - [LinkedIn](https://www.linkedin.com/in/raymond-garcia-964151a5/)

## Our Goal

Create and host a Next.js app on Firebase. The website should be pixel perfect following a design provided by the UX team. Should be full stack with an admin login and dashboard section capable of editing nearly all the content.

### TODO

- [x] Create a next.js app capable of being hosted on firebase.
- [x] Create functions to implement a CRUD database using the firebase SDK.
- [x] Create Next.js API routes that validate data and consume the CRUD functions.
- [x] Implement user login and authentication with route validation.
- [x] Create admin dashboard frontend.
  - [x] Contact Info Form
  - [x] About us
  - [x] Meet the Team, Bartenders
  - [x] Testimonials
  - [ ] Stretch Goal: Drinks
  - [ ] Stretch Goal: Events
- [x] Create customer facing frontend.
  - [x] Nav
    - [x] Mobile Nav
  - [x] Hero banner
  - [x] About us
  - [x] Events
  - [x] Meet the Team, Bartenders
  - [x] Drinks
  - [x] Testimonials
  - [x] Contact
  - [x] Footer

### The Design

![Alt text](./public/images/design/desktopdesign.png)

## The Tech Stack

- Next.js~React~
- Firebase
  - Firebase Functions
  - Firebase Admin
- cors
- clsx: class module name management
- next-connect: middleware
- formidable-serverless: form parsing that wont destroy image files
- nodemailer: contact form emailing solution
- react-scroll: Navigation
- react-markdown: formatting customer facing data
- framer-motion: animations

## How to Use

### Setting up your Environment Variables

#### Firebase App Configuration

First we need the variables to set up our firebase app.

You can find the firebaseConfig object in your firebase project settings > general

```js
export const firebaseConfig = {
  apiKey: process.env.FB_API,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
};
```

You will need to create a .env or .env.local file in the root level of the project. Create environment variables to correspond to each value in the config object.

It should look something like this

```text
#####-------------------------------------------FIREBASE APP CONFIG
FB_API= ****************************
FB_AUTH_DOMAIN=***********.firebaseapp.com
FB_DATABASE= https://*************.firebaseio.com/
FB_PROJECT_ID=*****************
FB_STORAGE= gs://***************.appspot.com
FB_MESSAGING_SENDER_ID=**********************
FB_APP_ID=****************************
```

#### Firebase Admin Configuration

Next we need to set up credentials for the admin activities like verifying login keys.

We only need project id, private key, and client email

```js
export const adminCredentials = {
  projectId: process.env.ADMIN_PROJECT_ID,
  privateKey: process.env.ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.ADMIN_CLIENT_EMAIL,
};
```

You can download the admin credentials json after creating a Service account.

Go to project setting > service accounts then click generate new private key this will download a json that look like this.

```js
{
"type": "...",
"project_id": "...",
"private_key_id": "...",
"private_key": "-----BEGIN PRIVATE KEY-----\...\n-----END PRIVATE KEY-----\n",
"client_email": "...",
"client_id": "...",
"auth_uri": "...",
"token_uri": "...",
"auth_provider_x509_cert_url": "...",
"client_x509_cert_url": "..."
}
```

You will only need the project_id, private_key, and client_email, add corresponding environment variables to your .env or .env.local file.

```text
#####-------------------------------------------FIREBASE ADMIN
ADMIN_PROJECT_ID= *******************************
ADMIN_PRIVATE_KEY= -----BEGIN PRIVATE KEY-----\***...***\n-----END PRIVATE KEY-----\n
ADMIN_CLIENT_EMAIL= firebase-adminsdk-*********.iam.gserviceaccount.com
```

I recommend creating env variables for all of them or making sure the json file is saved somewhere safe. If the json we get the
variables from is deleted and we need the rest of the info in the future we would have to generate entirely new ones. This way everything needed for future development is saved in this project.

#### Setting up nodemailer

Next we need to set up variables to configure the OAuth setting for nodemailer.

```js
auth: {
      type: "OAuth2",
      user: process.env.PROXY_EMAIL,
      pass: process.env.PROXY_PASSWORD,
      clientId: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
```

[How to configure Nodemailer for firebase](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

First you will need to access your project through the [Google Cloud Platform Console](https://console.cloud.google.com/home)

Once there make sure you have your project selected in the top left dropdown.

Open up the navigation menu by clicking the three dashed lines in the top left corner and select **APIs and Services:**

First we will have to configure our **OAuth Consent Screen:**

If your oAuth app is already set up and named properly all you will need to do is add a user.

If it is not set up or the information is not correct click **Edit App** and proceed through the steps.

You will want to add or change the project name and add or change the user support email, which should be web admin. You can then hit save. Feel free to add any additional info like a logo or app domain but the site will need to be [verified by google](https://search.google.com/search-console/about) before those changes take place.

We don't need to set any scopes so you can skip. Then you can add your user; this should be the email you want to use as the proxy for sending contact form emails.

Now we need to create OAuth credentials to be used with Nodemailer. Head over to the Credentials tab above the OAuth Consent Screen.

You may already have a Web application OAuth 2.0 Client ID, in which case you can skip this next step and just click on the name of the Client in your list.

Click on the plus (➕) sign that has the text Create Credentials and choose OAuth Client ID.

After clicking create, the next screen requires us to fill out the application’s information (our server):

In the Authorized Redirect URIs section, make sure to add OAuth2 Playground (https://developers.google.com/oauthplayground) as we will use it to get one of the keys we need.

After creating/ opening the oAuth Client, you will be presented with your client id and client secret in the top left corner usually. Keep these to yourself and never expose them in any way, shape, or form. They will be used in the `FB_ID` and `FB_SECRET` environment variables.

The last thing we need to do is get the OAuth Refresh Token. To do that head over to the [OAuth2 Playground](https://developers.google.com/oauthplayground)

1. Click on the gear icon to the right (which is OAuth2 Configuration) and check the checkbox to use your own OAuth2 Credentials:
2. Look over to the left side of the website and you will see a list of services. Scroll down until you see Gmail API v1.
3. Click Authorize APIs
   - You will be presented with a screen to login to any of your Gmail accounts. Choose the one you listed as a Test user.
4. The next screen will let you know that Google still hasn’t verified this application, but this is ok since we haven’t submitted it for verification. Click continue.
5. In the next screen, you will be asked to grant permission to your project to interact with your gmail account. Do so.
6. Once that is done, you will be redirected back to the OAuth Playground and you can see that there is an authorization code in the menu to the left. Click on the blue button labelled **Exchange authorization code for tokens**.

The fields for the refresh token and the access token will now be filled. Take the ID, and Secret you got from the OAuth Client, and the refresh token from the OAuth Playground and add them to the appropriate environment vairabiables.

In addition you will need to add the email and password for the proxy email address, and lastly the email you want the proxy to send messages to.

```text
#####-----------------------------------------------NODEMAILER
PROXY_EMAIL=proxyEmail@gmail.com
PROXY_PASSWORD=proxy'sPassword
FB_ID=****************************
FB_SECRET= ****************************
OAUTH_REFRESH_TOKEN=****************************

#Last we need the email the nodemailer will send messages to

USER_EMAIL=yourEmail@gmail.com
```

## How it works

Using Firebase Cloud Functions+ with Firebase Hosting rewrite rules so our app is served from our Firebase Hosting URL. Each individual `page` bundle is served in a new call to the Cloud Function which performs the initial server render.

**Zero trust security validation
**Important:\*\* Update `.firebaserc` and add your firebase project ID.

To run Firebase locally for testing:

```bash
npm run serve
```

To deploy it to the cloud with Firebase:

```bash
npm run deploy
```

## Good to know

- [`firebase.json`](firebase.json:#L7) outlines the catchall rewrite rule for our Cloud Function.
- The empty `public/.gitignore` file is to ensure `public/` dir exists as it is required for Firebase Hosting. It is [configured](firebase.json:#L4) (by [default](https://firebase.google.com/docs/hosting/full-config#ignore)) that dotfiles (`public/.*`) are ignored from being publicly served.
- The Cloud Function is named `nextjsFunc` (changeable in [firebaseFunctions.js](firebaseFunctions.js#L16) and [firebase.json](firebase.json#L8)).
- `public/*` files are statically served through [Firebase hosting](https://firebase.google.com/docs/hosting/full-config#public), not through [NextJs server](https://nextjs.org/docs/basic-features/static-file-serving).

The crucial files for the setup:

- `.firebaserc`
- `firebase.json`
- `firebaseFunctions.js`
- `next.config.js`
- In `package.json`: `firebase-*` packages.

## References

- [How to configure Nodemailer for firebase](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)
- [geovanisouza92/serverless-firebase](https://github.com/geovanisouza92/serverless-firebase) repo
- [jthegedus/firebase-functions-next-example](https://github.com/jthegedus/firebase-functions-next-example) repo
- [this medium article](https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2)
- [Crash Course: Node.js apps on Firebase Hosting](https://youtu.be/LOeioOKUKI8)
- [Official documentation](https://firebase.google.com/docs/cli).
