import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import wineService from "../../utils/wineService";
import "./HomePage.css";

const HomePage = props => {
  return (
    <div className="HomePage">
      <NavBar user={props.user} handleLogout={props.handleLogout} />
      <h1>My Wines</h1>
    </div>
  );
};

export default HomePage;
