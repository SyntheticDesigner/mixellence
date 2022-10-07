import {
  getUserByEmail,
  initializeAdmin,
} from "../../../utils/firebaseSDK/firebaseAdmin";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ error: "Invalid method." });
  }
  try {
    initializeAdmin();
  } catch (err) {
    res.status(404).json(err);
  }

  const { email } = JSON.parse(req.body);
  try {
    const user = await getUserByEmail(email);
    if (user.uid) {
      res
        .status(200)
        .json({ message: "Email exists", email: email, uid: user.uid });
    } else {
      res
        .status(406)
        .json({ message: "Email address does not exist.", error: user });
    }
  } catch (err) {
    //We should only catch this error is something is wrong with the firebase servers.
    res.status(406).json({ error: "Contact your web admin." });
  }
};
export default handler;
