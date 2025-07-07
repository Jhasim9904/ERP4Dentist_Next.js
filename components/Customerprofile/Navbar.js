import React from "react";
import "./Navbar.css";
import menuIcon from "../images/dp.png"; // hamburger icon or image you use

const Navbar = ({ onToggleSidebar , sidebarOpen}) => {
  return (
    <div className="sticky-top">
      <nav className="navbar custom-navbar">
        <div className="container-fluid d-flex align-items-center justify-content-between">
      <button className="btn btn-outline-primary me-3" onClick={onToggleSidebar}>
        {sidebarOpen?"X":"☰"}
      </button>
          {/* <img
            src={menuIcon}
            alt="menu"
            onClick={onToggleSidebar}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          /> */}

          <form className="nav-search d-flex">
            <input
              className="form-control inp"
              type="search"
              placeholder="Search"
            />
          </form>

          <div className="d-flex align-items-center">
            <img src={menuIcon} alt="user" className="dp mx-2" />
            <div>
              <div className="navfont">Username</div>
              <div style={{ fontSize: "12px", color: "gray" }}>Admin</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
