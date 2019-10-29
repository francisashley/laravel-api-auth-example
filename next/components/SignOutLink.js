import Link from "next/link";
import auth from "../utils/auth/client";
import router from "../utils/router";

const SignOutLink = props => {
  return (
    <Link href="#">
      <a
        onClick={e => {
          e.preventDefault();
          auth
            .logout()
            .then(() => router.route("/"))
            .catch(console.error);
        }}
      >
        {props.children}
      </a>
    </Link>
  );
};

export default SignOutLink;
