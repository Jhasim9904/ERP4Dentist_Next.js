import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import './CalendarGrid.css';

// CalendarGrid now accepts currentWeekStart and displayedDates as props
const CalendarGrid = ({ appointments, currentWeekStart, displayedDates }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // 'dates' is now populated dynamically from the 'displayedDates' prop
  const dates = displayedDates;

  const calendarStartHour = 10;
  const timeSlots = Array.from({ length: 10 }, (_, i) => calendarStartHour + i);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (hour) => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  // This function now uses the dynamic `currentWeekStart` to determine target month/year
  const getAppointmentsForDay = (dateDayNumber) => {
    // These now come from the currentWeekStart prop, which changes with navigation
    const targetYear = currentWeekStart.getFullYear();
    const targetMonth = currentWeekStart.getMonth(); // 0-indexed month

    return appointments.filter(
      (app) =>
        app.startTime.getDate() === dateDayNumber &&
        // Important: When a week spans across months (e.g., end of Feb to beginning of Mar),
        // the `dateDayNumber` might belong to the next month, even though `currentWeekStart`
        // is in the previous month. The safest way is to ensure the appointment's
        // full date (year, month, and day) matches one of the days in the current week.
        // For simplicity and given the `getDatesForWeek` only returns day numbers,
        // we'll stick to matching month and year from `currentWeekStart` for now.
        // A more robust solution would pass full date objects for each day of the week.
        app.startTime.getFullYear() === targetYear &&
        app.startTime.getMonth() === targetMonth
    );
  };

  const calculateCurrentTimeIndicatorPosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour >= calendarStartHour && currentHour <= timeSlots[timeSlots.length - 1]) {
      const hoursFromStart = currentHour - calendarStartHour;
      const pixelsPerHour = 60; // Assuming 60px height per hour slot in CSS
      const topPosition = (hoursFromStart * pixelsPerHour) + (currentMinute / 60) * pixelsPerHour;
      return topPosition;
    }
    return -1;
  };

  const currentTimeTop = calculateCurrentTimeIndicatorPosition();
  // Check if today (current real-world date) falls within the currently displayed week
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
              // Highlight today's date if it's in the displayed week
              className={`day-header-cell ${
                dates[index] === currentTime.getDate() && isTodayDisplayed
                  ? 'day-header-today'
                  : ''
              }`}
            >
              <span className="day-header-name">{day}</span>
              <span className="day-header-date">{dates[index]}</span> {/* Dynamic day number */}
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
              {getAppointmentsForDay(dateDayNumber).map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;