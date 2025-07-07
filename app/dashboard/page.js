"use client";
import React, { useState } from "react";
import Image from "next/image";

import CardGrid from "@/components/Dashboard/Cardgrid";
import PatientTable from "@/components/Dashboard/PatientTable";
import RightInfoCard from "@/components/Dashboard/RightInfoCard";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

import headingbtnlogo from "@/components/images/headingbtnlogo.png";
import arrow from "@/components/images/arrow.png";

const dasboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="container1">
          {/* Welcome + Buttons */}
          <div
            style={{
              marginRight: "20px",
              display: "flex",
              flexDirection: "column",
              height: "70px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Welcome Sinnamuth</h2>
              <div className="d-flex gap-2">
                <button className="btn btn-primary d-flex align-items-center">
                  <Image
                    src={headingbtnlogo}
                    alt="Add Icon"
                    width={20}
                    height={20}
                    style={{ marginRight: "6px" }}
                  />
                  Add Appointment
                </button>
                <button className="btn btn-outline-primary d-flex align-items-center">
                  Start Tour
                  <Image
                    src={arrow}
                    alt="Arrow Icon"
                    width={25}
                    height={25}
                    style={{ marginLeft: "6px" }}
                  />
                </button>
              </div>
            </div>
            <p style={{ color: "#555", fontSize: "15px" }}>
              Track your appointments
            </p>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              padding: "0px 0px 0px 5px",
              gap: "20px",
            }}
          >
            <div style={{ width: "842px" }}>
              <CardGrid />
              <PatientTable />
            </div>
            <RightInfoCard />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default dasboard;
