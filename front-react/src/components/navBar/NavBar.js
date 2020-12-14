import React, { useEffect } from "react";
import logo from "../../utility/images/home.png";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";

function Navbar(props) {
  const history = useHistory();

  const handleLogOut = () => {
    fetch("/auth/logout", { method: "get" });
    history.push("/");
  };

  return (
    <nav class="navbar navbar-expand-lg  home-nav">
      <img className="home-logo" src={logo} alt="logo" height="120" />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="home-nav-link">
          <li className="nav-item active">
            <Link
              className="nav-link-home"
              to="/search"
              style={props.homeActive}>
              SEARCH <span class="sr-only">(current)</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link-search"
              to="/favorite"
              style={props.searchPostActive}>
              FAVORITE POST
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/">
              <button className="homeLogOut" onClick={handleLogOut}>
                Log Out
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
