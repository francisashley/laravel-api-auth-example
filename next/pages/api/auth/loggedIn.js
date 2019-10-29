import auth from "../../../utils/auth/server";

const handler = async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({ loggedIn: await auth.loggedIn(req, res) }));
};

export default handler;
