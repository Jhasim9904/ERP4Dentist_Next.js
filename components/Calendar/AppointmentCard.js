// components/AppointmentCard/AppointmentCard.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import "./AppointmentCard.css";
import AppointmentPopup from "./AppointmentPopup";

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

const AppointmentCard = ({ appointment }) => {
  const colorClass = colorMap[appointment.treatment] || "app-card-default";
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [startTimeStr, setStartTimeStr] = useState("");
  const [endTimeStr, setEndTimeStr] = useState("");
  const cardRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const start = appointment.startTime instanceof Date ? appointment.startTime : new Date(appointment.startTime);
    const end = appointment.endTime instanceof Date ? appointment.endTime : new Date(appointment.endTime);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    setStartTimeStr(start.toLocaleTimeString([], options));
    setEndTimeStr(end.toLocaleTimeString([], options));
  }, [appointment.startTime, appointment.endTime]);

  const calendarStartHour = 10;
  const startOfDayMinutes = calendarStartHour * 60;
  const startMin =
    appointment.startTime.getHours() * 60 + appointment.startTime.getMinutes();
  const endMin =
    appointment.endTime.getHours() * 60 + appointment.endTime.getMinutes();
  const pixelsPerMinute = 200 / 60;

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

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 320;
      const spacing = 10; // Space between card and popup

      let top = rect.top + window.scrollY; // Vertical positioning (already robust)
      const approxPopupHeight = 250;
      if (top + approxPopupHeight > window.innerHeight + window.scrollY) {
          top = window.innerHeight + window.scrollY - approxPopupHeight - spacing;
          if (top < window.scrollY) top = window.scrollY + spacing; // Ensure it's not totally off top
      }

      // --- IMPROVED HORIZONTAL POSITIONING LOGIC ---
      let left;
      const spaceRight = window.innerWidth - (rect.right + spacing);
      const spaceLeft = rect.left - spacing;

      // Prioritize placing to the right if there's enough space
      if (spaceRight >= popupWidth) {
          left = rect.right + window.scrollX + spacing;
      }
      // Otherwise, try placing to the left if there's enough space
      else if (spaceLeft >= popupWidth) {
          left = rect.left + window.scrollX - popupWidth - spacing;
      }
      // If neither side has enough space, or if the card is very narrow,
      // position it from the left edge of the viewport with a margin.
      else {
          left = window.scrollX + spacing;
          // Ensure it doesn't go off the right if pushed too far left on a very small screen
          if (left + popupWidth > window.innerWidth + window.scrollX) {
              left = window.innerWidth + window.scrollX - popupWidth - spacing;
              if (left < window.scrollX) left = window.scrollX + spacing; // Final fallback: at left edge
          }
      }
      // --- END IMPROVED HORIZONTAL POSITIONING LOGIC ---

      setPopupPosition({ top, left });
      setShowPopup((prev) => !prev);
    }
  };

  return (
    <div>
      <div
        ref={cardRef}
        className={`appointment-card ${colorClass}`}
        style={{ top: `${topOffset}px`, height: `${height}px` }}
        onClick={handleClick}
      >
        <p className="patient-name">{appointment.patientName}</p>
        <p className="treatment-type">{appointment.treatment}</p>
        <p className="time-range">
          {startTimeStr} - {endTimeStr}
        </p>
        {appointment.hasMore && <div className="badge-count">3+</div>}
        {appointment.hasDot && <div className="dot-indicator"></div>}
      </div>
      {showPopup && (
        <AppointmentPopup
          appointment={appointment}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onClose={handleClosePopup}
          setShowPopup={setShowPopup}
          popupRef={popupRef}
        />
      )}
    </div>
  );
};

export default AppointmentCard;