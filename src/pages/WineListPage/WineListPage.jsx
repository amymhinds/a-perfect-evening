import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import WineData from "../../components/WineData/WineData";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
// import wineService from "../../utils/wineService";
import { tsThisType } from "@babel/types";

class WineListPage extends Component {
  constructor() {
    super();
    this.state = {
      //user: userService.getUser(),
      wines: [],
      wineModel: [],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log("value ", event.target.value);
  }

  handleSubmit(event) {
    this.setState({ value: event.target.value });
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  /*limit parameter limits num of wines */
  componentDidMount() {
    fetch(
      `https://globalwinescore-global-wine-score-v1.p.rapidapi.com/globalwinescores/latest/?limit=100&?ordering=-date`,
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
      .then(data => {
        console.log("DATA ", data.results);
        this.setState({ wines: data.results });
      });
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

        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search wine by name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Vintage</th>
                  <th>Type</th>
                  <th>Regions</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {this.state.wines
                  .filter(wine => wine.wine.includes(this.state.value))
                  .map(wine => (
                    <WineData
                      name={wine.wine}
                      vintage={wine.vintage}
                      type={wine.type}
                      regions={wine.regions}
                      score={wine.score}
                      handleAddWine={this.props.handleAddWine}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default WineListPage;
