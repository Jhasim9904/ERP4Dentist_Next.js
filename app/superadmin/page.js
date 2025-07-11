"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

import headingbtnlogo from "@/components/images/headingbtnlogo.png";
import arrow from "@/components/images/arrow.png";

import { useTour } from "@/context/TourContext"; // ✅ Import the tour context
import SAdminDashboard from "@/components/SuperAdmin/SAdminDashboard";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { startTour } = useTour(); // ✅ Access startTour function

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
            <SAdminDashboard/>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
