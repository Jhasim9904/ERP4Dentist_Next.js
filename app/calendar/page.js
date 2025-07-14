// app/calendar/page.js
"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import MonthlyCalendar from "@/components/Calendar/Month/MonthlyCalendar";
import DayViewComponent from "@/components/Calendar/Day/DayViewComponent";
import AppModel from '@/components/Appointments/Appmodel';
import Swal from 'sweetalert2';
import { useContext } from "react";
import { MyContext } from "@/context/SetContext";
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

const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

const getDatesForWeek = (startOfWeek) => {
  const dates = [];
  const fullDateObjects = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date.getDate());
    fullDateObjects.push(date);
  }
  return { dates, fullDateObjects };
};

const Page = () => {
  const { patients, setPatients, setEditPatient } = useContext(MyContext);
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
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
  });
  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("https://testing.erp4dentist.com/api/appointment");
      const appointments = res.data?.appointment?.data || [];
      setPatients(appointments);
      return appointments;
    } catch (err) {
      console.error("Error fetching appointments", err);
      return [];
    }
  };

  const currentWeekStart = useMemo(() => getStartOfWeek(currentDisplayDate), [currentDisplayDate]);
  const { dates: displayedDates, fullDateObjects: displayedFullDates } = useMemo(() => getDatesForWeek(currentWeekStart), [currentWeekStart]);

  const getHeaderDisplay = () => {
    switch (currentView) {
      case 'month':
        return currentDisplayDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      case 'week': {
        const start = currentWeekStart.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        const end = new Date(currentWeekStart);
        end.setDate(currentWeekStart.getDate() + 6);

        const startYear = currentWeekStart.getFullYear();
        const endYear = end.getFullYear();

        if (startYear !== endYear) {
          return `${currentWeekStart.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        }
        if (currentWeekStart.getMonth() !== end.getMonth()) {
          return `${currentWeekStart.toLocaleString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, ${currentDisplayDate.getFullYear()}`;
        }
        return `${start} - ${end.toLocaleString('en-US', { day: 'numeric' })}, ${currentDisplayDate.getFullYear()}`;
      }
      case 'day':
        return currentDisplayDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      default:
        return '';
    }
  };

  const handlePrev = () => setCurrentDisplayDate(prev => {
    const newDate = new Date(prev);
    if (currentView === 'month') newDate.setMonth(newDate.getMonth() - 1);
    if (currentView === 'week') newDate.setDate(newDate.getDate() - 7);
    if (currentView === 'day') newDate.setDate(newDate.getDate() - 1);
    return newDate;
  });

  const handleNext = () => setCurrentDisplayDate(prev => {
    const newDate = new Date(prev);
    if (currentView === 'month') newDate.setMonth(newDate.getMonth() + 1);
    if (currentView === 'week') newDate.setDate(newDate.getDate() + 7);
    if (currentView === 'day') newDate.setDate(newDate.getDate() + 1);
    return newDate;
  });

  const formatDateForInput = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const formatTimeForInput = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  const handleTimeSlotClick = (clickedDateTime) => {
    setFormData(prev => ({
      ...prev,
      date: formatDateForInput(clickedDateTime),
      inTime: formatTimeForInput(clickedDateTime),
      outTime: formatTimeForInput(new Date(clickedDateTime.getTime() + 60 * 60 * 1000)),
    }));
    setShowModal(true);
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const finalPayload = {
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
      const res = await axios.get("https://testing.erp4dentist.com/api/appointment");
      const liveAppointments = res.data?.appointment?.data || [];

      const hasClash = liveAppointments.some((appt) => {
        const isSameDate = appt.date_appointment === finalPayload.date_appointment;
        const isSameDoctor = appt.choose_doctor === finalPayload.choose_doctor;
        if (!isSameDate || !isSameDoctor) return false;
        const existingStart = parseTime(appt.intime);
        const existingEnd = parseTime(appt.outtime);
        return newStart < existingEnd && newEnd > existingStart;
      });

      if (hasClash) {
        Swal.fire({ title: "Time Slot Unavailable", text: `Selected time slot is already booked for ${finalPayload.choose_doctor}. Please choose a different time.`, icon: "error" });
        return;
      }

      const postRes = await axios.post("https://testing.erp4dentist.com/api/addappointment", finalPayload, { headers: { "Content-Type": "application/json" } });
      if (postRes.status === 200 || postRes.data?.status === "success") {
        await fetchAppointments();
        Swal.fire("Success", "Appointment added successfully", "success");
        setShowModal(false);
        setFormData({
          date: "", inTime: "", outTime: "", title: "Mr", firstName: "", lastName: "",
          age: "", gender: "male", countryCode: "+91", phone: "", email: "",
          doctor: "", reason: "", chiefComplaint: "", branch: "1", status: "Active", note: ""
        });
        setErrors({});
      } else {
        Swal.fire("Error", postRes.data?.message || "Appointment failed", "error");
      }
    } catch (err) {
      console.error("Add appointment failed:", err);
      Swal.fire("Error", "Failed to add appointment", "error");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="container1">
          <CalendarHeader
            currentPeriodDisplay={getHeaderDisplay()}
            currentView={currentView}
            onViewChange={setCurrentView}
            onPrev={handlePrev}
            onNext={handleNext}
            fetchAppointments={fetchAppointments}
          />
          {currentView === 'month' && <MonthlyCalendar patients={patients} currentDisplayDate={currentDisplayDate} onTimeSlotClick={handleTimeSlotClick} />}
          {currentView === 'week' && <CalendarGrid patients={patients} currentWeekStart={currentWeekStart} displayedDates={displayedDates} displayedFullDates={displayedFullDates} onTimeSlotClick={handleTimeSlotClick} fetchAppointments={fetchAppointments} />}
          {currentView === 'day' && <DayViewComponent patients={patients} currentDisplayDate={currentDisplayDate} onTimeSlotClick={handleTimeSlotClick} />}
        </div>
        <div style={{ marginTop: "200px" }}><Footer /></div>
      </div>
      {showModal && <AppModel formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} onClose={() => setShowModal(false)} errors={errors} />}
    </div>
  );
};

export default Page;
