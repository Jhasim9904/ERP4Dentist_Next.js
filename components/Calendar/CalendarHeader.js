"use client";
import React, { useState } from "react";
import "./CalendarHeader.css";
import Image from "next/image";
import CalendarImg from "@/public/images/calendar.png";
import AppModel from "../Appointments/Appmodel";
import { useContext } from "react";
import { MyContext } from "@/context/SetContext";
import Swal from "sweetalert2";
import axios from "axios";

const normalizeDoctor = (name) => name?.replace(/\s+/g, "").toLowerCase();

const doctorIdMap = {
  "dr.saritha": 1,
  "dr.a": 2,
  gandhi: 3,
  pooja: 4,
  giri: 6,
  sabari: 7,
};

const initialFormData = {
  date: "",
  inTime: "",
  outTime: "",
  title: "Mr",
  firstName: "",
  lastName: "",
  age: "",
  gender: "male",
  countryCode: "+91",
  phone: "",
  email: "",
  doctor: "",
  reason: "",
  chiefComplaint: "",
  branch: "1",
  status: "Active",
  note: "",
};

const CalendarHeader = ({
  currentPeriodDisplay,
  currentView,
  onViewChange,
  onPrev,
  onNext,
  fetchAppointments,
}) => {
  const { setPatients, setEditPatient } = useContext(MyContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (payloadFromModal) => {
    setLoading(true);
    const finalPayload = payloadFromModal || {
      title: formData.title,
      firstname: formData.firstName,
      lastname: formData.lastName,
      age: Number(formData.age),
      gender: formData.gender,
      countrycode: formData.countryCode,
      contact_no: formData.phone,
      email: formData.email,
      choose_doctor: formData.doctor,
      appo_doc_id: doctorIdMap[normalizeDoctor(formData.doctor)] || 6,
      reason_appointment: formData.reason,
      chief_complaint: formData.chiefComplaint || "",
      status: formData.status === "Active" ? 1 : 0,
      date_appointment: formData.date,
      intime: formData.inTime,
      outtime: formData.outTime,
      note: formData.note,
      branch: parseInt(formData.branch),
    };

    const parseTime = (t) => new Date(`1970-01-01T${t}:00`);
    const newStart = parseTime(finalPayload.intime);
    const newEnd = parseTime(finalPayload.outtime);

    try {
      const res = await axios.get(
        "https://testing.erp4dentist.com/api/appointment"
      );
      const liveAppointments = res.data?.appointment?.data || [];

      const hasClash = liveAppointments.some((appt) => {
        const isSameDate =
          appt.date_appointment === finalPayload.date_appointment;
        const isSameDoctor = appt.choose_doctor === finalPayload.choose_doctor;

        if (!isSameDate || !isSameDoctor) return false;

        const existingStart = parseTime(appt.intime);
        const existingEnd = parseTime(appt.outtime);

        return newStart < existingEnd && newEnd > existingStart;
      });

      if (hasClash) {
        Swal.fire({
          title: "Time Slot Unavailable",
          text: `Selected time slot is already booked for ${finalPayload.choose_doctor}. Please choose a different time.`,
          icon: "error",
        });
        return;
      }

      const postRes = await axios.post(
        "https://testing.erp4dentist.com/api/addappointment",
        finalPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (postRes.status === 200 || postRes.data?.status === "success") {
        await fetchAppointments();
        Swal.fire("Success", "Appointment added successfully", "success");
        setShowModal(false);
        setFormData({ ...initialFormData });
        setErrors({});
      } else {
        Swal.fire(
          "Error",
          postRes.data?.message || "Appointment failed",
          "error"
        );
      }
    } catch (err) {
      console.error("Add appointment failed:", err);
      Swal.fire("Error", "Failed to add appointment", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calendar-header-container">
      <div className="calendar-left-section">
        <div className="calendar-date-nav-wrapper">
          <span className="calendar-date-icon">
            <Image src={CalendarImg} alt="CalendarImg" width={20} height={20} />
          </span>
          <span className="calendar-date-text">{currentPeriodDisplay}</span>
          <button className="calendar-nav-button left-arrow" onClick={onPrev}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="calendar-nav-button right-arrow" onClick={onNext}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            value={currentView}
            onChange={(e) => onViewChange(e.target.value)}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <span className="select-arrow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          isBooking={loading}
        />
      )}
    </div>
  );
};

export default CalendarHeader;
