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
const categories = [
  "Doctors",
  "Branchers",
  "Lab",
  "Payment",
  "Appointments",
  "Patient Records",
];

const CardGrid = () => {
  return (
    <div className="card-grid-container">
      {cardImages.map((img, index) => (
        <div className="card-grid-item" key={index}>
          <div className="d-flex">
            {/* Card Image */}
            <Image
              className="d-flex"
              src={img}
              alt={`Card ${index + 1}`}
              width={60}
              height={60}
            />

            {/* Text */}
            <div className="mx-3">
              <div>{categories[index]}</div>
              <div style={{ fontSize: "25px" }}>10</div>
            </div>

            {/* Arrow Icon */}
            <div
              style={{
                marginTop: "15px",
                marginLeft:
                  categories[index] === "Patient Records" ||
                  categories[index] === "Appointments"
                    ? "20px"
                    : "60px",
              }}
            >
              <Image src={arrow} alt="Arrow Icon" width={30} height={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
