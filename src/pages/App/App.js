import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import { getAllWines } from "../../services/wine-api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      wines: []
    };
  }

  getWine = idx => {
    return this.state.wines[idx];
  };

  componentDidMount() {
    fetch(
      "https://globalwinescore-global-wine-score-v1.p.rapidapi.com/globalwinescores/latest/?wine_id=89989&limit=100&ordering=-date",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "globalwinescore-global-wine-score-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "8488f284c8mshb2d10aec160b79bp14ef40jsn43c2b79185ac",
          authorization: "Token beef4bd81234e85c6343623eb0da47c5cf55ed65",
          accept: "application/json"
        },
        mode: "cors"
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ wines: data.results }));
  }

  /*

  async componentDidMount() {
    const wines = await getAllWines();
    console.log("this is the wine", wines);
    this.setState({ wines: wines });
  }*/

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
        </Switch>
        <div>
          {this.state.wines.map(wine => (
            <p key={wine.wine}> {wine.wine}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
