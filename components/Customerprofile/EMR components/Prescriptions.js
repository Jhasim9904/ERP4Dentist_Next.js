"use client";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { MdOutlineAdd } from "react-icons/md";
import "./Prescriptions.css";
import AddNewPrescriptionModal from "@/components/PopupModals/AddNewPrescriptionModal/AddNewPrescriptionModal";
import EditPrescriptionModal from "@/components/PopupModals/EditPrescriptionModal/EditPrescriptionModal";

const Prescriptions = ({ data = [] }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleAddSave = (newData) => {
    // Add logic to send to backend if needed
    console.log("Add new prescription:", newData);
    setShowAddModal(false);
  };

  const handleEditSave = (updatedData) => {
    console.log("Edit prescription:", updatedData);
    setShowEditModal(false);
    setSelectedPrescription(null);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  return (
    <div className="prescription-container">
      <h2 className="prescription-heading">Prescriptions</h2>

      <button className="add-btn" onClick={() => setShowAddModal(true)}>
        <MdOutlineAdd className="add-icon" />
        Add New Prescriptions
      </button>

      {data.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        <table className="prescription-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Dr</th>
              <th>Drug</th>
              <th>Drug Type</th>
              <th>Dosage</th>
              <th>Duration</th>
              <th>Instructions</th>
              <th>Edit</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p, idx) => {
              const dosageParts = [];
              if (p.dossagem) dosageParts.push(`Morning ${p.dossagem}`);
              if (p.dossagea) dosageParts.push(`Afternoon ${p.dossagea}`);
              if (p.dossagen) dosageParts.push(`Night ${p.dossagen}`);
              const dosage = dosageParts.join(", ");

              return (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{formatDate(p.created_at)}</td>
                  <td>
                    <div className="doctor-badge">
                      <span
                        className="doctor-color"
                        style={{ backgroundColor: "#f28b82" }}
                      ></span>
                      {p.doctor}
                    </div>
                  </td>
                  <td>{p.drug_name}</td>
                  <td>{p.drugtype}</td>
                  <td>{dosage || "-"}</td>
                  <td>{p.duration}</td>
                  <td>{p.instructions}</td>
                  <td>
                    <button
                      className="icon-btn"
                      onClick={() => {
                        setSelectedPrescription(p);
                        setShowEditModal(true);
                      }}
                    >
                      <FaPen />
                    </button>
                  </td>
                  <td>
                    <button className="icon-btn">
                      <LuPrinter />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <AddNewPrescriptionModal
          isOpen={true}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && selectedPrescription && (
        <EditPrescriptionModal
          isOpen={true}
          initialData={selectedPrescription}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPrescription(null);
          }}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Prescriptions;
