"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import styles from "./WelcomeScreen.module.css"; // Using CSS Modules
import CreateDoctor from "../Doctor/CreateDoctor"; // Import the CreateDoctor component
import ProcedureForm from "../ProcedureType/ProcedureForm"; // Import the ProcedureForm component (path guess: ../Procedure/Procedure.js)
import LabForm from "../Lab/LabForm"; // NEW: Import the LabForm component (path guess: ../Lab/LabForm.js)
import CreateProfileModal from "../PopupModals/CreateProfileModal/CreateProfileModal";
import DrugForm from "../Drug/DrugForm";

const WelcomeScreen = () => {
  const [activeItem, setActiveItem] = useState("profile"); // 'profile', 'doctor', 'procedure', 'lab', 'drug'
  const [showCreateDoctorModal, setShowCreateDoctorModal] = useState(false); // State for Doctor modal visibility
  const [showProcedureFormModal, setShowProcedureFormModal] = useState(false); // State for Procedure modal visibility
  const [showLabFormModal, setShowLabFormModal] = useState(false); // NEW: State for Lab modal visibility
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDrugFormModal, setShowDrugFormModal] = useState(false);
  const [drugs, setDrugs] = useState(() => {
    if (typeof window !== "undefined") {
      const savedDrugs = localStorage.getItem("drugs");
      return savedDrugs ? JSON.parse(savedDrugs) : [];
    }
    return [];
  });

  // State to hold procedures data, initialized from localStorage
  const [procedures, setProcedures] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined (client-side)
      const savedProcedures = localStorage.getItem("procedures");
      return savedProcedures ? JSON.parse(savedProcedures) : [];
    }
    return [];
  });

  // NEW: State to hold labs data, initialized from localStorage
  const [labs, setLabs] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined (client-side)
      const savedLabs = localStorage.getItem("labs");
      return savedLabs ? JSON.parse(savedLabs) : [];
    }
    return [];
  });

  // --- Modal Control Handlers ---

  // Handler for opening the Create Doctor modal
  const handleCreateDoctorClick = () => {
    setShowCreateDoctorModal(true);
  };

  // Handler for opening the Create Procedure modal
  const handleCreateProcedureClick = () => {
    setShowProcedureFormModal(true);
  };

  // NEW: Handler for opening the Create Lab modal
  const handleCreateLabClick = () => {
    setShowLabFormModal(true);
  };

  // Handler for closing the Create Doctor modal
  const handleCloseCreateDoctorModal = () => {
    setShowCreateDoctorModal(false);
  };

  // Handler for closing the Create Procedure modal
  const handleCloseProcedureFormModal = () => {
    setShowProcedureFormModal(false);
  };

  // NEW: Handler for closing the Create Lab modal
  const handleCloseLabFormModal = () => {
    setShowLabFormModal(false);
  };

  const handleCreateDrugClick = () => {
    setShowDrugFormModal(true);
  };

  const handleCloseDrugFormModal = () => {
    setShowDrugFormModal(false);
  };

  // --- Data Handling after Modal Submission ---

  // This function for CreateDoctor would typically send newDoctorData to your backend API
  const handleDoctorCreated = (newDoctorData) => {
    console.log("New Doctor Created:", newDoctorData);
    alert(
      `Doctor ${newDoctorData.name} created successfully! (Check console for data)`
    );
    setShowCreateDoctorModal(false);
    // If you had a list of doctors to display, you would update that state here.
  };

  // The ProcedureForm component already handles its internal state and calls setProcedures
  // The LabForm component already handles its internal state and calls setLabs

  // --- Dynamic Content Rendering in Right Panel ---

  const renderRightContent = () => {
    switch (activeItem) {
      case "profile":
        return (
          <>
            <p className={styles.rightContentText}>
              Begin by setting up practitioner profiles add names, roles, and
              schedules to seamlessly manage your teams information and
              availability.
            </p>
            <button
              className={styles.createButton}
              onClick={() => setShowProfileModal(true)}
            >
              <span className={styles.plusIcon}>+</span> Create Profile
            </button>
          </>
        );
      case "doctor":
        return (
          <>
            <p className={styles.rightContentText}>
              Manage your doctors information, including their specialties,
              contact details, and schedules.
            </p>
            <button
              className={styles.createButton}
              onClick={handleCreateDoctorClick}
            >
              <span className={styles.plusIcon}>+</span> Create Doctor
            </button>
          </>
        );
      case "procedure":
        return (
          <>
            <p className={styles.rightContentText}>
              Define and manage all dental procedures offered, including costs
              and descriptions.
            </p>
            <button
              className={styles.createButton}
              onClick={handleCreateProcedureClick}
            >
              <span className={styles.plusIcon}>+</span> Create Procedure
            </button>
          </>
        );
      case "lab":
        return (
          <>
            <p className={styles.rightContentText}>
              Organize and track laboratory services, orders, and results.
            </p>
            <button
              className={styles.createButton}
              onClick={handleCreateLabClick}
            >
              {" "}
              {/* NEW: onClick for Lab */}
              <span className={styles.plusIcon}>+</span> Create Lab
            </button>
          </>
        );
      case "drug":
        return (
          <>
            <p className={styles.rightContentText}>
              Maintain a comprehensive list of drugs, dosages, and inventory.
            </p>
            <button
              className={styles.createButton}
              onClick={handleCreateDrugClick}
            >
              <span className={styles.plusIcon}>+</span> Create Drug
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Navbar Placeholder - If you have a global Navbar component, place it here. */}
      {/* <div className={styles.navbarPlaceholder}></div> */}

      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeText}>
          Welcome Mutthu to ERP4 Dentist ! Manage Smarter, Grow Faster !
        </h1>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.learnTheBasics}>
          <svg
            className={styles.bookIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.17 0-2.39.15-3.5.5C2.69 5.31 2 6.01 2 7v13c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-3.5.5c1.17 0 2.45.28 3.5.5V7c0 .55-.45 1-1 1h-2.5c-.83 0-1.5-.67-1.5-1.5V6c0-.55-.45-1-1-1zm-5.5 1.5c1.17 0 2.45.28 3.5.5V7c0 .55-.45 1-1 1h-2.5c-.83 0-1.5-.67-1.5-1.5V6c0-.55-.45-1-1-1zm-5.5 1.5c1.17 0 2.45.28 3.5.5V7c0 .55-.45 1-1 1h-2.5c-.83 0-1.5-.67-1.5-1.5V6c0-.55-.45-1-1-1zM4 9h16v10H4V9zm9 4c0 .55-.45 1-1 1s-1-.45-1-1V7h-1c-.55 0-1-.45-1-1s.45-1 1-1h1V4c0-.55.45-1 1-1s1 .45 1 1v1h1c.55 0 1 .45 1 1s-.45 1-1 1h-1v6z" />
          </svg>
          <span>Learn the basics</span>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <button
              className={`${styles.sidebarButton} ${
                activeItem === "profile" ? styles.active : ""
              }`}
              onClick={() => setActiveItem("profile")}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Create Profile
            </button>
            <button
              className={`${styles.sidebarButton} ${
                activeItem === "doctor" ? styles.active : ""
              }`}
              onClick={() => setActiveItem("doctor")}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S13.66 5 12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm8 4H8c-2.76 0-5 2.24-5 5v2h18v-2c0-2.76-2.24-5-5-5z" />
              </svg>
              Create Doctor
            </button>
            <button
              className={`${styles.sidebarButton} ${
                activeItem === "procedure" ? styles.active : ""
              }`}
              onClick={() => setActiveItem("procedure")}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-7c-2.76 0-5 2.24-5 5h3c0-1.1 0-2 .89-2.61.43-.28 1.05-.39 1.66-.39.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-1v-2h-2v4h4v-4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5h-.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5zm0-2c-1.1 0-2 .9-2 2h2V9z" />
              </svg>
              Create Procedure
            </button>
            <button
              className={`${styles.sidebarButton} ${
                activeItem === "lab" ? styles.active : ""
              }`}
              onClick={() => setActiveItem("lab")}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-4 4c0-2.21 1.79-4 4-4s4 1.79 4 4H8z" />
              </svg>
              Create Lab
            </button>
            <button
              className={`${styles.sidebarButton} ${
                activeItem === "drug" ? styles.active : ""
              }`}
              onClick={() => setActiveItem("drug")}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4h1c2.21 0 4-1.79 4-4V2h-2v7zm5-3v8h2V6h-2zm-6 0v8h2V6h-2zm-4 0v8h2V6H6zm10 10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              Create Drug
            </button>
          </div>
          <div className={styles.rightPanel}>{renderRightContent()}</div>
        </div>
      </div>

      {/* Conditional rendering of the CreateDoctor modal */}
      {showCreateDoctorModal && (
        <CreateDoctor
          onClose={handleCloseCreateDoctorModal}
          onCreate={handleDoctorCreated}
        />
      )}

      {/* Conditional rendering of the ProcedureForm modal */}
      {showProcedureFormModal && (
        <ProcedureForm
          setShowForm={handleCloseProcedureFormModal}
          setProcedures={setProcedures}
          procedures={procedures}
        />
      )}

      {/* NEW: Conditional rendering of the LabForm modal */}
      {showLabFormModal && (
        <LabForm
          setShowForm={handleCloseLabFormModal} // LabForm uses setShowForm to close
          setLabs={setLabs} // Pass the setter for labs data
          // editingLab prop is for edit functionality, not needed for 'create' initially
          // You would pass an 'editingLab' object here if you were opening for edit.
          editingLab={null}
        />
      )}

      {showProfileModal && (
        <CreateProfileModal
          onClose={() => setShowProfileModal(false)}
          onSave={(profileData) => {
            console.log("Profile saved:", profileData);
          }}
        />
      )}
      {showDrugFormModal && (
        <DrugForm
          setShowForm={handleCloseDrugFormModal}
          setDrugs={setDrugs}
          editingDrug={null} // for create mode
        />
      )}
    </div>
  );
};

export default WelcomeScreen;
