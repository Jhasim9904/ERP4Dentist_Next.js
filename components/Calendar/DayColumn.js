import React from 'react';
import './DayColumn.css'; // Import plain CSS file

const DayColumn = ({ day, date, isToday }) => {
  return (
    <div
      className={`day-column ${isToday ? 'day-column-today' : ''}`}
    >
      <span className="day-name">{day}</span>
      <span className="day-date">{date}</span>
    </div>
  );
};

export default DayColumn;