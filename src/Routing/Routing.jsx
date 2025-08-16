import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Pages/Home/Header";
import Resorts from "../Pages/Parts/Resort/Header"; 
import Spa from "../Pages/Parts/Spa/Header";
import Adventure from "../Pages/Parts/Adventure/Header";
import Farmhouse from "../Pages/Parts/FormHouse/Header";
// import ResortDetails from "../Pages/Details/resort";
// import AdventureDetails from "../Pages/Details/adventure";
// import SpaDetails from "../Pages/Details/spa";
// import FarmhouseDetails from "../Pages/Details/farmhouse";
import Details from "../Pages/Details/details"; 
import Payments from "../Pages/Payment/payment";
import Travellerdetails from "../Pages/Details/travellerdetails";
import Location from "../Pages/Location/location"
import Paymentmethod from "../Pages/Payment/paymentmethods";
import Signin from "../Credentials/Signin/Signin";
import Signup from "../Credentials/Signup/Signup";
import ForgotPassword from "../Credentials/ForgotPassword/ForgotPassword"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
        <Route path="/resort" element={<Resorts />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/farmhouse" element={<Farmhouse />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/travellerdetails" element={<Travellerdetails/>}/>
        <Route path="/payment" element={<Payments/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/paymentmethod" element={<Paymentmethod/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  );
}

export default App;
