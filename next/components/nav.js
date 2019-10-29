import React from "react";
import Link from "../components/ActiveLink";
import { withRouter } from "next/router";
import auth from "../utils/auth/client";
import Router from "next/router";
import classnames from "classnames";
import SignOutLink from "../components/SignOutLink";

const links = [
  { href: "https://zeit.co/now", label: "ZEIT" },
  { href: "https://github.com/zeit/next.js", label: "GitHub" }
];

const Nav = props => {
  const { app } = props;

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {app.loggedIn && (
          <li>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
        )}
        {app.loggedIn && (
          <li>
            <SignOutLink>Logout</SignOutLink>
          </li>
        )}
        {!app.loggedIn && (
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        )}
      </ul>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: flex-end;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
      `}</style>
    </nav>
  );
};

Nav.defaultProps = {
  app: {
    loggedIn: false
  }
};

export default withRouter(Nav);
