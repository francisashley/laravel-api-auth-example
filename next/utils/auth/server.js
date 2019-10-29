import fetch from "isomorphic-unfetch";
import cookies from "../../utils/cookies";

const loggedIn = async (req, res) => Boolean(cookies(req, res).get("access_token"));

const logout = async (req, res) => {
  return cookies(req, res).add("access_token", "", { path: "/" });
};

export default {
  loggedIn,
  logout
};
