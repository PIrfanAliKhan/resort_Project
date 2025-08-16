import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./payment.css";

const PaymentsPage = () => {
  const location = useLocation();
  const resortData = location.state?.resortData;
  const userData = location.state?.userData;

  if (!resortData || !userData) {
    return <p>Missing data. Please go back and complete the form.</p>;
  }

  const gstRate = parseFloat(resortData.gst) / 100;
  const gstAmount = resortData.price * gstRate;
  const totalAmount = resortData.price + gstAmount;

  return (
    <div className="payments-page">
      <h1>Payment</h1>

      <div className="payment-section">
        {/* Left Side: Resort Image & Traveller Info */}
        <div className="payment-left">
          <img src={resortData.image} alt="Room" className="payment-image" />
          <div className="traveller-info">
            <h3>Traveller Info</h3>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Adults:</strong> {userData.adults}</p>
            <p><strong>Children:</strong> {userData.children}</p>
          </div>
        </div>

        {/* Right Side: Price Details */}
        <div className="payment-right">
          <label>Price:</label>
          <p>₹{resortData.price}</p>

          <label>GST:</label>
          <p>{resortData.gst}</p>

          <label>Total:</label>
          <p><strong>₹{totalAmount.toFixed(2)}</strong></p>

          {/* Passing totalAmount to payment methods */}
          <button className="continue-button">
            <Link to="/paymentmethod" state={{ totalAmount }}>
              Continue
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
