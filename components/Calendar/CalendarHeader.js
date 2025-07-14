import React, { useState } from "react";
import "./CalendarHeader.css";
import Image from "next/image";
import CalendarImg from "@/public/images/calendar.png";
import AppModel from "../Appointments/Appmodel";
import { useContext } from "react";
import { MyContext } from "@/context/SetContext";
import Swal from "sweetalert2";

// Accept new props for current period display, view control, and generic navigation
const CalendarHeader = ({
  currentPeriodDisplay, // Renamed from currentMonthYear for flexibility
  currentView, // 'month', 'week', or 'day'
  onViewChange, // Function to set the current view
  onPrev, // Generic previous handler (adapts in Page.js)
  onNext, // Generic next handler (adapts in Page.js)
}) => {
  const { patients, setPatients, setEditPatient } = useContext(MyContext);
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [formData, setFormData] = useState({
    date: "",
    inTime: "",
    outTime: "",
    title: "Mr.",
    firstName: "",
    lastName: "",
    age: "",
    gender: "Male",
    email: "",
    phone: "",
    doctor: "",
    reason: "",
    note: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    // const newErrors = {};
    // if (!formData.date) newErrors.date = "Date is required";
    // if (!formData.inTime) newErrors.inTime = "In time is required";
    // if (!formData.outTime) newErrors.outTime = "Out time is required";
    // if (!formData.firstName) newErrors.firstName = "First name is required";
    // if (!formData.lastName) newErrors.lastName = "Last name is required";
    // if (!formData.age) newErrors.age = "Age is required";
    // if (!formData.email) newErrors.email = "Email is required";
    // if (!formData.phone) newErrors.phone = "Phone number is required";
    // if (!formData.doctor) newErrors.doctor = "Doctor selection is required";
    // if (!formData.reason) newErrors.reason = "Reason is required";

    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newPatient = {
      ...formData,
      id: `P${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${formData.firstName} ${formData.lastName}`,
      datetime: `${formData.date}, ${formData.inTime}`,
      startTime: new Date(`${formData.date}T${formData.inTime}`), 
    };

    setPatients([...patients, newPatient]);
    setShowModal(false);
    setFormData({
      date: "",
      inTime: "",
      outTime: "",
      title: "Mr.",
      firstName: "",
      lastName: "",
      age: "",
      gender: "Male",
      email: "",
      phone: "",
      doctor: "",
      reason: "",
      note: "",
      status: "Active",
    });
    setErrors({});

    Swal.fire({
      icon: "success",
      title: "Appointment Booked!",
      text: "The appointment has been successfully added.",
      confirmButtonColor: "#1669f2",
    });
  };
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
        <button
          className="add-appointment-btn"
          onClick={() => setShowModal(true)}
        >
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
      {showModal && (
        <AppModel
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          errors={errors}
        />
      )}
    </div>
  );
};

export default CalendarHeader;
