import React, { useState } from "react";
import "./LabWorks.css";
import { FaPen } from "react-icons/fa";
import AddLabWorkModal from "@/components/PopupModals/AddLabWorkModal/AddLabWorkModal";

const LabWorks = () => {
  const [labData] = useState([
    {
      date: "2025-04-17",
      doctor: "sabari",
      color: "#3a6351",
      labName: "Shanthi",
      teeth: "18,17,16,42",
      costDetails: "800",
      workParticulars: "800",
      repeat: "",
      remarks: "",
    },
    {
      date: "2025-06-10",
      doctor: "pooja",
      color: "#f28b82",
      labName: "MedLab",
      teeth: "36,37",
      costDetails: "1200",
      workParticulars: "1200",
      repeat: "Yes",
      remarks: "Impression required",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="lab-container">
      <h2 className="lab-title">Lab Works</h2>

      <table className="lab-table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Dr</th>
            <th>Lab Name</th>
            <th>Tooth Number & Procedure</th>
            <th>Cost Details</th>
            <th>Work Particulars</th>
            <th>Repeat</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {labData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>
                <div className="doctor-badge">
                  <span
                    className="color-box"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.doctor}
                </div>
              </td>
              <td>{item.labName}</td>
              <td>{item.teeth}</td>
              <td>{item.costDetails}</td>
              <td>{item.workParticulars}</td>
              <td>{item.repeat}</td>
              <td>{item.remarks}</td>
              <td className="edit-action" onClick={() => setShowModal(true)}>
                <FaPen />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Render modal separately, outside the table */}
      {showModal && (
        <AddLabWorkModal onClose={() => setShowModal(false)} />
      )}

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default LabWorks;
