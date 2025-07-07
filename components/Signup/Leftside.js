import React from "react";
import Image from "next/image";
import "./Leftside.css";
import Teeth from '../images/Teeth.png'
import Rectangle from '../images/Rectangle.png'
const Leftside = () => {
  return (
    <div className="leftside">
      <div>
        <h1 style={{ color: "#FFFFFF" }}>Transform The Way You</h1>
        <h1 style={{ color: "#FFFFFF" }}>Manage Your Clinic</h1>

        <div
          style={{
            color: "#FFFFFF",
            margin: "20px 0px 2px 0px",
            fontWeight: "normal",
            fontSize: "20px",
          }}
        >
          Join hundreds of dentists using ERP4Dentist to
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontWeight: "normal",
            fontSize: "20px",
          }}
        >
          streamline your practice today!
        </div>

        <div className="img">
          <Image
            src={Teeth}
            alt="Teeth Image"
            width={350}
            height={380}
          />
          <div className="d-inline">
            <Image
              src={Rectangle}
              alt="Decorative Rectangle"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftside;
