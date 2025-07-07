"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Customerprofile/Container";
const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("History");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <div className="app-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        <div className="main-content">
          <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <div className="container1">
            <Container activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
