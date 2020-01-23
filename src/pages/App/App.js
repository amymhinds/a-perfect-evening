import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import WineListPage from "../WineListPage/WineListPage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";

//import { getAllWines } from "../../services/wine-api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      value: "",
      cheeseData: {
        name: "",
        rating: ""
      }
    };
  }

  handleAddWine = async newWineData => {
    console.log("NEW WINE ", newWineData);
    const newUser = this.state.user;
    newUser.wines = [...newUser.wines, newWineData];

    console.log("USER ", this.state.user);
    await userService.updateUserWines(this.state.user);
    this.setState({ user: newUser });
    //-------------------------------------
  };

  handleAddCheese = async newCheeseData => {
    const newUser = this.state.user;
    newUser.wines.wine.cheeses = [
      ...newUser.wines.wine.cheeses,
      newUser.wine.wine.newCheeseData
    ];
    //-------------------------------------
  };

  handleCheeseChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
        <NavBar user={this.state.user} handleLogout={this.state.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
                cheeseData={this.state.cheeseData}
                handleAddCheese={this.handleAddCheese}
                handleCheeseChange={this.handleCheeseChange}
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
                handleUpdateUser={this.handleUpdateUser}
              />
            )}
          />
          <Route
            exact
            path="/winelist"
            render={({ history }) => (
              <WineListPage
                user={this.state.user}
                history={history}
                handleAddWine={this.handleAddWine}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
