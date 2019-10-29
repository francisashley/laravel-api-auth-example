import Router from "next/router";

function route(destination, { res, status = 200 } = {}) {
  if (res) {
    res.writeHead(status, { Location: destination });
    res.end();
  } else {
    Router.push(destination);
  }
}

function redirect(destination, { res } = {}) {
  route(destination, { res, status: 302 });
}

export default {
  route,
  redirect
};
