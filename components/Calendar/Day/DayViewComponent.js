import React, { useState, useEffect } from 'react';
import AppointmentCard from '../AppointmentCard'; // Ensure this path is correct
import './DayViewComponent.css'; // New CSS file for this component

const DayViewComponent = ({ appointments, currentDisplayDate }) => {
  const calendarStartHour = 10; // Day view starts at 10 AM
  const timeSlots = Array.from({ length: 10 }, (_, i) => calendarStartHour + i); // 10 AM to 7 PM

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute for the indicator (optional for day view)
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

  const getAppointmentsForHour = (hour) => {
    const targetYear = currentDisplayDate.getFullYear();
    const targetMonth = currentDisplayDate.getMonth();
    const targetDay = currentDisplayDate.getDate();

    return appointments.filter(app => {
      const appStartHour = app.startTime.getHours();
      // Appointments starting within this specific hour slot for the current day
      return app.startTime.getFullYear() === targetYear &&
             app.startTime.getMonth() === targetMonth &&
             app.startTime.getDate() === targetDay &&
             appStartHour >= hour && appStartHour < (hour + 1);
    });
  };

  const calculateCurrentTimeIndicatorPosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Check if the current day is the one being displayed
    const isTodayDisplayed =
      currentDisplayDate.getDate() === currentTime.getDate() &&
      currentDisplayDate.getMonth() === currentTime.getMonth() &&
      currentDisplayDate.getFullYear() === currentTime.getFullYear();

    if (isTodayDisplayed && currentHour >= calendarStartHour && currentHour <= timeSlots[timeSlots.length - 1]) {
      const hoursFromStart = currentHour - calendarStartHour;
      const pixelsPerHour = 100; // This should match .day-view-hour-slot height in CSS
      const topPosition = (hoursFromStart * pixelsPerHour) + (currentMinute / 60) * pixelsPerHour;
      return topPosition;
    }
    return -1; // Indicate not visible
  };

  const currentTimeTop = calculateCurrentTimeIndicatorPosition();


  return (
    <div className="day-view-container">
      <div className="day-view-time-column">
        <div className="day-view-time-header-label">Time</div>
        {timeSlots.map(hour => (
          <div key={hour} className="day-view-time-slot-label">
            {formatTime(hour)}
          </div>
        ))}
      </div>
      <div className="day-view-appointments-column">
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

        {/* Hour Slots with Appointments */}
        {timeSlots.map(hour => (
          <div key={hour} className="day-view-hour-slot">
            {getAppointmentsForHour(hour).map(app => (
              <AppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayViewComponent;