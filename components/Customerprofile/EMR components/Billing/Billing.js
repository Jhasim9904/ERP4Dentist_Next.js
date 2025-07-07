import React, { useState } from "react";
import "./Billing.css";
import { FaEdit } from "react-icons/fa";
import ConfirmedTreatments from "./ConfirmedTreatments";
import Bills from "./Bills";
import Receipts from "./Receipts";

const Billing = () => {
  const [activeComponent, setActiveComponent] = useState("confirmed");
    const handleTabChange = (tabName) => {
    setActiveComponent(tabName);
  };

  const data = [
    {
      planNo: 1,
      planDate: "2025-04-17",
      toothNumbers: "18, 17, 16, 42",
      procedureType: "Braces Consulting",
      cost: 700,
      discount: 100,
      treatmentCost: 700,
      invoicedAmount: 560,
      balanceAmount: 240,
      confirmed: true,
    },
  ];

  return (
    <div className="confirmed-container">
 <div className="tabs">
        <button
          className={`tab-btn ${activeComponent === "confirmed" ? "active" : ""}`}
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
          className={`tab-btn ${activeComponent === "receipts" ? "active" : ""}`}
          onClick={() => handleTabChange("receipts")}
        >
          Receipts
        </button>
      </div>

      {activeComponent === "confirmed" && <ConfirmedTreatments />}
      {activeComponent === "bills" && <Bills/>}
      {activeComponent === "receipts" && <Receipts />}
    </div>
  );
};

export default Billing;
