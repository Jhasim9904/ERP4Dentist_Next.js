"use client";
import React from "react";
import Image from "next/image";
import "./Cardgrid.css";

import card1 from "../images/cardimg/card1.png";
import card2 from "../images/cardimg/card2.png";
import card3 from "../images/cardimg/card3.png";
import card4 from "../images/cardimg/card4.png";
import card5 from "../images/cardimg/card5.png";
import card6 from "../images/cardimg/card6.png";
import arrow from "../images/arrow.png";

const cardImages = [card1, card2, card3, card4, card5, card6];

// These keys must match your API response field names exactly
const categories = [
  { label: "Doctors", key: "doctorlist" },
  { label: "Branches", key: "to_branch" },
  { label: "Lab", key: "to_labworks" },
  { label: "Payment", key: "to_treatments" }, // Adjust if needed
  { label: "Appointments", key: "to_appointment" },
  { label: "Patient Records", key: "to_clinical" },
];

const CardGrid = ({ dashboardCounts = {} }) => {
  return (
    <div className="card-grid-container">
      {cardImages.map((img, index) => (
        <div className="card-grid-item" key={index}>
          <div className="d-flex align-items-center">
            <Image src={img} alt={`Card ${index + 1}`} width={60} height={60} />
            <div className="mx-3">
              <div>{categories[index].label}</div>
              <div style={{ fontSize: "25px" }}>
                {
                  categories[index].key === "doctorlist"
                    ? dashboardCounts["doctorlist"]?.length ?? 0
                    : dashboardCounts[categories[index].key] ?? 0
                }
              </div>
            </div>
            <div className="ml-auto mt-2">
              <Image src={arrow} alt="Arrow Icon" width={30} height={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
