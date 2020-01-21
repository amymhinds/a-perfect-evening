import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import wineService from "../../utils/wineService";
import SelectWineButton from "../../components/SelectWineButton/SelectWineButton";
//import { getAllWines } from "../../services/wine-api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      wines: [],
      //wine: {},
      selectedWineName: "",
      selectedWineType: "",
      selectedWineVintage: "",
      selectedWineScore: "",
      selectedWineRegions: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://globalwinescore-global-wine-score-v1.p.rapidapi.com/globalwinescores/latest/?limit=100&ordering=-date",
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

  handleWineSelection = () => {
    wineService.create({
      name: this.state.selectedWineName,
      type: this.state.selectedWineType,
      vintage: this.state.selectedWineVintage,
      score: this.state.selectedWineScore,
      regions: this.state.selectedWineRegions
    });
  };

  // updateWineSelection = (Name, Type, Vintage, Score, Regions) => {
  //   this.setState({
  //     selectedWineName: Name,
  //     selectedWineType: Type,
  //     selectedWineVintage: Vintage,
  //     selectedWineScore: Score,
  //     selectedWineRegions: Regions
  //   });
  // };
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
          <form>
            <label>
              Search by wine name:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <select id="dropdown">
            {this.state.wines.map(wine => (
              <option key={wine.vintage} vale={wine.id}>
                {wine.wine} + {wine.vintage}
              </option>
            ))}
          </select>
          <SelectWineButton
            // updateWineSelection={this.updateWineSelection}
            handleWineSelection={this.handleWineSelection}
          />
        </div>
      </div>
    );
  }
}

export default App;
