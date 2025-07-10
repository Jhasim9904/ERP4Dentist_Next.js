// components/DayViewComponent.js
import React, { useState, useEffect } from 'react';
import DayViewAppointmentCard from './DayViewAppointmentCard';
import './DayViewComponent.css';

const DayViewComponent = ({ patients, currentDisplayDate }) => {
  // --- CHANGES FOR 24/7 TIMING START HERE ---
  const calendarStartHour = 0; // Start at 00:00 (12 AM) for 24/7 day view
  const pixelsPerHour = 100; // This must match .day-view-hour-slot height in DayViewComponent.css
  const timeSlots = Array.from({ length: 24 }, (_, i) => calendarStartHour + i); // 24 hours in a day
  // --- CHANGES FOR 24/7 TIMING END HERE ---

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (hour) => {
    // This function already handles AM/PM conversion for 0-23 hours correctly
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const calculateCurrentTimeIndicatorPosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const isTodayDisplayed =
      currentDisplayDate.getDate() === currentTime.getDate() &&
      currentDisplayDate.getMonth() === currentTime.getMonth() &&
      currentDisplayDate.getFullYear() === currentTime.getFullYear();

    // Adjusted condition to cover 0-23 hours based on calendarStartHour (which is 0)
    if (isTodayDisplayed && currentHour >= calendarStartHour && currentHour < calendarStartHour + timeSlots.length) {
      const hoursFromStart = currentHour - calendarStartHour;
      const topPosition = (hoursFromStart * pixelsPerHour) + (currentMinute / 60) * pixelsPerHour;
      return topPosition;
    }
    return -1; // Indicate not visible
  };

  const currentTimeTop = calculateCurrentTimeIndicatorPosition();

  const getAppointmentsForDay = () => {
    const targetYear = currentDisplayDate.getFullYear();
    const targetMonth = currentDisplayDate.getMonth();
    const targetDay = currentDisplayDate.getDate();

    return patients
      .filter(app => {
        const appStartTime = app.startTime instanceof Date ? app.startTime : new Date(app.startTime);
        return appStartTime.getFullYear() === targetYear &&
               appStartTime.getMonth() === targetMonth &&
               appStartTime.getDate() === targetDay;
      })
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  };

  const dayAppointments = getAppointmentsForDay();

  return (
    <div className="day-view-container">
      <div className="day-view-time-column">
        {timeSlots.map(hour => (
          <div key={hour} className="day-view-time-slot-label">
            {formatTime(hour)}
          </div>
        ))}
      </div>
      <div className="day-view-appointments-column">
        {/* Render background hour lines */}
        {timeSlots.map(hour => (
          <div key={`hour-bg-${hour}`} className="day-view-hour-slot-background"></div>
        ))}

        {/* Current Time Indicator for Day View */}
        {currentTimeTop !== -1 && (
          <div
            className="day-view-current-time-indicator"
            style={{ top: `${currentTimeTop}px` }}
          >
            <div className="day-view-current-time-label">
              {currentTime.getHours().toString().padStart(2, '0')}.{currentTime.getMinutes().toString().padStart(2, '0')}
            </div>
          </div>
        )}

        {/* Appointments for the day */}
        {dayAppointments.map(app => {
          const appStartTime = app.startTime instanceof Date ? app.startTime : new Date(app.startTime);
          const appEndTime = app.endTime instanceof Date ? app.endTime : new Date(app.endTime);

          // Calculate start position relative to 00:00 (calendarStartHour)
          const startMinutesFromCalendarStart = (appStartTime.getHours() - calendarStartHour) * 60 + appStartTime.getMinutes();
          const durationMinutes = (appEndTime.getTime() - appStartTime.getTime()) / (60 * 1000);

          // Calculate top and height using pixelsPerHour
          const appTop = (startMinutesFromCalendarStart / 60) * pixelsPerHour;
          const appHeight = (durationMinutes / 60) * pixelsPerHour;

          return (
            <DayViewAppointmentCard
              key={app.id}
              patients={app}
              style={{ top: `${appTop}px`, height: `${appHeight}px` }} // Pass calculated styles
            />
          );
        })}
      </div>
    </div>
  );
};

export default DayViewComponent;