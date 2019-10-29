import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

const Layout = props => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav app={props.app} />

    {props.children && <div className="content">{props.children}</div>}

    <style jsx>{`
      .content {
        width: 100%;
        color: #333;
      }
      :global(a) {
        color: #067df7;
        text-decoration: none;
      }
      :global(a:hover) {
        text-decoration: underline;
      }
      :global(a.active) {
        color: #333;
      }
    `}</style>
  </div>
);

Layout.defaultProps = {
  app: {
    loggedIn: false
  }
};

export default Layout;
