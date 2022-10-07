import { signIn } from "../../../utils/firebaseSDK/firebaseAuth";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Invalid Method" });
    return;
  }
  const { email, password } = JSON.parse(req.body);
  const data = await signIn(email, password);
  if (data.error) {
    res.status(400).json(data);
  } else {
    res.status(200).json({
      message: "Successfully logged in.",
      ...data,
    });
  }
};

export default handler;
