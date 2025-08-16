import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./details.css";

const Details = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return <p className="error-message">No data found for {id}.</p>;

  const {
    name,
    imageid1,
    imageid2,
    imageid3,
    imageid4,
    location,
    price,
    guests,
    roomType,
    available,
    rating,
    gst,
    about,
    details,
    Offers,
  } = state;

  const handleBookNow = () => {
    navigate("/travellerdetails", {
      state: {
        resortData: {
          name,
          location,
          price,
          gst,
          guests,
          roomType,
          image: imageid1,
        }
      }
    });
  };

  return (
    <div className="details-container">
      <h1 className="title">{name}</h1>

      <div className="content">
        <div className="image-gallery">
          <div className="main-image">
            <img src={imageid1} alt="Main" />
          </div>
          <div className="side-images">
            <img src={imageid2} alt="view 2" />
            <img src={imageid3} alt="view 3" />
            <img src={imageid4} alt="view 4" />
          </div>
        </div>

        <div className="info">
          {roomType &&(
            <div className="info-section">
              <h2>Room</h2>
              <p>{roomType}</p>
            </div>
          )}
          {rating && (
            <div className="info-section">
              <h2>Rating</h2>
              <p>{rating}</p>
            </div>
          )}
          {about && (
            <div className="info-section">
              <h2>About</h2>
              <p>{about}</p>
            </div>
          )}
          {details && (
            <div className="info-section">
              <h2>Details</h2>
              <p>{details}</p>
            </div>
          )}
          {Offers && (
            <div className="info-section">
              <h2>Offers</h2>
              <p>{Offers}</p>
            </div>
          )}
          {location && (
            <div className="info-section">
              <h2>Location</h2>
              <p>{location}</p>
            </div>
          )}
          {guests && (
            <div className="info-section">
              <h2>Guests</h2>
              <p>{guests}</p>
            </div>
          )}
          {gst && (
            <div className="info-section">
              <h2>GST</h2>
              <p>{gst}</p>
            </div>
          )}
          {price && (
            <div className="info-section">
              <h2>Price</h2>
              <p>{price}</p>
            </div>
          )}
          {available && (
            <div className="info-section">
              <h2>Available</h2>
              <p>{available}</p>
            </div>
          )}
          <div className="book-now-wrapper">
            <button className="book-now-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
