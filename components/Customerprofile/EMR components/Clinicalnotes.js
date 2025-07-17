"use client";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import "./Clinicalnotes.css";
import AddNoteModal from "@/components/PopupModals/AddNoteModal/AddNoteModal";

const Clinicalnotes = ({ data = [] }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="clinical-container">
      <h2 className="clinical-heading">Clinical Notes</h2>

      {data.length === 0 ? (
        <p>No clinical notes available.</p>
      ) : (
        <table className="clinical-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Dr</th>
              <th>Tooth Number</th>
              <th>Observations</th>
              <th>Procedure</th>
              <th>Type</th>
              <th>Notes</th>
              <th>Plan Treatment</th>
              <th>Plan Created</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((n, idx) => (
              <tr key={idx}>
                <td>{n.note_date}</td>
                <td>
                  <div className="doctor-badge">
                    <span
                      className="doctor-color"
                      style={{ backgroundColor: n.color || "#f28b82" }}
                    ></span>
                    {n.doc_type}
                  </div>
                </td>
                <td>{n.tooth_no}</td>
                <td>{n.procedurenote}</td>
                <td>{n.procedurenote}</td>
                <td>{n.type}</td>
                <td>{n.clinicalnotes}</td>
                <td>
                  <input type="checkbox" checked={true} readOnly />
                </td>
                <td>
                  {n.noteplanid && (
                    <button className="plan-created">Plan Created</button>
                  )}
                </td>
                <td>
                  <button className="edit-icon" onClick={() => setShowModal(true)}>
                    <FaPen />
                  </button>
                  {showModal && <AddNoteModal onClose={() => setShowModal(false)} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default Clinicalnotes;
