"use client";
import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import './CalendarGrid.css';

const CalendarGrid = ({ patients, currentWeekStart, displayedDates, onTimeSlotClick }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarStartHour = 0;
  const timeSlots = Array.from({ length: 24 }, (_, i) => calendarStartHour + i);
  const pixelsPerHour = 200;

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

  const getAppointmentsForDay = (targetDate) => {
    return patients.filter(
      (app) =>
        app.startTime &&
        app.startTime.getDate() === targetDate.getDate() &&
        app.startTime.getMonth() === targetDate.getMonth() &&
        app.startTime.getFullYear() === targetDate.getFullYear()
    );
  };

  const calculateCurrentTimeIndicatorPosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour >= calendarStartHour && currentHour < calendarStartHour + timeSlots.length) {
      const hoursFromStart = currentHour - calendarStartHour;
      return (hoursFromStart * pixelsPerHour) + (currentMinute / 60) * pixelsPerHour;
    }
    return -1;
  };

  const currentTimeTop = calculateCurrentTimeIndicatorPosition();

  const isTodayDisplayed = displayedDates.includes(currentTime.getDate()) &&
    currentWeekStart.getMonth() === currentTime.getMonth() &&
    currentWeekStart.getFullYear() === currentTime.getFullYear();

  const handleTimeSlotClick = (fullDate, hour) => {
    if (onTimeSlotClick) {
      const clickedDateTime = new Date(
        fullDate.getFullYear(),
        fullDate.getMonth(),
        fullDate.getDate(),
        hour,
        0
      );
      onTimeSlotClick(clickedDateTime);
    }
  };

  return (
    <div className="calendar-grid-container">
      {/* Time Labels */}
      <div className="time-column">
        <div className="time-header-label">IST</div>
        {timeSlots.map((hour) => (
          <div key={hour} className="time-slot-label">
            {formatTime(hour)}
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="grid-body">
        {/* Day Headers */}
        <div className="day-headers">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`day-header-cell ${
                displayedDates[index] === currentTime.getDate() && isTodayDisplayed
                  ? 'day-header-today'
                  : ''
              }`}
            >
              <span className="day-header-name">{day}</span>
              <span className="day-header-date">{displayedDates[index]}</span>
            </div>
          ))}
        </div>

        {/* Time Slots Grid */}
        <div className="appointment-slots-grid">
          {displayedDates.map((_, index) => {
            const fullDate = new Date(currentWeekStart);
            fullDate.setDate(currentWeekStart.getDate() + index);
            const isToday =
              fullDate.getDate() === currentTime.getDate() &&
              fullDate.getMonth() === currentTime.getMonth() &&
              fullDate.getFullYear() === currentTime.getFullYear();

            return (
              <div key={index} className="day-slot-column">
                {/* Hour Slots */}
                {timeSlots.map((hour) => (
                  <div
                    key={`${fullDate.toISOString()}-${hour}`}
                    className="hour-cell-background"
                    onClick={() => handleTimeSlotClick(fullDate, hour)}
                  ></div>
                ))}

                {/* Current Time Indicator */}
                {isToday && currentTimeTop !== -1 && (
                  <div
                    className="current-time-indicator"
                    style={{ top: `${currentTimeTop}px` }}
                  >
                    <div className="current-time-label">
                      {currentTime.getHours().toString().padStart(2, '0')}:
                      {currentTime.getMinutes().toString().padStart(2, '0')}
                    </div>
                  </div>
                )}

                {/* Appointments */}
                {getAppointmentsForDay(fullDate).map((patient) => (
                  <AppointmentCard
                    key={patient.id}
                    patients={patient}
                    calendarStartHour={calendarStartHour}
                    pixelsPerHour={pixelsPerHour}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
