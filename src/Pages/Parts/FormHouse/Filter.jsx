import React, { useState } from "react";
import "./index.css";

const Filter = ({ onFilter }) => {
  const [price, setPrice] = useState(50000); // default max price
  const [selectedLocations, setSelectedLocations] = useState([]);

  const locations = [
    "Andhra Pradesh",
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Kolkata",
    "Pune"
  ];

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    if (e.target.checked) {
      setSelectedLocations((prev) => [...prev, location]);
    } else {
      setSelectedLocations((prev) => prev.filter((loc) => loc !== location));
    }
  };

  const handleSubmit = () => {
    onFilter({
      price,
      locations: selectedLocations,
    });
  };

  return (
    <div className="filter-wrapper">
      <div className="filter">
        <h2>Filter</h2>
        <div className="filter-options">
          <div className="filter-group">
            <h2>Location</h2>
            {locations.map((loc, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  value={loc}
                  onChange={handleLocationChange}
                />{" "}
                {loc}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h2>Price range</h2>
            <input
              type="range"
              min="1"
              max="50000"
              value={price}
              onChange={handlePriceChange}
            />
            <div className="price-range-wrapper">
              <input type="number" placeholder="min" value={1} readOnly />
              <p>-</p>
              <input type="number" placeholder="max" value={price} readOnly />
            </div>
          </div>

          <div className="Submit-button">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
