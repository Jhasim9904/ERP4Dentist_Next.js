// components/Calendar/Month/MonthlyAppointmentCard.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import AppointmentPopup from '@/components/Calendar/AppointmentPopup'; // Make sure this path is correct
import './MonthlyAppointmentCard.css';

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

const MonthlyAppointmentCard = ({ appointment }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);
  const popupRef = useRef(null); // Ref for the popup itself
  const showTimeoutRef = useRef(null); // Ref to store the timeout for showing popup
  const hideTimeoutRef = useRef(null); // Ref to store the timeout for hiding popup

  if (!appointment) {
    return null;
  }

  const colorClass = colorMap[appointment.treatment] || "app-card-default";

  const startTime = appointment.startTime instanceof Date ? appointment.startTime : new Date(appointment.startTime);
  const endTime = appointment.endTime instanceof Date ? appointment.endTime : new Date(appointment.endTime);

  const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // This useEffect ensures the popup closes if the user clicks anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the popup is shown AND the click is not on the card AND not on the popup
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

  // --- New Handlers for the popup itself ---
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


  return (
    <>
      <div
        ref={cardRef}
        className={`monthly-appointment-card ${colorClass}`}
        onMouseEnter={handleMouseEnterCard} // Use onMouseEnter for the card
        onMouseLeave={handleMouseLeaveCard} // Use onMouseLeave for the card
        title={appointment.patientName}
      >
        <span className="monthly-card-time">{formattedStartTime}</span>
        <span className="monthly-card-patient-name">{appointment.patientName}</span>
      </div>

      {showPopup && (
        <AppointmentPopup
          patients={appointment}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onClose={handleClosePopup}
          setShowPopup={setShowPopup}
          popupRef={popupRef}
          // Add hover events to the popup itself
          onMouseEnter={handleMouseEnterPopup} // Allow mouse to move onto popup
          onMouseLeave={handleMouseLeavePopup} // Hide popup when mouse leaves popup
        />
      )}
    </>
  );
};

export default MonthlyAppointmentCard;