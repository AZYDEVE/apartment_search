import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import * as loginToken from "../utility/functionLoginLogoutToken";
import "./login.css";

function SignIn() {
  const history = useHistory();
  const [signInInfo, setSignInInfo] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = async () => {
    const isauthenticated = await loginToken.checkIfUserPasswordMatches(
      signInInfo
    );
    console.log(isauthenticated.status);
    if (isauthenticated.status === true) {
      history.push("/search");
    } else if (isauthenticated.status === false) {
      swal("You login doesn't work, please try again", { button: false });
    } else {
      swal("Your account don't exist please register", { button: false });
    }
  };

  const handleSignInInput = (event) => {
    const str = event.target.value;

    setSignInInfo({
      ...signInInfo,
      [event.target.name]: str.toLowerCase(),
    });
  };

  const handleLogout = () => {
    fetch("/auth/logout", { method: "get" });
  };

  const handleother = () => {
    fetch("/auth/getUser", { method: "get" });
  };

  return (
    <div>
      <div className="SignIn">
        <div className="container-fluid d-flex justify-content-center">
          <div className="signcard">
            <div className="card-title-login">
              <h2>Sign In</h2>
            </div>

            <input
              type="text"
              id="username"
              className="user_name"
              placeholder="User Name "
              name="username"
              onChange={handleSignInInput}
            />

            <input
              type="password"
              id="password"
              className="password"
              placeholder="Password "
              name="password"
              onChange={handleSignInInput}
            />

            <input
              className="btn btn-signin "
              value="Sign In"
              onClick={handleSignIn}
            />
            <br />

            <div className="footer">
              <Link className="card-footerText" to="/register">
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
