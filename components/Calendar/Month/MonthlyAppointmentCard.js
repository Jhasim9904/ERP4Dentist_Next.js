// components/AppointmentCard/MonthlyAppointmentCard.js
import React from 'react';
import './MonthlyAppointmentCard.css'; // Dedicated CSS for monthly card

// Define the color map directly in the component for self-containment
// Ensure the keys here match the exact strings in your appointment.treatment data
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

const MonthlyAppointmentCard = ({ appointment }) => {
  if (!appointment) {
    return null;
  }

  // Safely get start time and format for display
  const startTime = appointment.startTime instanceof Date ? appointment.startTime : new Date(appointment.startTime);
  const formattedTime = startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // e.g., 10:00 AM
  });

  // *** CRITICAL CHANGE: Get the color class based on appointment.treatment ***
  // If 'appointment.treatment' is not found in the colorMap, it will use 'app-card-default'
  const colorClass = colorMap[appointment.treatment] || 'app-card-default';

  // Example: You might want to show a small colored dot based on appointment type or status
  // For simplicity, we'll just show patient name and time.
  const hasDot = appointment.type; // This still uses 'type', which is fine for a dot indicator

  return (
    // Apply the dynamically determined colorClass here
    <div className={`monthly-appointment-card ${colorClass} ${hasDot ? 'has-dot' : ''}`}>
      {/* You can choose to display time or not based on space/design preference */}
      <span className="monthly-card-time">{formattedTime.replace(':00 ', ' ')}</span> {/* Remove :00 for cleaner look */}
      <span className="monthly-card-patient-name">{appointment.patientName}</span>
      {/* Add more compact details if needed, e.g., brief subject, but keep it minimal */}
    </div>
  );
};

export default MonthlyAppointmentCard;