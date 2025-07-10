import React from 'react';
import MonthlyAppointmentCard from './MonthlyAppointmentCard'; // Ensure this path is correct
import './MonthlyCalendar.css'; // This CSS will be used with new class names

const MonthlyCalendar = ({ patients, currentDisplayDate }) => {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Helper function to get the number of days in the month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Helper function to get the number of days in the previous month
  const getDaysInPrevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };

  // Helper function to get appointments for a specific day
  const getAppointmentsForDay = (year, month, day) => {
    return patients.filter(app => {
      return app.startTime.getFullYear() === year &&
             app.startTime.getMonth() === month && // month is 0-indexed
             app.startTime.getDate() === day;
    });
  };

  // Function to render the days of the calendar grid
  const renderDays = () => {
    const year = currentDisplayDate.getFullYear();
    const month = currentDisplayDate.getMonth(); // 0-indexed

    const firstDay = getFirstDayOfMonth(currentDisplayDate); // Day of week (0-6) for the 1st of the month
    const daysInMonth = getDaysInMonth(currentDisplayDate);
    const daysInPrevMonth = getDaysInPrevMonth(currentDisplayDate);

    const days = []; // Array to hold all day cells

    // Fill in days from the previous month (leading empty cells)
    const prevMonthStartDate = daysInPrevMonth - firstDay + 1;
    for (let i = 0; i < firstDay; i++) {
      const dayNumber = prevMonthStartDate + i;
      const prevMonthDate = new Date(year, month - 1, dayNumber);
      const dayAppointments = getAppointmentsForDay(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), prevMonthDate.getDate());
      days.push(
        <div key={`prev-${dayNumber}`} className="monthly-day-cell prev-month">
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
    const today = new Date(); // Real-world today's date for highlighting
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const dayAppointments = getAppointmentsForDay(year, month, i);

      days.push(
        <div
          key={`current-${i}`}
          className={`monthly-day-cell current-month ${isCurrentDay ? 'today' : ''}`}
        >
          <span className="monthly-day-cell-number">{i}</span>
          <div className="monthly-day-appointments-container">
            {dayAppointments.map(app => (
              <MonthlyAppointmentCard key={app.id} patients={app} />
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
      days.push(
        <div key={`next-${i}`} className="monthly-day-cell next-month">
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
  }; // This closing brace correctly belongs to the renderDays function.

  // This is the main return for the MonthlyCalendar component.
  return (
    <div className="monthly-calendar-wrapper">
      <div className="monthly-view-grid-body">
        {/* Day Headers (Sun, Mon, Tue...) - This section creates the top row of weekday names */}
        <div className="monthly-view-day-headers">
          {daysOfWeek.map((day) => (
            <div key={day} className="monthly-view-day-header-cell">
              <span className="monthly-view-day-header-name">{day}</span>
            </div>
          ))}
        </div>

        {/* The actual month grid with day cells */}
        <div className="monthly-appointment-slots-grid">
            {renderDays()}
        </div>
      </div>
    </div>
  );
}; // This closing brace correctly belongs to the MonthlyCalendar component.

export default MonthlyCalendar;