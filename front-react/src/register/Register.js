import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import * as loginToken from "../utility/functionLoginLogoutToken";
import "./register.css";

function Register() {
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    password: "",
    username: "",
  });

  //updating input value
  const handleSignUpInput = (event) => {
    const str = event.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [event.target.name]: str.toLowerCase(),
    });
  };

  // check if user is already in db ,
  //if no then insert signupinfo to the database ,
  //if yes, inform user
  const checkUserInDb = async () => {
    const data = await fetch("/auth/if_user_exist", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpInfo.username.toLowerCase().trim(),
      }),
    });

    const str = await data.json();

    // str.result == false user dont exit in database else .. exist
    if (str.result === false) {
      createUserInTheDataBase();
      // await loginToken.getLogin({ email: signUpInfo.email.toLowerCase() });

      // sessionStorage.setItem("current-user", signUpInfo.email);
      // history.push("/search");
    } else {
      swal("You already have an account, please sign in", { button: false });
    }
  };

  // create user in the database
  const createUserInTheDataBase = async () => {
    const registered = await fetch("/auth/insert_user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    });

    const confirm = await registered.json();
    console.log(confirm);
    if (confirm) {
      history.push("/search");
    } else {
      swal("signup fail", { button: false });
    }
  };

  return (
    <div>
      <div className="SignUp">
        <div className="container-fluid d-flex justify-content-center">
          <div className="signcard-signup">
            <div className="card-title-register">
              <h2>Sign Up</h2>
            </div>

            <input
              className="user_name_signup"
              type="text"
              id="username"
              name="username"
              placeholder="User Name "
              onChange={handleSignUpInput}
            />

            <input
              className="password_signup"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleSignUpInput}
            />

            <input
              className="btn btn-signup "
              value="Sign Up"
              onClick={checkUserInDb}
            />
            <br />
            <div className="form-group">
              <Link className="card-footerText" to="/login">
                Go Sign In
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
