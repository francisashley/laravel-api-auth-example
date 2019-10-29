import auth from "../../../utils/auth/server";
import fetch from "isomorphic-unfetch";

const handler = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  auth.logout(req, res);

  res.end(JSON.stringify({ access_token: "" }));
};

export default handler;
