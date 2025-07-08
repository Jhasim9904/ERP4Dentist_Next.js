// components/AppointmentCard/MonthlyAppointmentCard.js
import React from 'react';
import './MonthlyAppointmentCard.css'; // Dedicated CSS for monthly card

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

  // Example: You might want to show a small colored dot based on appointment type or status
  // For simplicity, we'll just show patient name and time.
  const hasDot = appointment.type; // Example: if appointment has a type, show a dot

  return (
    <div className={`monthly-appointment-card ${hasDot ? 'has-dot' : ''}`}>
      {/* You can choose to display time or not based on space/design preference */}
      <span className="monthly-card-time">{formattedTime.replace(':00 ', ' ')}</span> {/* Remove :00 for cleaner look */}
      <span className="monthly-card-patient-name">{appointment.patientName}</span>
      {/* Add more compact details if needed, e.g., brief subject, but keep it minimal */}
    </div>
  );
};

export default MonthlyAppointmentCard;