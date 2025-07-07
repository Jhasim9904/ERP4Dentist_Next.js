import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { MdOutlineAdd } from "react-icons/md";
import PrescriptionModal from "./PrescriptionModal";
import "./Prescriptions.css";

const Prescriptions = () => {
  const [showModal, setShowModal] = useState(false);

  const [prescriptions, setPrescriptions] = useState([
    {
      date: "03-07-2025",
      doctor: "Giri",
      color: "#f28b82",
      drug: "Drug4",
      type: "Tablet",
      dosage: "Afternoon 0",
      duration: "5 days",
      instructions: "fadsfdasdfs",
    },
    {
      date: "03-07-2025",
      doctor: "pooja",
      color: "#f28b82",
      drug: "Drug4",
      type: "Tablet",
      dosage: "Morning 0",
      duration: "2 days",
      instructions: "dsvfdhgfhgj",
    },
    {
      date: "17-04-2025",
      doctor: "sabari",
      color: "#f28b82",
      drug: "Chlorhexidine Mouthwash",
      type: "Mouthwash",
      dosage: "10 ml twice daily",
      duration: "7 days",
      instructions:
        "Rinse with 10 ml for 30 seconds. Do not eat or drink for 30 minutes after use.",
    },
  ]);

  return (
    <div className="prescription-container">
      <h2 className="prescription-heading">Prescriptions</h2>
      <button onClick={() => setShowModal(true)} className="add-btn">
        <MdOutlineAdd className="add-icon" />
        Add New Prescriptions
      </button>

      <table className="prescription-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Dr</th>
            <th>Drug</th>
            <th>Durg Type</th>
            <th>Dosage</th>
            <th>Duration</th>
            <th>Instructions</th>
            <th>Edit</th>
            <th>Print</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((p, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{p.date}</td>
              <td>
                <div className="doctor-badge">
                  <span
                    className="doctor-color"
                    style={{ backgroundColor: p.color }}
                  ></span>
                  {p.doctor}
                </div>
              </td>
              <td>{p.drug}</td>
              <td>{p.type}</td>
              <td>{p.dosage}</td>
              <td>{p.duration}</td>
              <td>{p.instructions}</td>
              <td>
                <button className="icon-btn">
                  <FaPen />
                </button>
              </td>
              <td>
                <button className="icon-btn">
                  <LuPrinter />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>

      <PrescriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(newData) => {
          setPrescriptions([...prescriptions, newData]);
        }}
      />
    </div>
  );
};

export default Prescriptions;
