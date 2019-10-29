import Head from "next/head";
import Layout from "../components/layout";
import Cookies from "cookies";
import auth from "../utils/auth/client";
import router from "../utils/router";
import { appTypes } from "../types";

const Profile = props => {
  return (
    <Layout app={props.app}>
      <Head>
        <title>Profile</title>
      </Head>

      <h1 className="title">Profile page</h1>

      <p className="description">
        This is a protected page. You can only see it when you are logged in.
      </p>

      <style jsx>{`
        * {
          text-align: center;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
      `}</style>
    </Layout>
  );
};

Profile.getInitialProps = async ({ res, req }) => {
  const app = {
    loggedIn: await auth.loggedIn(req)
  };

  if (!app.loggedIn) {
    router.redirect("/login", { res });
  }

  return { app };
};

Profile.propTypes = {
  app: appTypes
};

export default Profile;
