import React from "react";
import "./CalendarHeader.css";
import Image from "next/image";
import CalendarImg from "@/public/images/calendar.png";

// Accept new props for current period display, view control, and generic navigation
const CalendarHeader = ({
  currentPeriodDisplay, // Renamed from currentMonthYear for flexibility
  currentView,         // 'month', 'week', or 'day'
  onViewChange,        // Function to set the current view
  onPrev,              // Generic previous handler (adapts in Page.js)
  onNext,              // Generic next handler (adapts in Page.js)
}) => {
  return (
    <div className="calendar-header-container">
      <div className="calendar-left-section">
        <div className="calendar-date-nav-wrapper">
          <span className="calendar-date-icon">
            <Image
              className="d-flex"
              src={CalendarImg}
              alt="CalendarImg"
              width={20}
              height={20}
            />
          </span>
          {/* This span now displays the dynamic period/date from props */}
          <span className="calendar-date-text">{currentPeriodDisplay}</span>
          <button
            className="calendar-nav-button left-arrow"
            onClick={onPrev} // Use generic previous handler
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="calendar-nav-button right-arrow"
            onClick={onNext} // Use generic next handler
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="calendar-right-section">
        <div className="month-select-wrapper">
          <select
            className="month-select"
            value={currentView} // Make select a controlled component
            onChange={(e) => onViewChange(e.target.value)} // Update view state in parent
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <span className="select-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
        <button className="add-appointment-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Appointment
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;