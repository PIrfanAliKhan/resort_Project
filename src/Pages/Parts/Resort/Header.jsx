import React from "react";
import { logo, heroimg } from "../../../Data/PagesData/Resortdata/content";
import "./index.css";
import { Link } from "react-router-dom";
import Body from "./Body";



const Header = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <ul>
            <li>
              <Link to="/adventure">Adventure</Link>
            </li>
            <li>
              <Link to="/spa">Spa</Link>
            </li>
            <li>
              <Link to="/farmhouse">Farm House</Link>
            </li>
          </ul>
        </nav>

        <div className="herophoto">
          <img src={heroimg} alt="heroimage" />
        </div>
      </div>

      <Body />
    </>
  );
};

export default Header;
