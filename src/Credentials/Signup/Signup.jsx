import React, { useState } from "react";
import "./Signup.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Signup() {
  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleOwnerChange = (e) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    alert(`Owner Account Created: ${ownerData.name}`);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    alert(`User Account Created: ${userData.name}`);
  };

  return (
    <div className="dual-signup-container">
      {/* Owner Signup */}
      <div className="signup-section owner-section">
        <div className="overlay"></div>
        <div className="signup-card">
          <h1>Owner Signup</h1>
          <p className="subtitle">Register your property with us</p>
          <form onSubmit={handleOwnerSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={ownerData.name}
                onChange={handleOwnerChange}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={ownerData.email}
                onChange={handleOwnerChange}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={ownerData.password}
                onChange={handleOwnerChange}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={ownerData.confirmPassword}
                onChange={handleOwnerChange}
                required
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
            <p className="signin-text">
              Already have an account? <a href="/signin">Sign In</a>
            </p>

          </form>
        </div>
      </div>

      {/* User Signup */}
      <div className="signup-section user-section">
        <div className="overlay"></div>
        <div className="signup-card">
          <h1>User Signup</h1>
          <p className="subtitle">Join us and start your journey</p>
          <form onSubmit={handleUserSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={userData.name}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleUserChange}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={userData.confirmPassword}
                onChange={handleUserChange}
                required
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
            <p className="signin-text">
              Already have an account? <a href="/signin">Sign In</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
