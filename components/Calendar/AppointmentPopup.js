import React from "react";
import "./AppointmentPopup.css";

const AppointmentPopup = ({
  appointment,
  style,
  onClose,
  setShowPopup,
}) => {
  if (!appointment) return null;

  const handleMouseEnter = () => {
    setShowPopup(true); // Keep popup open on hover
  };
    const handleMouseLeave = () => {
    setShowPopup(false); // Keep popup open on hover
  };

  return (
    <div
      className="appointment-popup-wrapper"
      onClick={onClose}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="appointment-popup-content"
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-arrow"></div>

        <div className="popup-header">
          <span className="popup-patient-name">{appointment.patientName}</span>
          <div className="popup-actions">
            {/* Edit */}
            <svg xmlns="http://www.w3.org/2000/svg" className="popup-icon" viewBox="0 0 24 24">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            {/* Delete */}
            <svg xmlns="http://www.w3.org/2000/svg" className="popup-icon" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
        </div>

        <div className="popup-contact-info">
          <span>+91 9425854202</span>
          <span className="dot-separator">•</span>
          <span>ewalker12@mail.com</span>
        </div>

        <div className="popup-details">
          <div className="detail-row">
            <span className="detail-label">Type Treatments</span>
            <span className="detail-value">{appointment.treatment}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Doctor</span>
            <span className="detail-value doctor-name">
              <span className="doctor-dot"></span> Dr. Surya
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Time</span>
            <span className="detail-value">
              {appointment.startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {appointment.endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <button className="see-patient-details-btn">
          See Patient Details
          <svg xmlns="http://www.w3.org/2000/svg" className="arrow-icon" viewBox="0 0 24 24">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppointmentPopup;
