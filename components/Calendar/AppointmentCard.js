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
};

const AppointmentCard = ({ appointment }) => {
  const colorClass = colorMap[appointment.treatment] || "app-card-gray";
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [startTimeStr, setStartTimeStr] = useState("");
  const [endTimeStr, setEndTimeStr] = useState("");
  const cardRef = useRef(null);

  // Format time only on client
  useEffect(() => {
    const options = { hour: "2-digit", minute: "2-digit" };
    setStartTimeStr(appointment.startTime.toLocaleTimeString([], options));
    setEndTimeStr(appointment.endTime.toLocaleTimeString([], options));
  }, [appointment.startTime, appointment.endTime]);

  // Calculate position
  const startOfDayMinutes = 10 * 60;
  const startMin =
    appointment.startTime.getHours() * 60 + appointment.startTime.getMinutes();
  const endMin =
    appointment.endTime.getHours() * 60 + appointment.endTime.getMinutes();

  const pixelsPerMinute = 200 / 60;

  const topOffset = (startMin - startOfDayMinutes) * pixelsPerMinute;
  const height = (endMin - startMin) * pixelsPerMinute;

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 320;
      const spacing = 10;

      let left = rect.right + window.scrollX + spacing;
      let top = rect.top + window.scrollY;

      if (left + popupWidth > window.innerWidth) {
        left = rect.left + window.scrollX - popupWidth - spacing;
      }

      setPopupPosition({ top, left });
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
      setShowPopup(false);
  };

  return (
    <div>
      <div
        ref={cardRef}
        className={`appointment-card ${colorClass}`}
        style={{ top: `${topOffset}px`, height: `${height}px` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          onClose={() => setShowPopup(false)}
          setShowPopup={setShowPopup}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default AppointmentCard;
