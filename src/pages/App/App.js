import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";

class App extends Component {
  render() {
    return (
      <div>
        <header className="header-footer">
          A &nbsp;&nbsp;&nbsp; P E R F E C T&nbsp;&nbsp;&nbsp; E V E N I N G
        </header>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/signup" render={() => <SignupPage />} />
        </Switch>
      </div>
    );
  }
}

export default App;
