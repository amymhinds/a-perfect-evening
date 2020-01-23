import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../utils/userService";
import "./HomePage.css";
import { tsPropertySignature } from "@babel/types";

const HomePage = props => {
  console.log("user wines ", props.user);
  return (
    <div className="HomePage">
      <NavBar user={props.user} handleLogout={props.handleLogout} />
      <h1>My Wines</h1>
      {props.user.wines.map((wine, idx) => (
        <div>
          {wine.name}
          {wine.cheeses.map(cheese => (
            <div>
              name: {cheese.name}
              name: {cheese.rating}
            </div>
          ))}
          <div>
            <form
              className="form-horizontal"
              onSubmit={userService.addCheeseToWine(idx, props.user, {
                name: "name",
                rating: "rating"
              })}
            ></form>
            >
            <input
              type="text"
              className="form-control"
              value="name"
              name="name"
            />
            <input
              type="text"
              className="form-control"
              value="rating"
              name="rating"
            />
          </div>
          ))}
          <button type="submit">Submit</button>{" "}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
