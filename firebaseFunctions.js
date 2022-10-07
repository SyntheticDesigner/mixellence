const { join } = require("path");
const cors = require("cors");
const { https } = require("firebase-functions");
const { default: next } = require("next");

const nextjsDistDir = join(require("./next.config.js").distDir);
//Create a next server, could be substituted for node server or any sort of local services.
const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});

const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer
    .prepare()
    .then(cors()(req, res, () => nextjsHandle(req, res)));
});
