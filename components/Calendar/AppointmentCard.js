// components/AppointmentCard/AppointmentCard.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import "./AppointmentCard.css";
import AppointmentPopup from "./AppointmentPopup"; // Ensure this path is correct

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

// Receive calendarStartHour and pixelsPerHour as props
const AppointmentCard = ({ patients, calendarStartHour, pixelsPerHour }) => {
  const colorClass = colorMap[patients.treatment] || "app-card-default";
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [startTimeStr, setStartTimeStr] = useState("");
  const [endTimeStr, setEndTimeStr] = useState("");
  const cardRef = useRef(null);
  const popupRef = useRef(null);
  const showTimeoutRef = useRef(null); // Added for hover delay
  const hideTimeoutRef = useRef(null); // Added for hover delay

  useEffect(() => {
    const start = patients.startTime instanceof Date ? patients.startTime : new Date(patients.startTime);
    const end = patients.endTime instanceof Date ? patients.endTime : new Date(patients.endTime);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    setStartTimeStr(start.toLocaleTimeString([], options));
    setEndTimeStr(end.toLocaleTimeString([], options));
  }, [patients.startTime, patients.endTime]);

  const startOfDayMinutes = calendarStartHour * 60;

  const pixelsPerMinute = pixelsPerHour / 60;

  const startMin =
    patients.startTime.getHours() * 60 + patients.startTime.getMinutes();
  const endMin =
    patients.endTime.getHours() * 60 + patients.endTime.getMinutes();

  const topOffset = (startMin - startOfDayMinutes) * pixelsPerMinute;
  const height = (endMin - startMin) * pixelsPerMinute;

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

  // --- New Hover Handlers (Same as previous examples) ---
  const handleMouseEnterCard = () => {
    // Clear any pending hide timeout when mouse enters the card (or re-enters from popup)
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    // Clear any existing show timeout to prevent multiple triggers
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    // Set a timeout before showing the popup
    showTimeoutRef.current = setTimeout(() => {
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
        setShowPopup(true);
      }
    }, 300); // 300ms delay before showing popup
  };

  const handleMouseLeaveCard = () => {
    // Clear the show timeout immediately
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    // Set a small delay before hiding the popup, to allow moving mouse to popup
    hideTimeoutRef.current = setTimeout(() => {
        // Only hide if the mouse is not currently over the popup
        if (popupRef.current && !popupRef.current.matches(':hover')) {
            setShowPopup(false);
        }
    }, 100); // Small delay before hiding
  };

  // Handlers for the popup itself
  const handleMouseEnterPopup = () => {
    // When mouse enters popup, clear the hide timeout on the card
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleMouseLeavePopup = () => {
    // When mouse leaves popup, hide the popup
    setShowPopup(false);
  };
  // --- End New Hover Handlers ---


  return (
    <div>
      <div
        ref={cardRef}
        className={`appointment-card ${colorClass}`}
        style={{ top: `${topOffset}px`, height: `${height}px` }}
        onMouseEnter={handleMouseEnterCard} // <--- Use onMouseEnter
        onMouseLeave={handleMouseLeaveCard} // <--- Use onMouseLeave
        // onClick handler is removed from here for hover functionality
      >
        <p className="patient-name">{patients.patientName}</p>
        <p className="treatment-type">{patients.treatment}</p>
        <p className="time-range">
          {startTimeStr} - {endTimeStr}
        </p>
        {patients.hasMore && <div className="badge-count">3+</div>}
        {patients.hasDot && <div className="dot-indicator"></div>}
      </div>
      {showPopup && (
        <AppointmentPopup
          patients={patients}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onClose={handleClosePopup}
          setShowPopup={setShowPopup}
          popupRef={popupRef}
          // Add hover events to the popup itself
          onMouseEnter={handleMouseEnterPopup} // Allow mouse to move onto popup
          onMouseLeave={handleMouseLeavePopup} // Hide popup when mouse leaves popup
        />
      )}
    </div>
  );
};

export default AppointmentCard;