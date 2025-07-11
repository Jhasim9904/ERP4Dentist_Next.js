// app/calendar/page.js
"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import CalendarGrid from "@/components/Calendar/CalendarGrid"; // Weekly view
import MonthlyCalendar from "@/components/Calendar/Month/MonthlyCalendar"; // Monthly view
import DayViewComponent from "@/components/Calendar/Day/DayViewComponent"; // Day view
import AppModel from '@/components/Appointments/Appmodel';
import Swal from 'sweetalert2';
import { useContext } from "react";
import { MyContext } from "@/context/SetContext";

// Helper function to get the start of the week (Sunday) for a given date
const getStartOfWeek = (date) => {
  const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const diff = date.getDate() - day; // Adjust date to Sunday of the current week
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

// Helper function to get all day numbers (and their full Date objects) for a given week (starting Sunday)
const getDatesForWeek = (startOfWeek) => {
  const dates = [];
  const fullDateObjects = []; // To store full Date objects for each day
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date.getDate()); // Day number (e.g., 16, 17, 18...)
    fullDateObjects.push(date); // Full Date object for specific day (e.g., Feb 16 2025)
  }
  return { dates, fullDateObjects }; // Return both
};

const Page = () => {
  const { patients, setPatients, setEditPatient } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/erp-calendar/all_events.php"
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}. Response: ${errorText}`
          );
        }

        const data = await response.json();

        if (data && data.error) {
          throw new Error(`PHP Backend Error: ${data.error}`);
        }

        console.log("Fetched raw data from PHP:", data);

        const transformedData = data.map((event) => ({
          id: event.id,
          patientName: event.patientName,
          treatment: event.treatment,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          firstName: event.firstName || '',
          lastName: event.lastName || '',
          age: event.age || '',
          gender: event.gender || 'Male',
          email: event.email || '',
          phone: event.phone || '',
          doctor: event.doctor || '',
          reason: event.reason || '',
          status: event.status || 'Active',
        }));

        setPatients(transformedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setPatients]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentWeekStart = useMemo(() => getStartOfWeek(currentDisplayDate), [currentDisplayDate]);
  const { dates: displayedDates, fullDateObjects: displayedFullDates } = useMemo(
    () => getDatesForWeek(currentWeekStart),
    [currentWeekStart]
  );

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

  const handlePrev = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      switch (currentView) {
        case 'month':
          newDate.setMonth(newDate.getMonth() - 1);
          break;
        case 'week':
          newDate.setDate(newDate.getDate() - 7);
          break;
        case 'day':
          newDate.setDate(newDate.getDate() - 1);
          break;
        default:
          break;
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      switch (currentView) {
        case 'month':
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        case 'week':
          newDate.setDate(newDate.getDate() + 7);
          break;
        case 'day':
          newDate.setDate(newDate.getDate() + 1);
          break;
        default:
          break;
      }
      return newDate;
    });
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimeForInput = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // This function is passed to CalendarGrid, MonthlyCalendar, and DayViewComponent
  const handleTimeSlotClick = (clickedDateTime) => {
    const initialDate = formatDateForInput(clickedDateTime);
    const initialInTime = formatTimeForInput(clickedDateTime);

    const outDateTime = new Date(clickedDateTime.getTime() + 60 * 60 * 1000);
    const initialOutTime = formatTimeForInput(outDateTime);

    setFormData({
      ...formData,
      date: initialDate,
      inTime: initialInTime,
      outTime: initialOutTime,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.inTime) newErrors.inTime = "In time is required";
    if (!formData.outTime) newErrors.outTime = "Out time is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.doctor) newErrors.doctor = "Doctor selection is required";
    if (!formData.reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error!",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#1669f2",
      });
      return;
    }

    const newAppointmentData = {
        date: formData.date,
        inTime: formData.inTime,
        outTime: formData.outTime,
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        doctor: formData.doctor,
        reason: formData.reason,
        note: formData.note,
        status: formData.status,
    };

    try {
        const response = await fetch("http://localhost/erp-calendar/add_event.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointmentData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const result = await response.json();

        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Appointment Booked!",
                text: "The appointment has been successfully added.",
                confirmButtonColor: "#1669f2",
            });
            setShowModal(false);
            setFormData({
                date: "", inTime: "", outTime: "", title: "Mr.", firstName: "", lastName: "", age: "",
                gender: "Male", email: "", phone: "", doctor: "", reason: "", note: "", status: "Active",
            });
            setErrors({});

            const refetchResponse = await fetch("http://localhost/erp-calendar/all_events.php");
            const refetchData = await refetchResponse.json();
            const transformedRefetchData = refetchData.map((event) => ({
                id: event.id,
                patientName: event.patientName,
                treatment: event.treatment,
                startTime: new Date(event.startTime),
                endTime: new Date(event.endTime),
                firstName: event.firstName || '',
                lastName: event.lastName || '',
                age: event.age || '',
                gender: event.gender || 'Male',
                email: event.email || '',
                phone: event.phone || '',
                doctor: event.doctor || '',
                reason: event.reason || '',
                status: event.status || 'Active',
            }));
            setPatients(transformedRefetchData);

        } else {
            throw new Error(result.message || "Failed to add appointment.");
        }
    } catch (err) {
        console.error("Error adding appointment:", err);
        Swal.fire({
            icon: "error",
            title: "Submission Error!",
            text: err.message || "There was an error adding the appointment.",
            confirmButtonColor: "#1669f2",
        });
    }
  };

  if (loading) {
    return (
      <div className="app-layout">
        <p>Loading calendar data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-layout">
        <p>Error loading data: {error.message}</p>
        <p>Please ensure:</p>
        <ul>
          <li>XAMPP Apache and MySQL are running.</li>
          <li>Your PHP files are correctly placed in `htdocs` (e.g., `http://localhost/erp-calendar/`).</li>
          <li>`database.php` has the correct credentials and port.</li>
          <li>`all_events.php` has the CORS headers at the very top and outputs pure JSON.</li>
          <li>Check your browser's console (F12) for more detailed network errors.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="container1">
          <CalendarHeader
            currentPeriodDisplay={getHeaderDisplay()}
            currentView={currentView}
            onViewChange={setCurrentView}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {currentView === 'month' && (
            <MonthlyCalendar
              patients={patients}
              currentDisplayDate={currentDisplayDate}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )}
          {currentView === 'week' && (
            <CalendarGrid
              patients={patients}
              currentWeekStart={currentWeekStart}
              displayedDates={displayedDates}
              displayedFullDates={displayedFullDates}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )}
          {currentView === 'day' && (
            <DayViewComponent
              patients={patients}
              currentDisplayDate={currentDisplayDate}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )}
        </div>
        <div style={{ marginTop: "200px" }}>
          <Footer />
        </div>
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

export default Page;