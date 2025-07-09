// components/AppointmentCard/DayViewAppointmentCard.js
import React from 'react';
import './DayViewAppointmentCard.css'; // Dedicated CSS for day view card

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
  // *** ADDED: Color for Invisalign Scan ***
  "Invisalign Scan": "app-card-blue", // You can choose any color from your CSS
};

const DayViewAppointmentCard = ({ appointment, style }) => {
  if (!appointment) {
    return null;
  }

  // *** CRUCIAL FIX: Use appointment.treatment for color lookup ***
  const colorClass = colorMap[appointment.treatment] || "app-card-default";

  const startTime = appointment.startTime instanceof Date ? appointment.startTime : new Date(appointment.startTime);
  const endTime = appointment.endTime instanceof Date ? appointment.endTime : new Date(appointment.endTime);

  const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className={`day-view-appointment-card ${colorClass}`} style={style}>
      <div className="day-view-card-header">
        <span className="day-view-card-patient-name">{appointment.patientName}</span>
      </div>
      <div className="day-view-card-details">
        <p className="day-view-card-time-range">{formattedStartTime} - {formattedEndTime}</p>
        {/* *** UPDATED: Display appointment.treatment instead of appointment.type *** */}
        {appointment.treatment && <p className="day-view-card-type">{appointment.treatment}</p>}
        {appointment.description && <p className="day-view-card-description">{appointment.description}</p>}
      </div>
    </div>
  );
};

export default DayViewAppointmentCard;