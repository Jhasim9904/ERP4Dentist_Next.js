// components/Calendar/Month/MonthlyCalendar.js
"use client";
import React, { useEffect, useState } from 'react';
import MonthlyAppointmentCard from './MonthlyAppointmentCard';
import './MonthlyCalendar.css';

const MonthlyCalendar = ({ patients, currentDisplayDate, onTimeSlotClick }) => {
  // State to hold patients with guaranteed Date objects for startTime
  const [processedPatients, setProcessedPatients] = useState([]);

  // Process patients data when the 'patients' prop changes
  useEffect(() => {
    const updatedPatients = patients.map(app => {
      // If startTime is already a Date object, or if datetime is missing, use as is.
      // Otherwise, attempt to convert datetime string to a Date object for startTime.
      if (app.startTime instanceof Date) {
        return app;
      } else if (typeof app.datetime === 'string' && app.datetime) {
        // Assuming datetime is in a format like "YYYY-MM-DD, HH:mm"
        // We need to parse it correctly. A simple new Date() might work if format is ISO.
        // If not, we might need custom parsing. For now, let's assume a parseable format.
        const [datePart, timePart] = app.datetime.split(', ');
        const dateTimeString = `${datePart}T${timePart}:00`; // Adding seconds for robust parsing
        const parsedDate = new Date(dateTimeString);

        // Check if parsedDate is a valid Date object
        if (!isNaN(parsedDate.getTime())) {
          return { ...app, startTime: parsedDate };
        }
      }
      // If startTime is not a Date and datetime cannot be parsed, return original app
      // This might mean some appointments won't show if their date is invalid.
      console.warn("Could not parse startTime for appointment:", app);
      return app;
    });
    setProcessedPatients(updatedPatients);
  }, [patients]); // Re-run when patients prop changes

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getDaysInPrevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };

  const getAppointmentsForDay = (year, month, day) => {
    // Use processedPatients here
    return processedPatients.filter(app => {
      const appStartTime = app.startTime;

      // Defensive check: ensure appStartTime is a valid Date object
      if (!(appStartTime instanceof Date) || isNaN(appStartTime.getTime())) {
        return false; // Skip if startTime is not a valid Date
      }

      return appStartTime.getFullYear() === year &&
             appStartTime.getMonth() === month && // month is 0-indexed
             appStartTime.getDate() === day;
    });
  };

  const renderDays = () => {
    const year = currentDisplayDate.getFullYear();
    const month = currentDisplayDate.getMonth(); // 0-indexed

    const firstDay = getFirstDayOfMonth(currentDisplayDate);
    const daysInMonth = getDaysInMonth(currentDisplayDate);
    const daysInPrevMonth = getDaysInPrevMonth(currentDisplayDate);

    const days = [];

    // Fill in days from the previous month (leading empty cells)
    const prevMonthStartDate = daysInPrevMonth - firstDay + 1;
    for (let i = 0; i < firstDay; i++) {
      const dayNumber = prevMonthStartDate + i;
      const prevMonthDate = new Date(year, month - 1, dayNumber);
      const dayAppointments = getAppointmentsForDay(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), prevMonthDate.getDate());

      const clickDate = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), prevMonthDate.getDate());

      days.push(
        <div
          key={`prev-${dayNumber}`}
          className="monthly-day-cell prev-month"
          onClick={() => onTimeSlotClick(clickDate)}
        >
          <span className="monthly-day-cell-number">{dayNumber}</span>
          <div className="monthly-day-appointments-container">
            {dayAppointments.map(app => (
              <MonthlyAppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        </div>
      );
    }

    // Fill in days of the current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const dayAppointments = getAppointmentsForDay(year, month, i);

      const clickDate = new Date(year, month, i);

      days.push(
        <div
          key={`current-${i}`}
          className={`monthly-day-cell current-month ${isCurrentDay ? 'today' : ''}`}
          onClick={() => onTimeSlotClick(clickDate)}
        >
          <span className="monthly-day-cell-number">{i}</span>
          <div className="monthly-day-appointments-container">
            {dayAppointments.map(app => (
              <MonthlyAppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        </div>
      );
    }

    // Fill in days from the next month (trailing empty cells to complete the grid)
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;

    for (let i = 1; i <= remainingCells; i++) {
        const nextMonthDate = new Date(year, month + 1, i);
        const dayAppointments = getAppointmentsForDay(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDate.getDate());

        const clickDate = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDate.getDate());

      days.push(
        <div
          key={`next-${i}`}
          className="monthly-day-cell next-month"
          onClick={() => onTimeSlotClick(clickDate)}
        >
          <span className="monthly-day-cell-number">{i}</span>
          <div className="monthly-day-appointments-container">
            {dayAppointments.map(app => (
              <MonthlyAppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="monthly-calendar-wrapper">
      <div className="monthly-view-grid-body">
        <div className="monthly-view-day-headers">
          {daysOfWeek.map((day) => (
            <div key={day} className="monthly-view-day-header-cell">
              <span className="monthly-view-day-header-name">{day}</span>
            </div>
          ))}
        </div>

        <div className="monthly-appointment-slots-grid">
            {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;