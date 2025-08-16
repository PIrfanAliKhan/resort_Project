import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./location.css";

export default function Location() {
  const [search, setSearch] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const category = state?.category || "resort";

  // Master list with images (add placeholders for those without)
  const cityData = [
    { name: "Mumbai", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gateway_of_India_Mumbai_2016_img3.jpg" },
    { name: "Delhi", image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/India_Gate_in_New_Delhi_03-2016_img3.jpg" },
    { name: "Bengaluru", image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Vidhana_Soudha_Bangalore.jpg" },
    { name: "Hyderabad", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Charminar_Hyderabad_2016_img3.jpg" },
    { name: "Chennai", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Marina_Beach_Chennai.jpg" },
    { name: "Ahmedabad", image: "https://via.placeholder.com/200" },
    { name: "Bhopal", image: "https://via.placeholder.com/200" },
    { name: "Chandigarh", image: "https://via.placeholder.com/200" },
    { name: "Delhi", image: "https://via.placeholder.com/200" },
    { name: "Goa", image: "https://via.placeholder.com/200" },
    { name: "Kerala", image: "https://via.placeholder.com/200" },
    { name: "Indore", image: "https://via.placeholder.com/200" },
    { name: "Jaipur", image: "https://via.placeholder.com/200" },
    { name: "Kolkata", image: "https://via.placeholder.com/200" },
    { name: "Lucknow", image: "https://via.placeholder.com/200" },
    { name: "Nagpur", image: "https://via.placeholder.com/200" },
    { name: "Pune", image: "https://via.placeholder.com/200" },
    { name: "Surat", image: "https://via.placeholder.com/200" },
    { name: "Thiruvananthapuram", image: "https://via.placeholder.com/200" },
    { name: "Visakhapatnam", image: "https://via.placeholder.com/200" }
  ];

  // Filter all cities in one go
  const filteredCities = cityData.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCity = (city) => {
    navigate(`/${category}`, { state: { location: city } });
  };

  return (
    <div className="location-page">
      <h1>Select Your City</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for your city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="detect-location" onClick={() => alert("Detecting location...")}>
        📍 Detect My Location
      </button>

      <div className="popular-cities">
        {filteredCities.length > 0 ? (
          filteredCities.map((city, index) => (
            <div
              key={index}
              className="city-card"
              onClick={() => handleSelectCity(city.name)}
            >
              <img src={city.image} alt={city.name} />
              <p>{city.name}</p>
            </div>
          ))
        ) : (
          <p>No cities found</p>
        )}
      </div>
    </div>
  );
}
