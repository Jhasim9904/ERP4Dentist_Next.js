"use client";
import React, { useState } from "react";
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Footer from '@/components/Footer/Footer';
import Doctor from '@/components/Doctor/Doctor';

const doctor = () => {
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
                  <Navbar
                    onToggleSidebar={toggleSidebar}
                    sidebarOpen={sidebarOpen}
                  />
                  <div className="container1">
                    <Doctor />
                  </div>
                  <div style={{ marginTop: "100px" }}>
                    <Footer />
                  </div>
                </div>
              </div>
  )
}

export default doctor;
