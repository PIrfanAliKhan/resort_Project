import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Pages/Home/Header";
import Resorts from "../Pages/Parts/Resort/Header"; // Example page
import Spa from "../Pages/Parts/Spa/Header";
import Adventure from "../Pages/Parts/Adventure/Header";
import Farmhouse from "../Pages/Parts/FormHouse/Header";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
        <Route path="/resort" element={<Resorts />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/farmhouse" element={<Farmhouse />} />
    </Routes>
  );
}

export default App;
