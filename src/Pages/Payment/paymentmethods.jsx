import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import "./payment.css";

const Payments = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiApp, setUpiApp] = useState(null);

  const paymentMethods = [
    { id: "upi", label: "UPI" },
    { id: "card", label: "Credit/Debit Card" },
    { id: "netbanking", label: "Net Banking" },
    { id: "cash", label: "Cash on Arrival" },
  ];

  const upiApps = [
    { id: "gpay", label: "Google Pay", upiId: "irfanalikhanp9@oksbi" },
    { id: "phonepe", label: "PhonePe", upiId: "6303412886-3@ybl" },
    { id: "paytm", label: "Paytm", upiId: "6303412886@ptsbi" },
  ];

  const generateUpiLink = (upiId) => {
    return `upi://pay?pa=${upiId}&pn=ResortBooking&am=${totalAmount}&cu=INR`;
  };

  const methodDetails = {
    upi: (
      <div>
        <h3>UPI Payment</h3>
        {!upiApp ? (
          <>
            <p>Select your UPI app:</p>
            {upiApps.map((app) => (
              <button key={app.id} onClick={() => setUpiApp(app)}>
                {app.label}
              </button>
            ))}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h4>Scan to Pay with {upiApp.label}</h4>
            <QRCodeCanvas value={generateUpiLink(upiApp.upiId)} size={200} />

            <p>
              <a href={generateUpiLink(upiApp.upiId)}>
                Click here if you are on mobile
              </a>
            </p>
            <button onClick={() => setUpiApp(null)}>Change UPI App</button>
          </div>
        )}
      </div>
    ),
    card: (
      <div>
        <h3>Card Payment</h3>
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="MM/YY" />
        <input type="text" placeholder="CVV" />
        <button>Pay Now</button>
      </div>
    ),
    netbanking: (
      <div>
        <h3>Net Banking</h3>
        <select>
          <option>Select Bank</option>
          <option>SBI</option>
          <option>HDFC</option>
          <option>ICICI</option>
        </select>
        <button>Proceed</button>
      </div>
    ),
    cash: (
      <div>
        <h3>Cash on Arrival</h3>
        <p>You will pay at the resort reception.</p>
      </div>
    ),
  };

  return (
    <div className="payments-container">
      {/* Total amount */}
      <div className="total-amount-box">
        <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
      </div>

      {/* Payment section */}
      <div className="payment-section">
        {/* Left side: list */}
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`method ${selectedMethod === method.id ? "active" : ""}`}
              onClick={() => {
                setSelectedMethod(method.id);
                setUpiApp(null); // Reset UPI app selection
              }}
            >
              {method.label}
            </div>
          ))}
        </div>

        {/* Right side: details */}
        <div className="payment-details">
          {selectedMethod ? (
            methodDetails[selectedMethod]
          ) : (
            <p>Select a payment method to continue</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
