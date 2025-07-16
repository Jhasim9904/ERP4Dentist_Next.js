"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Patient from "@/components/CustomerProfile/Patient";
import { DefaultCustomerProfilePage } from "../page"; // 👈 Reuse default version

export default function PatientProfilePage() {
  const { encodedId } = useParams(); // e.g. MTk= is 19
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Patient");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `https://testing.erp4dentist.com/api/patientinfo/${encodedId}`
        );
        const data = await response.json();

        // ✅ If no valid data found, fallback
        if (
          !data ||
          !data.patientinformations ||
          data.patientinformations.length === 0
        ) {
          setPatientDetails(null); // trigger fallback
        } else {
          setPatientDetails(data.patientinformations[0]); // valid patient
        }
      } catch (error) {
        console.error("Error fetching patient info", error);
        setPatientDetails(null); // trigger fallback
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [encodedId]);

  const handleBookClick = () => {
    // Optional: navigate to booking flow
  };

  if (loading) return <p>Loading patient details...</p>;

  // ❌ Fallback to default profile if patient not found
  if (!patientDetails) {
    return <DefaultCustomerProfilePage />;
  }

  return (
    <div>
      {activeTab === "Patient" && (
        <Patient
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleBookClick={handleBookClick}
          patient_details={patientDetails} // ✅ valid patient object
        />
      )}
    </div>
  );
}

//works till fallback 