// components/Calendar/Month/MonthlyCalendar.js
"use client"; // If not already there
import React from 'react';
import MonthlyAppointmentCard from './MonthlyAppointmentCard';
import './MonthlyCalendar.css';

const MonthlyCalendar = ({ patients, currentDisplayDate, onTimeSlotClick }) => { // <--- Added onTimeSlotClick prop

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
    return patients.filter(app => {
      // Ensure app.startTime is a Date object. If it comes from context/API as a string, convert it.
      const appStartTime = app.startTime instanceof Date ? app.startTime : new Date(app.startTime);
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

      // Pass the full Date object for the clicked day
      const clickDate = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), prevMonthDate.getDate());

      days.push(
        <div
          key={`prev-${dayNumber}`}
          className="monthly-day-cell prev-month"
          onClick={() => onTimeSlotClick(clickDate)} // Click handler for prev month day
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

      // Pass the full Date object for the clicked day
      const clickDate = new Date(year, month, i);

      days.push(
        <div
          key={`current-${i}`}
          className={`monthly-day-cell current-month ${isCurrentDay ? 'today' : ''}`}
          onClick={() => onTimeSlotClick(clickDate)} // Click handler for current month day
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
    const remainingCells = 42 - totalCells; // Max 42 cells needed for a full month display

    for (let i = 1; i <= remainingCells; i++) {
        const nextMonthDate = new Date(year, month + 1, i);
        const dayAppointments = getAppointmentsForDay(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDate.getDate());

        // Pass the full Date object for the clicked day
        const clickDate = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDate.getDate());

      days.push(
        <div
          key={`next-${i}`}
          className="monthly-day-cell next-month"
          onClick={() => onTimeSlotClick(clickDate)} // Click handler for next month day
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