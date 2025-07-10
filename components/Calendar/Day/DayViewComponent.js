// components/DayViewComponent.js
"use client"; // Add if not already present
import React, { useState, useEffect } from 'react';
import DayViewAppointmentCard from './DayViewAppointmentCard';
import './DayViewComponent.css';

const DayViewComponent = ({ patients, currentDisplayDate, onTimeSlotClick }) => { // <--- Added onTimeSlotClick prop
  const calendarStartHour = 0;
  const pixelsPerHour = 100;
  const timeSlots = Array.from({ length: 24 }, (_, i) => calendarStartHour + i);

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

  const calculateCurrentTimeIndicatorPosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const isTodayDisplayed =
      currentDisplayDate.getDate() === currentTime.getDate() &&
      currentDisplayDate.getMonth() === currentTime.getMonth() &&
      currentDisplayDate.getFullYear() === currentTime.getFullYear();

    if (isTodayDisplayed && currentHour >= calendarStartHour && currentHour < calendarStartHour + timeSlots.length) {
      const hoursFromStart = currentHour - calendarStartHour;
      const topPosition = (hoursFromStart * pixelsPerHour) + (currentMinute / 60) * pixelsPerHour;
      return topPosition;
    }
    return -1;
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

  // New handler for clicking on an empty time slot in the day view
  const handleTimeSlotBackgroundClick = (hour) => {
    if (onTimeSlotClick) {
      // Create a Date object for the clicked hour on the currentDisplayDate
      const clickedDateTime = new Date(
        currentDisplayDate.getFullYear(),
        currentDisplayDate.getMonth(),
        currentDisplayDate.getDate(),
        hour,
        0 // Minutes, set to 0 for the start of the hour
      );
      onTimeSlotClick(clickedDateTime);
    }
  };

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
        {/* Render background hour lines and make them clickable */}
        {timeSlots.map(hour => (
          <div
            key={`hour-bg-${hour}`}
            className="day-view-hour-slot-background"
            onClick={() => handleTimeSlotBackgroundClick(hour)} 
          ></div>
        ))}

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

        {dayAppointments.map(app => {
          const appStartTime = app.startTime instanceof Date ? app.startTime : new Date(app.startTime);
          const appEndTime = app.endTime instanceof Date ? app.endTime : new Date(app.endTime);

          const startMinutesFromCalendarStart = (appStartTime.getHours() - calendarStartHour) * 60 + appStartTime.getMinutes();
          const durationMinutes = (appEndTime.getTime() - appStartTime.getTime()) / (60 * 1000);

          const appTop = (startMinutesFromCalendarStart / 60) * pixelsPerHour;
          const appHeight = (durationMinutes / 60) * pixelsPerHour;

          return (
            <DayViewAppointmentCard
              key={app.id}
              patients={app}
              style={{ top: `${appTop}px`, height: `${appHeight}px` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DayViewComponent;