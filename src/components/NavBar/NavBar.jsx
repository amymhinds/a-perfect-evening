import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    <div className="NavBar">
      <div>
        <Link to="/login" className="NavBar-link">
          LOG IN
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/signup" className="NavBar-link">
          SIGN UP
        </Link>
      </div>
      ;
    </div>
  );
};

export default NavBar;
