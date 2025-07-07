"use client";
import React from "react";
import Image from "next/image";
import "./Navbar.css";
import MyImage from "../images/Frame.png";
import MyImage2 from "../images/Frame2.png";
import MyImage3 from "../images/Frame3.png";
import logo from "../images/logo.png";
import dp from "../images/dp.png";

const Navbar = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <div className="sticky-top">
      <nav className="custom-navbar navbar navbar-expand-lg navbar-light">
        <div className="container-fluid m-3 d-flex">
          {/* Sidebar Toggle Button (optional) */}
          {/* <button className="btn btn-outline-primary me-3" onClick={onToggleSidebar}>
            {sidebarOpen ? "X" : "☰"}
          </button> */}

          {/* Brand Logo */}
          <a className="navbar-brand" href="#">
            <Image src={logo} alt="Logo" width={100} height={40} />
          </a>

          {/* Search Bar */}
          <form className="d-flex nav-search" role="search">
            <input
              style={{ width: "500px" }}
              className="form-control me-2 mx-4"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {/* Icons + Clinic Info + DP */}
          <div className="Navicons">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse pd-4" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  <Image src={MyImage} alt="Icon 1" width={24} height={24} />
                </li>
                <li className="nav-item mx-2">
                  <Image src={MyImage2} alt="Icon 2" width={24} height={24} />
                </li>
                <li className="nav-item mx-2">
                  <Image src={MyImage3} alt="Icon 3" width={24} height={24} />
                </li>
                <li className="nav-item mx-2">
                  <div className="d-flex flex-column navfont">
                    <span>Dental Clinic</span>
                    <span style={{ color: "green" }}>Online</span>
                  </div>
                </li>
                <li className="nav-item dp">
                  <Image src={dp} alt="User DP" width={40} height={40} className="dp" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
