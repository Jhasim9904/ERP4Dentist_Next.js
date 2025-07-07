"use client";
import { useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import "./Observation.css";
import ObservationModal from "@/components/Customerprofile/EMR components/ObservationModel";

const Observation = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="observation-container">
      <h2 className="observation-heading">Observation</h2>
      <div className="observation-header">
        <div className="observation-info">
          <p>
            <strong>Examination Date:</strong>
            <span className="dim-text"> 2025-04-17</span>
          </p>
          <p>
            <strong>Chief Complaint:</strong>
            <span className="dim-text"> Bad breath</span>
          </p>
          <p>
            <strong>Occlusion:</strong>
            <span className="dim-text"> 1</span>
          </p>
          <p>
            <strong>Wisdom Teeth:</strong>
          </p>
          <p>
            <strong>Calculus:</strong>
            <span className="dim-text"> ++</span>
            <span style={{ marginLeft: "3rem" }}>
              <strong>Stains:</strong>
              <span className="dim-text"> ++</span>
            </span>
          </p>
        </div>

        <div className="observation-actions">
          <p>
            Doctor: <strong>sabari</strong>
          </p>

          {show && <ObservationModal onClose={() => setShow(false)} />}
          {!show && (
            <button className="add-observation-btn" onClick={() => setShow(true)}>
            <FaPlus style={{ marginRight: "6px" }} /> Add New Observation
            </button>
          )}
        </div>
      </div>

      <table className="observation-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Dr</th>
            <th>Tooth Number</th>
            <th>Observations</th>
            <th>Notes</th>
            <th>Add New Plan Treatment</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-04-17</td>
            <td>
              <div className="doctor-badge">
                <span
                  className="doctor-color"
                  style={{ backgroundColor: "#3a6351" }}
                ></span>
                sabari
              </div>
            </td>
            <td>18,17,16,42,</td>
            <td>Attrition</td>
            <td>
              Attrition observed on upper left molars. Occlusal surfaces show
              signs of wear due to bruxism.
            </td>
            <td>
              <button className="action-btn">
                <FaPen style={{ marginRight: "6px" }} /> Add Treatment
              </button>
            </td>
            <td>
              <button className="edit-icon">
                <FaPen />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default Observation;
