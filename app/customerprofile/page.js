"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Customerprofile/Container";

// 👇 Named export for reuse in [id]/page.js
export function DefaultCustomerProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("History");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ✅ Provide safe dummy data for sample patient
  const fallbackPatientDetails = {
    name: "Sample Patient",
    examination: [
      {
        summary: "No examination data available",
        date: "N/A",
      },
    ],
    treatment: [],
    observation: [],
    notes: [],
  };

  const fallbackHistoryData = [
    {
      date: "2025-07-01",
      notes: "No prior records available for this patient.",
    },
  ];

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
            <Container
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              patient_details={fallbackPatientDetails}
              historyData={fallbackHistoryData}
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

// 👇 Default export for /customerprofile route
export default DefaultCustomerProfilePage;
