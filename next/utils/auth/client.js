import fetch from "isomorphic-unfetch";
import Cookies from "cookies";

function login(username, password) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  };

  return fetch(`/api/auth/login`, options).then(response => response.json());
}

async function loggedIn(req) {
  if (req) {
    const cookies = new Cookies(req);
    return Boolean(cookies.get("access_token"));
  } else {
    return fetch(`/api/auth/loggedIn`, { method: "GET" })
      .then(response => response.json())
      .then(response => {
        const loggedIn = Boolean(response.loggedIn);
        if (!loggedIn) logout();
        return loggedIn;
      });
  }
}

function logout() {
  // Checks logged in
  return fetch(`/api/auth/logout`, { method: "POST" }).then(response => response.json());
}

export default {
  login,
  loggedIn,
  logout
};
