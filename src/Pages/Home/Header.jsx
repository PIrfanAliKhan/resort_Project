import React from "react";
import { Link } from "react-router-dom";
import Body from "./Body";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const goToLocation = (category) => {
    navigate("/location", { state: { category } });
  };
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
          <Link to="/signin">
          <button type="button">SignIn/SignUp</button>
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="detail">
        <div className="headings">
          <ul>
            <li onClick={() => goToLocation("resort")}>
              <img src={resortimg} alt="Resort" />
              <button>Resort</button>
            </li>
            <li onClick={() => goToLocation("adventure")}>
              <img src={adventureimg} alt="Adventure" />
              <button>Adventure</button>
            </li>
            <li onClick={() => goToLocation("spa")}>
              <img src={spaimg} alt="Spa" />
              <button>Spa</button>
            </li>
            <li onClick={() => goToLocation("farmhouse")}>
              <img src={formhouseimg} alt="Farm House" />
              <button>Farm House</button>
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
