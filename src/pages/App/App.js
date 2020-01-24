import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import WineListPage from "../WineListPage/WineListPage";
import LoginPage from "../LoginPage/LoginPage";
import PairingsPage from "../PairingsPage/PairingsPage";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      value: "",
      cheeseName: "",
      cheeseRating: ""
    };
  }

  handleAddCheese = async (idx, evt) => {
    evt.preventDefault();
    const newUser = this.state.user;
    newUser.wines[idx].cheeses = [
      ...newUser.wines[idx].cheeses,
      { name: this.state.cheeseName, rating: this.state.cheeseRating }
    ];

    let response = await userService.addCheeseToWine(newUser);
    this.setState({ user: response });
    //-------------------------------------
  };

  handleAddWine = async newWineData => {
    const newUser = this.state.user;
    newUser.wines = [...newUser.wines, newWineData];
    await userService.updateUserWines(this.state.user);
    this.setState(
      state => ({ user: newUser }),
      () => this.props.history.push("/home")
    );

    //-------------------------------------
  };

  handleCheeseChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state ", this.state);
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
    this.setState({
      redirect: true
    });
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
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/guide"
            render={({ history }) => <PairingsPage history={history} />}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <HomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
                cheeseName={this.state.cheeseName}
                cheeseRating={this.state.cheeseRating}
                handleCheeseChange={this.handleCheeseChange}
                handleAddCheese={this.handleAddCheese}
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
