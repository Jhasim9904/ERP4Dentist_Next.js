import React, { useContext } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaComments,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import "./Card.css";
import "./Container.css";
import { MyContext } from "@/context/AppointmentContext.js";

const Card = ({ patient_details, historyData }) => {
  const { appointment_details } = useContext(MyContext);

  // Use details from props if present (dynamic route), else from context (static route)
  const details = patient_details || appointment_details;

  if (!details) return null;

  return (
    <div className="card card1" style={{ width: "28rem", height: "20rem" }}>
      <div className="d-flex top-card">
        <FaUserCircle
          style={{ fontSize: "40px", color: "white" }}
          className="my-4 mx-5"
        />
        <div className="content">
          <div style={{ color: "white" }}>
            {details.first_name || "Unnamed"}
          </div>
          <div className="my-1" style={{ color: "white" }}>
            {details.mail || "No email"}
          </div>
          <div className="row mt-2">
            <div className="col">
              <FaComments style={{ fontSize: "30px", color: "white" }} />
            </div>
            <div className="col">
              <FaUser style={{ fontSize: "30px", color: "white" }} />
            </div>
            <div className="col">
              <FaPaperPlane style={{ fontSize: "30px", color: "white" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <h5>Contact Information</h5>
        <div className="d-flex mt-3">
          <FaEnvelope style={{ fontSize: "20px" }} />
          <div className="ms-3">{details.mail || "N/A"}</div>
        </div>
        <div className="d-flex my-3">
          <FaPhone style={{ fontSize: "20px" }} />
          <div className="ms-3">
            {details.contact || "N/A"}
          </div>
        </div>
        <div className="d-flex">
          <FaMapMarkerAlt style={{ fontSize: "20px" }} />
          <div className="ms-3">
            {details.lo_location || "Varu village, Brahmnoli"}
          </div>
        </div>
      </div>

      {/* ✅ Optional history section if available
      {historyData && historyData.length > 0 && (
        <div className="card-body mt-3">
          <h5>Patient History</h5>
          <ul style={{ maxHeight: "100px", overflowY: "auto" }}>
            {historyData.map((item, index) => (
              <li key={index}>
                {item.date || "No date"} - {item.notes || "No notes"}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Card;