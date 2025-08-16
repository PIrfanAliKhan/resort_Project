import React, { useState } from "react";
import "./index.css";
import {FeedbackData} from "../../Data/HomeData/data.jsx";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: 0,
    image: null,
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRatingSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();

    const submitData = (imageUrl = null) => {
      const newFeedback = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        feedback: formData.feedback,
        rating: formData.rating,
        imageUrl,
      };
      setFeedbacks((prev) => [newFeedback, ...prev]);
      resetForm();
      setShowForm(false);
    };

    if (formData.image) {
      reader.readAsDataURL(formData.image);
      reader.onloadend = () => {
        submitData(reader.result);
      };
    } else {
      submitData();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      feedback: "",
      rating: 0,
      image: null,
    });
  };

  return (
    <div className="feedback-wrapper">
      <button className="open-feedback-btn" onClick={() => setShowForm(true)}>
        Give Feedback
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <span className="close-btn" onClick={() => setShowForm(false)}>
              &times;
            </span>
            <h2>Feedback</h2>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="rating-container">
                <p>Select Rating:</p>
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${formData.rating > index ? "filled" : ""}`}
                      onClick={() => handleRatingSelect(index + 1)}
                    >
                      ★
                    </span>
                  ))}
                  <span className="rating-value">{formData.rating}/5</span>
                </div>
              </div>

              <textarea
                name="feedback"
                placeholder="Your Feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
              ></textarea>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

{/* Feedback Carousel */}
<div className="feedback-carousel">
  {[...FeedbackData, ...feedbacks].map((fb) => (
    <div key={fb.id} className="feedback-card">
      <h3>{fb.name}</h3>
      <p><strong>Email:</strong> {fb.email}</p>
      <p><strong>Rating:</strong> {fb.rating}/10</p>
      <p><strong>Feedback:</strong> {fb.feedback}</p>
      {fb.imageUrl && (
        <img src={fb.imageUrl} alt="Uploaded" className="feedback-img" />
      )}
    </div>
  ))}
</div>

    </div>
  );
};

export default Feedback;
