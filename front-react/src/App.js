import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./register/Register";
import Login from "./loginPage/LoginPage";
import Search from "./searchPage/SearchPage";
import postPage from "./postPage/PostPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/postPage" component={postPage} />
        <Route path="/search" component={Search} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
