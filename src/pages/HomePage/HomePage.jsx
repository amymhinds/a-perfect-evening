import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";
import "./HomePage.css";
import { tsPropertySignature } from "@babel/types";

const HomePage = props => {
  console.log("cheeseeee", props.cheeseName);
  return (
    <div className="HomePage">
      <h1>My Wines</h1>
      {props.user.wines.map((wine, idx) => (
        <div>
          {wine.cheeses && wine.cheeses.length > 0 ? (
            <div>
              {wine.name}
              {wine.cheeses.map(cheese => (
                <div>
                  name: {cheese.name}
                  name: {cheese.rating}
                </div>
              ))}
            </div>
          ) : (
            <div>{wine.name}</div>
          )}
          <form
            className="form-horizontal"
            onSubmit={() => props.handleAddCheese(idx)}
          >
            <input
              type="text"
              className="form-control"
              onChange={props.handleCheeseChange}
              name="cheeseName"
            />
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
