import React, { useState, useEffect } from 'react';
import DayViewAppointmentCard from './DayViewAppointmentCard'; // Correct path
// import AppointmentPopup from '../AppointmentPopup'; // REMOVE this import
import './DayViewComponent.css';

const DayViewComponent = ({ appointments, currentDisplayDate }) => {
  const calendarStartHour = 10; // Day view starts at 10 AM
  const pixelsPerHour = 100; // This must match .day-view-hour-slot height in DayViewComponent.css
  const timeSlots = Array.from({ length: 10 }, (_, i) => calendarStartHour + i); // 10 AM to 7 PM

  const [currentTime, setCurrentTime] = useState(new Date());

  // REMOVED: Popup state management
  // const [showPopup, setShowPopup] = useState(false);
  // const [selectedAppointment, setSelectedAppointment] = useState(null);
  // const [popupStyle, setPopupStyle] = useState({});

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

    if (isTodayDisplayed && currentHour >= calendarStartHour && currentHour <= timeSlots[timeSlots.length - 1]) {
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

    return appointments
      .filter(app => {
        const appStartTime = app.startTime instanceof Date ? app.startTime : new Date(app.startTime);
        return appStartTime.getFullYear() === targetYear &&
               appStartTime.getMonth() === targetMonth &&
               appStartTime.getDate() === targetDay;
      })
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  };

  // REMOVED: handleAppointmentCardClick and handleClosePopup functions
  // const handleAppointmentCardClick = (appointment, event) => { /* ... */ };
  // const handleClosePopup = () => { /* ... */ };

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

          const startMinutesFromCalendarStart = (appStartTime.getHours() - calendarStartHour) * 60 + appStartTime.getMinutes();
          const durationMinutes = (appEndTime.getTime() - appStartTime.getTime()) / (60 * 1000);

          const appTop = (startMinutesFromCalendarStart / 60) * pixelsPerHour;
          const appHeight = (durationMinutes / 60) * pixelsPerHour;

          return (
            <DayViewAppointmentCard
              key={app.id}
              appointment={app}
              style={{ top: `${appTop}px`, height: `${appHeight}px` }} // Pass calculated styles
              // Removed onCardClick prop, as DayViewAppointmentCard now handles its own popup
            />
          );
        })}
      </div>

    </div>
  );
};

export default DayViewComponent;