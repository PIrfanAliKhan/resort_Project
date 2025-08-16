import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./travellerdetails.css";

const TravellerDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 0,
    children: 0,
    adultDetails: [],
    childDetails: []
  });

  const navigate = useNavigate();
  const { state } = useLocation();
  const resortData = state?.resortData;

  if (!resortData) {
    return <p>No resort data found.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "adults" || name === "children" ? parseInt(value) || 0 : value
    }));
  };

  const handleAdultDetailChange = (index, field, value) => {
    const updatedAdults = [...formData.adultDetails];
    updatedAdults[index] = { ...updatedAdults[index], [field]: value };
    setFormData((prev) => ({ ...prev, adultDetails: updatedAdults }));
  };

  const handleChildDetailChange = (index, field, value) => {
    const updatedChildren = [...formData.childDetails];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setFormData((prev) => ({ ...prev, childDetails: updatedChildren }));
  };

  const handleAdultsCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      adults: count,
      adultDetails: Array(count).fill({ name: "", gender: "" })
    }));
  };

  const handleChildrenCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      children: count,
      childDetails: Array(count).fill({ name: "" })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        resortData,
        userData: formData
      }
    });
  };

  return (
    <div className="traveller-page">
      <nav className="navbar">
        <div className="navbar-left">Resort</div>
        <div className="navbar-right">
          <button><Link to='/resort'>Resort</Link></button>
          <button><Link to='/adventure'>Adventure</Link></button>
          <button><Link to='/spa'>Spa</Link></button>
          <button><Link to='/farmhouse'>Farm House</Link></button>
        </div>
      </nav>

      <div className="form-container">
        <h2 className="form-heading">Traveller Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-body">
  {/* LEFT SIDE */}
  <div className="form-left">
    <label>Name:</label>
    <input name="name" type="text" onChange={handleChange} required />

    <label>Email:</label>
    <input name="email" type="email" onChange={handleChange} required />

    <label>Phone Number:</label>
    <input name="phone" type="tel" onChange={handleChange} required />

    <label>Adults (5+ years):</label>
    <input
      name="adults"
      type="number"
      min="0"
      value={formData.adults}
      onChange={handleAdultsCountChange}
      required
    />

    <label>Children (below 5):</label>
    <input
      name="children"
      type="number"
      min="0"
      value={formData.children}
      onChange={handleChildrenCountChange}
      required
    />
  </div>

  {/* RIGHT SIDE */}
  <div className="form-right">
    {formData.adults > 0 && (
      <>
        <h3>Adult Details</h3>
        {formData.adultDetails.map((adult, index) => (
          <div key={index} className="traveller-subform">
            <h4>Adult {index + 1}</h4>
            <label>Name:</label>
            <input
              type="text"
              value={adult.name}
              onChange={(e) =>
                handleAdultDetailChange(index, "name", e.target.value)
              }
              required
            />
            <label>Gender:</label>
            <select
              value={adult.gender}
              onChange={(e) =>
                handleAdultDetailChange(index, "gender", e.target.value)
              }
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ))}
      </>
    )}

    {formData.children > 0 && (
      <>
        <h3>Child Details</h3>
        {formData.childDetails.map((child, index) => (
          <div key={index} className="traveller-subform">
            <h4>Child {index + 1}</h4>
            <label>Name:</label>
            <input
              type="text"
              value={child.name}
              onChange={(e) =>
                handleChildDetailChange(index, "name", e.target.value)
              }
              required
            />
          </div>
        ))}
      </>
    )}
  </div>
</div>


          <div className="form-submit-wrapper">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravellerDetails;
