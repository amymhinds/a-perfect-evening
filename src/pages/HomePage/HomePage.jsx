import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";
import "./HomePage.css";
import { tsPropertySignature } from "@babel/types";

const HomePage = props => {
  return (
    <div className="HomePage">
      <h1 className="myWines">My Wines</h1>

      {props.user.wines.map((wine, idx) => (
        <div className="block">
          <h1 className="wineTitle">Wine</h1>
          {wine.cheeses && wine.cheeses.length > 0 ? (
            <div className="wineName">
              {wine.name}
              <h2 className="cheeseTitle">Cheese</h2>
              <div className="cheeseList">
                {wine.cheeses.map(cheese => (
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>Name: {cheese.name}</td>
                          <td>Rating: {cheese.rating}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>{wine.name}</div>
          )}
          <form
            className="form-horizontal"
            onSubmit={() => props.handleAddCheese(idx)}
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
            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
