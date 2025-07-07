import React, { useState } from "react";
import "./Sidebar.css";

import frame1 from "../images/Frame (1).png";
import frame2 from "../images/Frame (2).png";
import frame3 from "../images/Frame (3).png";
import frame4 from "../images/Frame (4).png";
import frame5 from "../images/Frame (5).png";
import frame6 from "../images/Frame (6).png";
import frame7 from "../images/Frame (7).png";
import frame8 from "../images/Frame (8).png";
import frame9 from "../images/Frame (9).png";
import frame10 from "../images/Frame (10).png";
import help from "../images/help.png";
import vector from "../images/Vector (1).png";
import { Link } from "react-router-dom";

const items = [
  { label: "Dashboard", icon: frame1 },
  { label: "Patients", icon: frame2 },
  { label: "Appointments", icon: frame3 },
  { label: "Doctors", icon: frame4 },
  { label: "Billing", icon: frame5 },
  { label: "Reports", icon: frame6 },
  { label: "Settings", icon: frame7 },
  { label: "Messages", icon: frame8 },
  { label: "Notifications", icon: frame9 },
  { label: "Help", icon: frame10 },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {items.map((item, index) => (
        <Link to={`/${item.label}`} key={index}>
          <button className="sidebar-btn">
            <img src={item.icon} alt={item.label} className="menu-icon" />
            {isOpen && <span>{item.label}</span>}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
