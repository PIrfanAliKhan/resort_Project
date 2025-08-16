import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Filter from "./Filters";
import { Home, Recommended, Popular } from "../../../Data/PagesData/Resortdata/Data";

const Body = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedLocation = location.state?.location?.toLowerCase();

  const [filterCriteria, setFilterCriteria] = useState({
    locations: [],
    price: 50000,
  });

  const handleFilter = ({ price, locations }) => {
    setFilterCriteria({ price, locations });
  };

  // Filter resorts
  const filteredResorts = Home.filter((item) => {
    const resortLocation = (item.location ?? item.Location)?.toLowerCase() || "";

    const locationMatches = selectedLocation
      ? resortLocation.includes(selectedLocation)
      : filterCriteria.locations.length === 0 ||
        filterCriteria.locations.some((loc) =>
          resortLocation.includes(loc.toLowerCase())
        );

    const resortPrice = Number(item.price) || 0;
    const priceMatches = resortPrice <= filterCriteria.price;

    return locationMatches && priceMatches;
  });

  // Group resorts by location
  const groupedResorts = filteredResorts.reduce((groups, resort) => {
    const loc = (resort.location ?? resort.Location ?? "Unknown").trim();
    if (!groups[loc]) groups[loc] = [];
    groups[loc].push(resort);
    return groups;
  }, {});

  return (
    <div className="body-container">
      {/* ---------- Caption Section ---------- */}
      <div className="caption">
        <div className="caption-content">
          <div className="caption-left">
            <h1>Welcome to Our Resorts</h1>
          </div>
          <div className="caption-right">
            <p>
              Discover exceptional destinations. Relax, rejuvenate, and explore with us.
            </p>
          </div>
        </div>
        <h3>Your getaway starts here.</h3>
      </div>

      {/* ---------- Filters + Services Section ---------- */}
      <div className="main-content">
        <div className="filter-wrapper">
          <Filter onFilter={handleFilter} />
        </div>

        <div className="services-section">
          {Object.entries(groupedResorts).map(([loc, resorts]) => (
            <div key={loc} className="location-group">
              <h2 className="location-heading">{loc}</h2>
              <div className="location-resorts">
                {resorts.map((resort, idx) => (
                  <div key={idx} className="service">
                    <div className="service-image">
                      <img src={resort.imageid1} alt={resort.name} />
                    </div>
                    <div className="service-text">
                      <h2>{resort.name}</h2>
                      <p><strong>Location:</strong> {resort.location}</p>
                      <p><strong>RoomType:</strong> {resort.roomType}</p>
                      <button
                        onClick={() =>
                          navigate(`/details/${resort.id}`, {
                            state: { ...resort }, // Pass resort data
                          })
                        }
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Recommended Section ---------- */}
      <div className="recommended">
        <h2 className="section-heading">Recommended Resorts</h2>
        <div className="recommended-scroll-container">
          {Recommended[0].items.map((item, index) => (
            <div className="recommended-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="recommended-info">
                <h3>{item.description}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Popular Section ---------- */}
      <div className="popular">
        <h2 className="section-heading">Popular Resorts</h2>
        <div className="popular-scroll-container">
          {Popular[0].items.map((item, index) => (
            <div className="popular-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="popular-info">
                <h3>{item.description}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
