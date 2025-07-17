// app\customerprofile\[encodedId]\page.js
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/Customerprofile/Container";
import { DefaultCustomerProfilePage } from "../page"; // 👈 Fallback default

export default function PatientProfilePage() {
  const { encodedId } = useParams(); // e.g. MTk= is 19
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("History");

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
          setPatientDetails(null); // Fallback
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
            invoice_total:
              data.planbill?.reduce(
                (sum, item) => sum + Number(item.invoice_amt || 0),
                0
              ) || 0,
            // Add other EMR-related fields as needed
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

  const handleBookClick = () => {
    // Optional booking action
  };

  if (loading) return <p>Loading patient details...</p>;

  if (!patientDetails) {
    return <DefaultCustomerProfilePage />;
  }

  // ✅ This renders full tab layout with History, Patient, EMR
  return (
    <Container
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      patient_details={patientDetails}
      historyData={[
        {
          date: patientDetails.startDate,
          notes: `Visited for ${patientDetails.appointment_type}`,
        },
      ]}
    />
  );
}
