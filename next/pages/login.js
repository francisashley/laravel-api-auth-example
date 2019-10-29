import React, { useState } from "react";
import Head from "next/head";
import router from "../utils/router";
import Layout from "../components/layout";
import LoginForm from "../components/login-form";
import Error from "next/error";
import auth from "../utils/auth/client";
import Cookies from "cookies";

const Login = props => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <Layout app={props.app}>
      <Head>
        <title>Login</title>
      </Head>

      <LoginForm
        error={error}
        submitting={submitting}
        onSubmit={e => {
          e.preventDefault();

          setSubmitting(true);

          const email = e.target.elements.email.value;
          const password = e.target.elements.password.value;

          auth
            .login(email, password)
            .then(response => {
              setTimeout(() => {
                if (response.error) {
                  setError(response.message);
                  setSubmitting(false);
                } else {
                  router.route("/");
                }
              }, 500);
            })
            .catch(console.error);
        }}
      />
    </Layout>
  );
};

Login.getInitialProps = async ({ res, req }) => {
  const app = {
    loggedIn: await auth.loggedIn(req)
  };

  if (app.loggedIn) {
    router.redirect("/", { res });
  }

  return { app };
};

export default Login;
