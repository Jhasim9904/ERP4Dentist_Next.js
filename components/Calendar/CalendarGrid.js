// components/CalendarGrid.js
"use client";
import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import './CalendarGrid.css';

// CalendarGrid now accepts currentWeekStart and displayedDates as props
const CalendarGrid = ({ patients, currentWeekStart, displayedDates }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = displayedDates;

  const calendarStartHour = 0; // Start at 00:00 (12 AM)
  const timeSlots = Array.from({ length: 24 }, (_, i) => calendarStartHour + i); // 24 hours in a day

  // --- CHANGE MADE HERE: pixelsPerHour now 200 ---
  const pixelsPerHour = 200; // Assuming 200px height per hour slot in your CSS

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatTime = (hour) => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const getAppointmentsForDay = (dateDayNumber) => {
    const targetYear = currentWeekStart.getFullYear();
    const targetMonth = currentWeekStart.getMonth();

    return patients.filter(
      (app) =>
        app.startTime.getDate() === dateDayNumber &&
        app.startTime.getFullYear() === targetYear &&
        app.startTime.getMonth() === targetMonth
    );
  };

  const calculateCurrentTimeIndicatorPosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour >= calendarStartHour && currentHour < calendarStartHour + timeSlots.length) {
      const hoursFromStart = currentHour - calendarStartHour;
      const topPosition = (hoursFromStart * pixelsPerHour) + (currentMinute / 60) * pixelsPerHour;
      return topPosition;
    }
    return -1;
  };

  const currentTimeTop = calculateCurrentTimeIndicatorPosition();

  const isTodayDisplayed = dates.includes(currentTime.getDate()) &&
                           currentTime.getMonth() === currentWeekStart.getMonth() &&
                           currentTime.getFullYear() === currentWeekStart.getFullYear();

  return (
    <div className="calendar-grid-container">
      {/* Time column */}
      <div className="time-column">
        <div className="time-header-label">IST</div>
        {timeSlots.map((hour) => (
          <div key={hour} className="time-slot-label">
            {formatTime(hour)}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid-body">
        {/* Day Headers */}
        <div className="day-headers">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`day-header-cell ${
                dates[index] === currentTime.getDate() && isTodayDisplayed
                  ? 'day-header-today'
                  : ''
              }`}
            >
              <span className="day-header-name">{day}</span>
              <span className="day-header-date">{dates[index]}</span>
            </div>
          ))}
        </div>

        {/* Time Slots and Appointments */}
        <div className="appointment-slots-grid">
          {dates.map((dateDayNumber, dateIndex) => (
            <div key={dateDayNumber} className="day-slot-column">
              {timeSlots.map((hour) => (
                <div key={`${dateDayNumber}-${hour}`} className="hour-cell-background"></div>
              ))}

              {/* Current time indicator - now dynamically positioned and shown only for today's column */}
              {dateDayNumber === currentTime.getDate() && isTodayDisplayed && currentTimeTop !== -1 && (
                <div
                  className="current-time-indicator"
                  style={{ top: `${currentTimeTop}px` }}
                >
                  <div className="current-time-label">
                    {currentTime.getHours().toString().padStart(2, '0')}.{currentTime.getMinutes().toString().padStart(2, '0')}
                  </div>
                </div>
              )}

              {/* Appointments for this specific day */}
              {getAppointmentsForDay(dateDayNumber).map((patient) => (
                <AppointmentCard
                  key={patient.id}
                  patients={patient}
                  calendarStartHour={calendarStartHour}
                  pixelsPerHour={pixelsPerHour} // Pass the updated pixelsPerHour
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;