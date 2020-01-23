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
              <div className="wineName"> {wine.name}</div>

              <h2 className="cheeseTitle">Cheese</h2>
              <div className="cheeseList">
                <thead>
                  <th>Name</th>
                  <th>Rating</th>
                </thead>
                {wine.cheeses.map(cheese => (
                  <tbody>
                    <tr>
                      <td>{cheese.name}</td>
                      <td>{cheese.rating}</td>
                    </tr>
                  </tbody>
                ))}
              </div>
            </div>
          ) : (
            <div className="wineName">{wine.name}</div>
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
