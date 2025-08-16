import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Home, Recommended, Popular } from "../../Data/HomeData/data";
import { Carousel } from "react-responsive-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Service image carousel
const ServiceCarousel = ({ images }) => (
  <div className="carousel-wrapper">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      stopOnHover
      swipeable
    >
      {images.map((src, idx) => (
        <div key={idx} className="carousel-slide">
          <img src={src} alt={`slide-${idx}`} />
        </div>
      ))}
    </Carousel>
  </div>
);

// Horizontal carousel for Recommended
const HorizontalCarousel = ({ title, items }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = containerRef;
    if (!current) return;
    const scrollAmount = current.offsetWidth - 100; // small gap for better flow
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="recommendation-block">
      <div className="recommendation-header">
        <h2>{title}</h2>
        <div className="carousel-controls">
          <button className="arrow-btn" onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>
          <button className="arrow-btn" onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="recommendation-carousel" ref={containerRef}>
        {items.map((item, idx) => (
          <div className="recommendation-card" key={idx}>
            <div className="background-gradient">
              <img
                src={item.image}
                className="product-image"
                alt={item.description}
              />
              <h3 className="product-title">{item.title}</h3>
              <p className="product-description">{item.description}</p>
              <div className="buy-button">
                Book Now <span className="price-tag">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3D Popular carousel
const Popular3DCarousel = ({ category }) => {
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{category.name}</h2>
      <div className="carousel-3d">
        {category.items.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="carousel-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="price">Book Now {item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="body-container">
      {/* Services Section */}
      <div className="services" id="services">
        {Home.map((service, index) => {
          const images = [
            service.imageid1,
            service.imageid2,
            service.imageid3,
            service.imageid4,
          ];
          const isEven = index % 2 === 0;

          return (
            <div
              className={`service-section ${isEven ? "left-image" : "right-image"}`}
              key={service.id}
            >
              <div className="service-carousel-container">
                <ServiceCarousel images={images} />
              </div>
              <div className="service-description">
                <h2 className="service-name">{service.name}</h2>
                <p>{service.description}</p>
                <button
                  className="book-now-btn"
                  onClick={() =>
                    navigate(`/${service.name.replace(/\s+/g, "").toLowerCase()}`, {
                      state: service,
                    })
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Section */}
      <div className="recommended-section">
        <h1>Recommended</h1>
        {Recommended.map((category, idx) => (
          <HorizontalCarousel
            key={idx}
            title={`Recommended ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}
            items={category.items}
          />
        ))}
      </div>

      {/* Popular Section */}
      <section className="popular-section">
        <h1 className="section-heading">Popular Picks</h1>
        {Popular.map((category, index) => (
          <Popular3DCarousel key={index} category={category} />
        ))}
      </section>
    </div>
  );
};

export default Body;
