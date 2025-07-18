"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Container from "@/components/Customerprofile/Container";
import { DefaultCustomerProfilePage } from "../page";

export default function PatientProfilePage() {
  const { encodedId } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("History");
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Sidebar state

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `https://testing.erp4dentist.com/api/patientinfo/${encodedId}`
        );
        const data = await response.json();

        if (
          !data ||
          !data.patientinformations ||
          data.patientinformations.length === 0
        ) {
          setPatientDetails(null);
        } else {
          const patient = {
            ...data.patientinformations[0],
            examination: data.examination || [],
            observ: data.observ || [],
            plan: data.plan || [],
            note: data.note || [],
            prescription: data.prescription || [],
            planbill: data.planbill || [],
            bills: data.bills || [],
            receipt: data.receipt || [],
            lab: data.lab || [],
            invoiceplan: data.invoiceplan || [],
            invoiceplan_total: data.invoiceplan?.reduce(
              (sum, item) => sum + Number(item.invoice_amt || 0),
              0
            ),
          };
          console.log("✅ Final patient_details passed to container:", patient);
          setPatientDetails(patient);
        }
      } catch (error) {
        console.error("❌ Error fetching patient info", error);
        setPatientDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [encodedId]);

  if (loading) return <p>Loading patient details...</p>;

  if (!patientDetails) {
    return <DefaultCustomerProfilePage />;
  }

  const fallbackHistory = [
    {
      date: patientDetails.startDate,
      notes: `Visited for ${patientDetails.appointment_type}`,
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
          <Navbar
            onToggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
          />
          <div className="container1">
            <Container
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              patient_details={patientDetails}
              historyData={fallbackHistory}
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
