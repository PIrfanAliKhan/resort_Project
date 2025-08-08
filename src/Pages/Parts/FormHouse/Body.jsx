import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useLocation } from "react-router-dom";
import { Home, Recommended, Popular } from "../../../Data/PagesData/FormhouseData/data";

import Filter from "./Filter";
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

  const filterformhouse = Home.filter((item) => {
    const formhouseLocation = (item.location ?? item.Location)?.toLowerCase() || "";

    // Check location (either from URL or from filter)
    const locationMatches =
      selectedLocation
        ? formhouseLocation.includes(selectedLocation)
        : filterCriteria.locations.length === 0 ||
        filterCriteria.locations.some((loc) =>
          formhouseLocation.includes(loc.toLowerCase())
        );

    // Check price
    const formhousePrice = Number(item.price) || 0; // Assuming price is in item.price
    const priceMatches = formhousePrice <= filterCriteria.price;

    return locationMatches && priceMatches;
  });
  return (
    <div className="body-container">
      {/* ---------- Top Caption ---------- */}
      <div className="caption">
        <div className="caption-content">
          <div className="caption-left">
            <h1>Welcome to Our formhouses</h1>
          </div>
          <div className="caption-right">
            <p>
              Discover exceptional destinations. Relax, rejuvenate, and explore
              with us.
            </p>
          </div>
        </div>
        <h3>Your getaway starts here.</h3>
      </div>

      {/* ---------- Services Section ---------- */}
      <div className="main-content">
        <div className="filter-wrapper">
          <Filter onFilter={handleFilter} />
        </div>

        <div className="services-section">
          {filterformhouse.length > 0 ? (
            filterformhouse.map((formhouse, idx) => (
              <div key={idx} className="service">
                <div className="service-image">
                  <img src={formhouse.imageid1} alt={formhouse.name} />
                </div>
                <div className="service-text">
                  <h2>{formhouse.name}</h2>
                  <p>
                    <strong>Location:</strong> {formhouse.location}
                  </p>
                  <p>
                    <strong>About:</strong> {formhouse.about}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/formhouse-details/${formhouse.id}`, {
                        state: formhouse,
                      })
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No formhouses match your filters.</p>
          )}
        </div>
      </div>

      {/* ---------- Recommended Section ---------- */}
      <div className="recommended">
        <h2 className="section-heading">Recommended formhouses</h2>
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
        <h2 className="section-heading">Popular formhouses</h2>
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
