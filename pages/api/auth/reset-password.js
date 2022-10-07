import { resetPassword } from "../../../utils/firebaseSDK/firebaseAuth";

const handler = async (req, res) => {
  console.log(req.body);
  const { email } = JSON.parse(req.body);
  const data = resetPassword(email);
  if (data.error) {
    res.status(500).json(data);
  } else {
    res.status(200).json(data);
  }
};
export default handler;
