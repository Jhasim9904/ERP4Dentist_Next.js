// components/Doctor/Doctor.js
"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FaUserPlus,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import CreateDoctorModal from "./CreateDoctor.js";
import "./Doctor.css";
import { MyContext } from "@/context/SetContext.js"; // Corrected import path to AppointmentContext
// import Image from "next/image.js"; // Only use if you configure Next.js Image component

const Doctor = () => {
  // Destructure doctors, setLoading, error, AddDoctorApi from MyContext
  const { doctors, loading, error, AddDoctorApi, setDoctors } = useContext(MyContext);

  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formDataForModal, setFormDataForModal] = useState(null); // Renamed to avoid confusion with internal state

  // No longer need to load/save from localStorage here, as the context manages the `doctors` array via API.
  // The `doctors` state in context is already being fetched on mount.
  // useEffect(() => { ... localStorage ... }, []);

  // handleAddDoctor will now be an empty function or removed,
  // as CreateDoctorModal will directly call AddDoctorApi from context.
  // The context's AddDoctorApi will handle updating the `doctors` state in context.
  // You might keep it as a placeholder if you have other local logic,
  // but for API integration, it's often not needed.
  const handleAddDoctor = (doctorDataFromCreateModal) => {
    // This function will be less relevant if CreateDoctorModal calls AddDoctorApi directly.
    // However, if CreateDoctorModal still uses an 'onCreate' prop for *local* updates before API call,
    // or for a success callback, you can keep it.
    // For now, it will primarily rely on the context's state updates.
    console.log("handleAddDoctor called, data:", doctorDataFromCreateModal);
    // You typically wouldn't update `doctors` here if `AddDoctorApi` already updates context's `doctors` state.
    // setDoctors(prev => [...prev, doctorDataFromCreateModal]); // ONLY if CreateDoctorModal returns something NOT updated via API
  };


  const handleDeleteDoctor = (doc_id) => { // Accept doc_id for API deletion
    // TODO: Implement API call for deletion here
    console.log(`Deleting doctor with ID: ${doc_id}`);
    // Example: call a deleteDoctorApi function from context
    // try {
    //   await deleteDoctorApi(doc_id);
    //   setDoctors(prevDoctors => prevDoctors.filter(doc => doc.doc_id !== doc_id));
    // } catch (error) {
    //   console.error("Error deleting doctor:", error);
    // }
    alert("Delete functionality not yet implemented via API.");
  };

  const handleEditDoctor = (doctorToEdit) => {
    setFormDataForModal(doctorToEdit); // Pass the doctor object for editing
    setShowModal(true);
  };

  const handleClear = () => {
    setSearchText("");
    setStartDate("");
    setEndDate("");
  };

  const filteredDoctors = doctors.filter((doc) => {
    const textMatch =
      doc.doc_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.doc_speciality?.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.doc_type?.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.doc_mobile?.includes(searchText) ||
      doc.doc_email?.toLowerCase().includes(searchText.toLowerCase());

    const docDate = doc.doc_join_date ? new Date(doc.doc_join_date) : null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch =
      (!start || (docDate && docDate >= start)) &&
      (!end || (docDate && docDate <= end));

    return textMatch && dateMatch;
  });

  if (loading) {
    return <div className="doctor-page">Loading doctors...</div>;
  }

  if (error) {
    return <div className="doctor-page" style={{ color: 'red' }}>Error loading doctors: {error}</div>;
  }

  return (
    <div className="doctor-page">
      <div className="doctor-header-container">
        <div className="header-left">
          <h2 className="title">
            Doctor <span className="badge">{filteredDoctors.length}</span>
          </h2>
        </div>

        <div className="header-middle">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="btn search-btn">Search</button>
          <button className="btn clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="header-right">
          <button
            className="btn create-btn"
            onClick={() => {
              setShowModal(true);
              setFormDataForModal(null); // Clear formData for a new entry
            }}
          >
            <FaUserPlus className="icon" /> Create Doctor
          </button>
        </div>
      </div>

      <div className="entry-info">
        Showing 1 to {filteredDoctors.length} of {filteredDoctors.length}{" "}
        Entries <span className="arrow">→</span>
      </div>

      <div className="doctor-cards-container">
        {filteredDoctors.map((doc) => ( // Removed `index` from map, use `doc.doc_id` as key
          <div
            className="doctor-card"
            key={doc.doc_id} // Use a unique ID from the doctor object as key
            style={{
              borderLeft: `8px solid ${doc.doc_cal_color || "#ccc"}`, // Use doc_cal_color for border
              minHeight: "240px",
              maxWidth: "330px",
              width: "100%",
              wordBreak: "break-word",
            }}
          >
            <div className="top">
              {/* Using standard <img> tag for dynamic URLs without Next.js Image optimization config */}
              {/* {doc.image ? (
                 <img
                    src={doc.image}
                    alt={doc.doc_name}
                    className="doctor-img"
                    onError={(e) => { e.target.onerror = null; e.target.src = "/default-doctor-image.png"; }} // Fallback image
                 />
              ) : (
                <img src="default-doctor-image.png" alt="Default Doctor" className="doctor-img" />
              )} */}
              <div>
                <div className="doctor-name">{doc.doc_name}</div>
                <div className="doctor-role">{doc.doc_speciality}</div>
                {doc.doc_type && (
                  <div className="doctor-role">{doc.doc_type}</div>
                )}
              </div>
            </div>

            <div className="info-row">
              <FaPhoneAlt className="icon" /> {doc.doc_mobile}
            </div>
            <div className="info-row">
              <FaEnvelope className="icon" /> {doc.doc_email}
            </div>
            <div className="info-row">
              <FaCalendarAlt className="icon" /> {doc.doc_join_date}
              <span className="status">{doc.doc_status}</span>
            </div>

            {doc.signature && (
              <div className="signature-preview">
                <strong>Signature:</strong>
                <img
                  src={doc.signature}
                  alt="E-Signature"
                  style={{ width: "100px", marginTop: "8px" }}
                />
              </div>
            )}

            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => handleEditDoctor(doc)} // Pass the entire doctor object
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteDoctor(doc.doc_id)} // Pass doc_id for deletion
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateDoctorModal
          onClose={() => {
            setShowModal(false);
            setFormDataForModal(null); // Clear formDataForModal on close
          }}
          // onCreate is no longer primarily for local state update,
          // it could be used for a simple success callback if needed.
          // The actual state update is handled by the context's AddDoctorApi.
          // onCreate={handleAddDoctor} // You can remove this prop if not used
          formData={formDataForModal} // Pass the doctor object for editing or null for new
        />
      )}
    </div>
  );
};

export default Doctor;