import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import * as loginToken from "../../utility/functionLoginLogoutToken";

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
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="username">Email</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder=" "
                    name="username"
                    onChange={handleSignInInput}
                  />
                </div>
                <div className="form group">
                  <label for="inputPassword">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder=" "
                    name="password"
                    onChange={handleSignInInput}
                  />
                </div>
                <br />

                <div className="form-group">
                  <input
                    className="btn btn-dark"
                    style={{
                      marginTop: "10px",
                      width: "100px",
                      padding: "8px",
                    }}
                    value="Sign In"
                    onClick={handleSignIn}
                  />
                </div>
                <button onClick={handleLogout} />
                <button onClick={handleother} />
              </form>
            </div>
            <div className="card-footer">
              <div>
                <Link className="card-footerText" to="/register">
                  Sign up here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
