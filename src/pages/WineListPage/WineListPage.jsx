import React, { Component } from "react";
import WineData from "../../components/WineData/WineData";
import userService from "../../utils/userService";
import "./WineListPage.css";

class WineListPage extends Component {
  constructor() {
    super();
    this.state = {
      wines: [],
      wineModel: [],
      value: "",
      isLoading: true,
      cheese: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ value: event.target.value, isLoading: true });
    // alert("A name was submitted: " + this.state.value);
    event.preventDefault();
    userService
      .getWines(this.state.value)
      .then(res => this.setState({ wines: res.results, isLoading: false }));
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
        this.setState({ wines: data.results });
        this.setState({ isLoading: false });
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
        {this.state.isLoading ? (
          <div className="loading">
            L O A D I N G. . . PLEASE WAIT. REMEMBER, THE BEST WINE IS AGED.
            <img
              className="loadingPic"
              src="https://media.giphy.com/media/12u04vnKK6XY9q/giphy.gif"
              alt=""
            />
          </div>
        ) : (
          <div className="WineListPage">
            <div className="SearchBar">
              <form onSubmit={this.handleSubmit}>
                <label className="label">SEARCH WINE BY NAME :</label>
                <input
                  className="input"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <input type="submit" classNamee="submit" value="Submit" />
              </form>
            </div>
            <div className="tableDiv">
              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Vintage</th>
                      <th>Regions</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.wines.map(wine => (
                      <WineData
                        name={wine.wine}
                        vintage={wine.vintage}
                        type={wine.type}
                        regions={wine.regions}
                        score={wine.score}
                        handleAddWine={this.props.handleAddWine}
                        cheese={this.state.cheese}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WineListPage;
