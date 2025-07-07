import React from "react";
import "./CalendarHeader.css";
import Image from "next/image";
import CalendarImg from "@/public/images/calendar.png";

// Accept props for current month/year and navigation functions
const CalendarHeader = ({ currentMonthYear, onPrevWeek, onNextWeek }) => {
  return (
    <div className="calendar-header-container">
      <div className="calendar-left-section">
        <div className="calendar-date-nav-wrapper">
          <span className="calendar-date-icon">
            {/* Calendar icon (Feather Icons style) */}
            <Image
              className="d-flex"
              src={CalendarImg}
              alt="CalendarImg"
              width={20}
              height={20}
            />
          </span>
          {/* This span now displays the dynamic month/year from props */}
          <span className="calendar-date-text">{currentMonthYear}</span>
          <button
            className="calendar-nav-button left-arrow"
            onClick={onPrevWeek}
          >
            {/* Left arrow icon - onClick handler added */}
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
            onClick={onNextWeek}
          >
            {/* Right arrow icon - onClick handler added */}
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
          <select className="month-select">
            <option>Month</option>
            <option>Week</option>
            <option>Day</option>
            {/* You could also dynamically populate these options later */}
          </select>
          <span className="select-arrow">
            {/* Custom dropdown arrow */}
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
          {/* Plus icon */}
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
