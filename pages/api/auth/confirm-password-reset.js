import { confirmPassword } from "../../../utils/firebaseSDK/firebaseAuth";

const handler = (req, res) => {
  const { code } = req.body;
  const data = confirmPassword(code);
  if (data.error) {
    res.status(500).json(data);
  } else {
    res.status(200).json(data);
  }
};
export default handler;
