import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import "./Clinicalnotes.css";
import AddNoteModal from "@/components/PopupModals/AddNoteModal/AddNoteModal";

const Clinicalnotes = () => {
  const [notes, setNotes] = useState([
    {
      date: "2025-06-04",
      doctor: "sabari",
      color: "#f28b82",
      teeth: "18,17,16,42",
      observations: "Braces Consulting",
      procedure: "Braces Consulting",
      type: "Adjustment",
      note: "lkgjfgkhlkjjsave",
      planTreatment: true,
      planCreated: true,
    },
    {
      date: "2025-04-17",
      doctor: "sabari",
      color: "#f28b82",
      teeth: "18,17,16,42",
      observations: "Braces Consulting",
      procedure: "Braces Consulting",
      type: "Adjustment",
      note: "No ulceration or lesions noted",
      planTreatment: true,
      planCreated: true,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="clinical-container">
      <h2 className="clinical-heading">Clinical Notes</h2>

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
            <th>Plan created</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n, idx) => (
            <tr key={idx}>
              <td>{n.date}</td>
              <td>
                <div className="doctor-badge">
                  <span className="doctor-color" style={{ backgroundColor: n.color }}></span>
                  {n.doctor}
                </div>
              </td>
              <td>{n.teeth}</td>
              <td>{n.observations}</td>
              <td>{n.procedure}</td>
              <td>{n.type}</td>
              <td>{n.note}</td>
              <td>
                <input type="checkbox" checked={n.planTreatment} readOnly />
              </td>
              <td>
                {n.planCreated && (
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
            

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default Clinicalnotes;
