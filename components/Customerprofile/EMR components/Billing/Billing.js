import React, { useState } from "react";
import "./Billing.css";
import ConfirmedTreatments from "./ConfirmedTreatments";
import Bills from "./Bills";
import Receipts from "./Receipts";

const Billing = ({ data = [], bills = [], receipts = [] }) => {
  const [activeComponent, setActiveComponent] = useState("confirmed");

  const handleTabChange = (tabName) => {
    setActiveComponent(tabName);
  };

  return (
    <div className="confirmed-container">
      <div className="tabs">
        <button
          className={`tab-btn ${
            activeComponent === "confirmed" ? "active" : ""
          }`}
          onClick={() => handleTabChange("confirmed")}
        >
          Confirmed Treatments
        </button>
        <button
          className={`tab-btn ${activeComponent === "bills" ? "active" : ""}`}
          onClick={() => handleTabChange("bills")}
        >
          Bills
        </button>
        <button
          className={`tab-btn ${
            activeComponent === "receipts" ? "active" : ""
          }`}
          onClick={() => handleTabChange("receipts")}
        >
          Receipts
        </button>
      </div>

      {activeComponent === "confirmed" && <ConfirmedTreatments data={data} />}
      {activeComponent === "bills" && <Bills data={bills} />}
      {activeComponent === "receipts" && <Receipts data={receipts} />}
    </div>
  );
};

export default Billing;
