import Head from "next/head";
import Layout from "../components/layout";
import SignOutLink from "../components/SignOutLink";
import Link from "next/link";
import auth from "../utils/auth/client";

const Home = props => {
  return (
    <Layout app={props.app}>
      <Head>
        <title>Home</title>
      </Head>

      <h1 className="title">Home page</h1>
      {!props.app.loggedIn && (
        <p className="description">
          You are logged out.{" "}
          <Link href="/login">
            <a>Sign in?</a>
          </Link>
        </p>
      )}
      {props.app.loggedIn && (
        <p className="description">
          You are logged in. <SignOutLink>Sign out?</SignOutLink>
        </p>
      )}

      <style jsx>{`
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

Home.getInitialProps = async ({ res, req }) => {
  const app = {
    loggedIn: await auth.loggedIn(req)
  };

  return { app };
};

export default Home;
