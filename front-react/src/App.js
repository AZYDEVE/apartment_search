import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Search from "./components/searchPage/SearchPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/search" component={Search} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
