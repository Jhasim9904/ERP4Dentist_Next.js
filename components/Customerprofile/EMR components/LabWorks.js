// components\Customerprofile\EMR components\LabWorks.js
import React, { useState } from "react";
import "./LabWorks.css";
import { FaPen } from "react-icons/fa";
import AddLabWorkModal from "@/components/PopupModals/AddLabWorkModal/AddLabWorkModal";

const LabWorks = ({ labData = [] }) => {
  const [showModal, setShowModal] = useState(false);

  // Utility to extract selected teeth like "18,17,16"
  const extractTeethNumbers = (labItem) => {
    return Object.keys(labItem)
      .filter((key) => key.startsWith("teeth_") && labItem[key] === 1)
      .map((key) => key.replace("teeth_", ""))
      .join(", ");
  };

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
          {labData.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">No Lab Work Found</td>
            </tr>
          ) : (
            labData.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.orderdate || "-"}</td>
                <td>
                  <div className="doctor-badge">
                    <span
                      className="color-box"
                      style={{
                        backgroundColor: item.doc_cal_color || "#999",
                      }}
                    ></span>
                    {item.doctor || "-"}
                  </div>
                </td>
                <td>{item.lab || "-"}</td>
                <td>
                  {extractTeethNumbers(item)}
                  <br />
                  <strong>{item.procedure || ""}</strong>{" "}
                  <em>{item.type || ""}</em>
                </td>
                <td>{item.cost || "-"}</td>
                <td>{item.costper || "-"}</td>
                <td>{item.repeat || "-"}</td>
                <td>{item.specialinstruction || item.remark || "-"}</td>
                <td className="edit-action" onClick={() => setShowModal(true)}>
                  <FaPen />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ Modal popup (edit/new) */}
      {showModal && <AddLabWorkModal onClose={() => setShowModal(false)} />}

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default LabWorks;
