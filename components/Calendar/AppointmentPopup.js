import React from "react";
import "./AppointmentPopup.css";
import Image from "next/image";
import Arrowupright from "@/public/images/arrow-up-right.png";
import Edit from "@/public/images/edit.png"
import Delete from "@/public/images/delete.png"
import Email from "@/public/images/email.png"
import Phone from "@/public/images/phone.png"


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
            <Image
              className="d-flex"
              src={Edit}
              alt="Edit"
              width={20}
              height={20}
            />
            {/* Delete */}
            <Image
              className="d-flex"
              src={Delete}
              alt="Delete"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className="popup-contact-info">
          <div className="d-flex">

                      <Image
              className="d-flex mx-1"
              src={Phone}
              alt="Phone"
              width={20}
              height={20}
              />
          <span>+91 9425854202</span>
              
            <Image
              className="d-flex mx-1"
              src={Email}
              alt="Email"
              width={20}
              height={20}
              />
          <span>ewalker12@mail.com</span>
              </div>
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
            <Image
              className="d-flex"
              src={Arrowupright}
              alt="Arrowupright"
              width={20}
              height={20}
            />
        </button>
      </div>
    </div>
  );
};

export default AppointmentPopup;
