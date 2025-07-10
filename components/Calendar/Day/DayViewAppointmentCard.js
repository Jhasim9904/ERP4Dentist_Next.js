// components/AppointmentCard/DayViewAppointmentCard.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import './DayViewAppointmentCard.css';
import AppointmentPopup from '../AppointmentPopup';

const colorMap = {
  "Teeth Cleaning": "app-card-blue",
  "Cavity Filling": "app-card-green",
  "Root Canal": "app-card-purple",
  "Gum Treatment": "app-card-lime",
  Braces: "app-card-green",
  "Tooth Extraction": "app-card-blue",
  "Crown Fitting": "app-card-gray",
  "Jaw Alignment": "app-card-purple",
  "Bridge Repair": "app-card-blue",
  "Plaque Removal": "app-card-green",
  "Invisalign Scan": "app-card-blue",
};

const DayViewAppointmentCard = ({ patients, style }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);
  const popupRef = useRef(null);

  if (!patients) {
    return null;
  }

  const colorClass = colorMap[patients.treatment] || "app-card-default";

  const startTime = patients.startTime instanceof Date ? patients.startTime : new Date(patients.startTime);
  const endTime = patients.endTime instanceof Date ? patients.endTime : new Date(patients.endTime);

  const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && cardRef.current && popupRef.current &&
          !cardRef.current.contains(event.target) &&
          !popupRef.current.contains(event.target)
      ) {
        handleClosePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup, cardRef, popupRef]);

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 320;
      const spacing = 10;

      let top = rect.top + window.scrollY;
      const approxPopupHeight = 250;
      if (top + approxPopupHeight > window.innerHeight + window.scrollY) {
          top = window.innerHeight + window.scrollY - approxPopupHeight - spacing;
          if (top < window.scrollY) top = window.scrollY + spacing;
      }

      let left;
      const spaceRight = window.innerWidth - (rect.right + spacing);
      const spaceLeft = rect.left - spacing;

      if (spaceRight >= popupWidth) {
          left = rect.right + window.scrollX + spacing;
      } else if (spaceLeft >= popupWidth) {
          left = rect.left + window.scrollX - popupWidth - spacing;
      } else {
          left = window.scrollX + spacing;
          if (left + popupWidth > window.innerWidth + window.scrollX) {
              left = window.innerWidth + window.scrollX - popupWidth - spacing;
              if (left < window.scrollX) left = window.scrollX + spacing;
          }
      }

      setPopupPosition({ top, left });
      setShowPopup((prev) => !prev);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`day-view-appointment-card ${colorClass}`}
        style={style}
        onClick={handleClick}
      >
        <div className="day-view-card-header">
          <span className="day-view-card-patient-name">{patients.patientName}</span>
        </div>
        <div className="day-view-card-details">
          <p className="day-view-card-time-range">{formattedStartTime} - {formattedEndTime}</p>
          {patients.treatment && <p className="day-view-card-type">{patients.treatment}</p>}
          {patients.description && <p className="day-view-card-description">{patients.description}</p>}
        </div>
      </div>

      {showPopup && (
        <AppointmentPopup
          patients={patients}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onClose={handleClosePopup}
          setShowPopup={setShowPopup}
          popupRef={popupRef}
        />
      )}
    </>
  );
};

export default DayViewAppointmentCard;