import React from "react";
import { Link } from "react-router-dom";
import Body from "./Body";
import Feedback from "./Feedback";
import {
  heroimg,
  logo,
  resortimg,
  adventureimg,
  formhouseimg,
  spaimg,
} from "../../Data/HomeData/content";
import "./index.css";

function Header() {
  return (
    <div className="header-wrapper">
      {/* Hero Image */}
      <div className="heroimg">
        <img src={heroimg} alt="Hero" />
      </div>

      {/* Navigation */}
      <div className="nav">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="nav-links">
          <button type="button">SignIn/SignUp</button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="detail">
        <div className="headings">
          <ul>
            <li>
              <img src={resortimg} alt="Resort" />
              <Link to="/resort">
                <button>Resort</button>
              </Link>
            </li>
            <li>
              <img src={adventureimg} alt="Adventure" />
              <Link to="/adventure">
                <button>Adventure</button>
              </Link>
            </li>
            <li>
              <img src={spaimg} alt="Spa" />
              <Link to="/spa">
                <button>Spa</button>
              </Link>
            </li>
            <li>
              <img src={formhouseimg} alt="Farm House" />
              <Link to="/farmhouse">
                <button>Farm House</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Caption Section */}
      <div className="caption">
        <div className="caption-content">
          <h1>Welcome to Your Perfect Getaway</h1>
          <p>Explore top resorts, spas, adventures, and farmhouses tailored for your escape.</p>
          <h3>Let’s start your journey</h3>
        </div>
      </div>

      {/* Main Content */}
      <Body />
      <Feedback />

      {/* Footer Section */}
    </div>
  );
}

export default Header;
