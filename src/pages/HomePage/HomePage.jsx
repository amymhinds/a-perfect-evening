import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";
import "./HomePage.css";
import { tsPropertySignature } from "@babel/types";

const HomePage = props => {
  return (
    <div className="HomePage">
      <h2 className="phrase">
        Part of me says I should stop drinking, the other part says don't listen
        to her, she's drunk.
      </h2>
      <h1 className="myWines">My Wines</h1>

      {props.user.wines.map((wine, idx) => (
        <div className="block">
          <h1 className="wineTitle">Wine</h1>
          {wine.cheeses && wine.cheeses.length > 0 ? (
            <div>
              <div className="wineName">
                <table>
                  <thead>
                    <th>Name</th>
                    <th>Region</th>
                    <th>Score</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{wine.name}</td>
                      <td>{wine.regions}</td>
                      <td>{wine.score}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="cheeseTitle">Cheese</h2>
              <div className="cheeseList">
                <table>
                  <thead className="cheeseTableHead">
                    <th className="cheeseTableHead">Type</th>
                    <th className="cheeseTableHead">Notes</th>
                  </thead>
                  {wine.cheeses.map(cheese => (
                    <tbody>
                      <tr>
                        <td className="tdCheese">{cheese.name}</td>
                        <td className="tdCheese">{cheese.rating}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          ) : (
            <div className="wineName">
              <table>
                <thead>
                  <th>Name</th>
                  <th>Region</th>
                  <th>Score</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{wine.name}</td>
                    <td>{wine.regions}</td>
                    <td>{wine.score}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <form
            className="form-horizontal"
            onSubmit={evt => props.handleAddCheese(idx, evt)}
          >
            <label className="name">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCheeseChange}
              name="cheeseName"
            />
            <label className="rating">Rating</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCheeseChange}
              name="cheeseRating"
            />
            <button type="submit">Add Cheese</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
