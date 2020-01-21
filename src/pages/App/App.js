import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import WineListPage from "../WineListPage/WineListPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import wineService from "../../utils/wineService";

//import { getAllWines } from "../../services/wine-api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      wines: [],
      value: "",
      //wine: {},
      formData: {
        selectedWineName: "",
        selectedWineType: "",
        selectedWineVintage: "",
        selectedWineScore: "",
        selectedWineRegions: ""
      }
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  render() {
    return (
      <div>
        <header className="header-footer">
          A &nbsp;&nbsp;&nbsp; P E R F E C T&nbsp;&nbsp;&nbsp; E V E N I N G
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/winelist"
            render={({ history }) => <WineListPage history={history} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
