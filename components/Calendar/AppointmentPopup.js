import React from "react";
import "./AppointmentPopup.css";
import Image from "next/image";
import Arrowupright from "@/public/images/arrow-up-right.png";
import Edit from "@/public/images/edit.png"
import Delete from "@/public/images/delete.png"
import Email from "@/public/images/email.png"
import Phone from "@/public/images/phone.png"


const AppointmentPopup = ({
  patients,
  style,
  onClose,
  setShowPopup,
  popupRef, // NEW: Accept the popupRef
}) => {
  if (!patients) return null;

  const patientPhoneNumber = patients.phoneNumber || "+91 9425854202";
  const patientEmail = patients.email || "ewalker12@mail.com";

  const formatTimeForPopup = (date) => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    // IMPORTANT: Removed onClick={onClose} from this wrapper.
    // The click-outside logic is now solely handled by the document listener in AppointmentCard.
    <div className="appointment-popup-wrapper">
      <div
        ref={popupRef} // NEW: Attach the ref to the popup content div
        className="appointment-popup-content"
        style={style}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside content from bubbling up
      >
        <div className="popup-arrow"></div>

        <div className="popup-header">
          <span className="popup-patient-name">{patients.name}</span>
          <div className="popup-actions">
            <Image
              className="d-flex"
              src={Edit}
              alt="Edit"
              width={20}
              height={20}
            />
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
            <span>{patientPhoneNumber}</span>
            
            <Image
              className="d-flex mx-1"
              src={Email}
              alt="Email"
              width={20}
              height={20}
            />
            <span>{patientEmail}</span>
          </div>
        </div>

        <div className="popup-details">
          <div className="detail-row">
            <span className="detail-label">Type Treatments</span>
            <span className="detail-value">{patients.treatment}</span>
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
              {formatTimeForPopup(patients.startTime)} -{" "}
              {formatTimeForPopup(patients.endTime)}
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