import React, { useState } from "react";
import "./Signin.css";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [ownerData, setOwnerData] = useState({ username: "", password: "" });
  const [userData, setUserData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleOwnerChange = (e) => {
    setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    alert(`Owner login as: ${ownerData.username}`);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    alert(`User login as: ${userData.username}`);
  };

  return (
    <div className="signin-container">
      {/* Owner Section */}
      <div className="signin-section owner-bg">
        <div className="overlay"></div>
        <FaArrowLeft className="back-arrow" onClick={() => navigate("/")} />
        <div className="signin-card">
          <h1>Owner Login</h1>
          <p className="subtitle">Sign in to manage your properties</p>
          <form onSubmit={handleOwnerSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={ownerData.username}
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
            <p className="forgot-text">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <button type="submit" className="signin-btn">Sign In</button>
          </form>
          <p className="account-text">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>

      {/* User Section */}
      <div className="signin-section user-bg">
        <div className="overlay"></div>
        <div className="signin-card">
          <h1>User Login</h1>
          <p className="subtitle">Sign in to continue your journey</p>
          <form onSubmit={handleUserSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
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
            <p className="forgot-text">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <button type="submit" className="signin-btn">Sign In</button>
          </form>
          <p className="account-text">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
