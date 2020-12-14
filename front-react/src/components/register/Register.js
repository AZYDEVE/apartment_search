import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import * as loginToken from "../../utility/functionLoginLogoutToken";

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
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder=" "
                    onChange={handleSignUpInput}
                  />
                </div>

                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder=""
                    onChange={handleSignUpInput}
                  />
                </div>

                <div className="form-group">
                  <input
                    className="btn btn-dark btn-sm"
                    style={{
                      marginTop: "10px",
                      width: "100px",
                      padding: "8px",
                    }}
                    value="Sign Up"
                    onClick={checkUserInDb}
                  />
                </div>

                <div className="form-group">
                  Already an user?{" "}
                  <Link className="card-footerText" to="/login">
                    Sign In
                  </Link>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
