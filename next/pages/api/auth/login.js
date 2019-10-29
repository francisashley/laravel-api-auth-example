import cookies from "../../../utils/cookies";
import fetch from "isomorphic-unfetch";

const handler = (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Content-Type", "application/json");

    const { username, password } = req.body;

    const API_DOMAIN = process.env.API_DOMAIN;
    const API_CLIENT_ID = process.env.API_CLIENT_ID;
    const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET;

    const options = {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        grant_type: "password",
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET
      })
    };

    return fetch(`${API_DOMAIN}/oauth/token`, options)
      .then(response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(response => response.json())
      .then(response => {
        res.statusCode = 200;

        const { access_token, refresh_token } = response;

        cookies(req, res).add("access_token", access_token, { path: "/" });
        cookies(req, res).add("refresh_token", refresh_token, { path: "/" });
        cookies(req, res).add("user", "fa-repo", { path: "/" });

        res.end(JSON.stringify({ access_token }));
      })
      .catch(async e => {
        const response = await e.response.json();

        res.statusCode = e.response.status;

        res.end(JSON.stringify(response));
      });
  }
};

export default handler;
