"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import Updateapt from "@/components/Updateapt/Updateapt";

const page = () => {
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
        <div className="container1" style={{ marginBottom: "280px" }}>
          <h2 style={{ marginBottom: "30px" }}>Update Appointments</h2>
          <Updateapt/>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
