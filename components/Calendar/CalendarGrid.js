// components/Calendar/CalendarGrid.js
"use client";
import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import './CalendarGrid.css';

// CalendarGrid now accepts currentWeekStart, displayedDates, and onTimeSlotClick as props
const CalendarGrid = ({ patients, currentWeekStart, displayedDates, onTimeSlotClick }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = displayedDates;

  const calendarStartHour = 0; // Start at 00:00 (12 AM)
  const timeSlots = Array.from({ length: 24 }, (_, i) => calendarStartHour + i); // 24 hours in a day

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

    // Filter appointments for the specific day, considering month and year
    return patients.filter(
      (app) =>
        app.startTime && // Ensure startTime exists
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

  // Check if today's date is actually displayed in the current week view
  const isTodayDisplayed = dates.includes(currentTime.getDate()) &&
                           currentWeekStart.getMonth() === currentTime.getMonth() &&
                           currentWeekStart.getFullYear() === currentTime.getFullYear();


  // New function to handle clicks on time slots
  const handleTimeSlotClick = (dateDayNumber, hour) => {
    if (onTimeSlotClick) {
      // Construct a Date object representing the clicked time slot
      // We need to use the full year and month from currentWeekStart,
      // and the day number from the loop (dateDayNumber), and the hour from the time slot.
      const clickedDateTime = new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        dateDayNumber,
        hour,
        0 // Minutes, set to 0 for the start of the hour
      );
      // Call the passed-in function with the clicked Date object
      onTimeSlotClick(clickedDateTime);
    }
  };


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
                <div
                  key={`${dateDayNumber}-${hour}`}
                  className="hour-cell-background"
                  onClick={() => handleTimeSlotClick(dateDayNumber, hour)} // Removed the comment here
                ></div>
              ))}

              {/* Current time indicator - now dynamically positioned and shown only for today's column */}
              {/* Ensure this indicator only appears in the column corresponding to the actual current day's date, month, and year */}
              {dateDayNumber === currentTime.getDate() &&
               currentWeekStart.getMonth() === currentTime.getMonth() &&
               currentWeekStart.getFullYear() === currentTime.getFullYear() &&
               currentTimeTop !== -1 && (
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
                  patients={patient} // Note: This prop name is 'patients' but usually it's a single 'patient' object
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