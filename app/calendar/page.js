"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import CalendarGrid from "@/components/Calendar/CalendarGrid";

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

const Page = () => { // Changed to 'Page' for consistency, ensure it matches your export
  // State to hold the fetched appointments
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state for dynamic calendar: current week's start date
  // Initialize to the Sunday of the week containing Feb 16, 2025
  // You can change new Date(2025, 1, 16) to new Date() to start at the current week
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date(2025, 1, 16)));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/erp-calendar/all_events.php" // Ensure this URL is correct
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
          startTime: new Date(event.startTime), // Convert string to Date object
          endTime: new Date(event.endTime),     // Convert string to Date object
          hasMore: Boolean(parseInt(event.hasMore)),
          hasDot: Boolean(parseInt(event.hasDot)),
        }));

        setAppointments(transformedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (appointments.length > 0) {
      console.log("Appointments state updated:", appointments);
    }
  }, [appointments]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // New calculations derived from currentWeekStart state
  const { dates: displayedDates, fullDateObjects: displayedFullDates } = getDatesForWeek(currentWeekStart);
  const displayedMonthYear = currentWeekStart.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // New functions for calendar navigation
  const goToPreviousWeek = () => {
    setCurrentWeekStart(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
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
          <li>Your PHP files are correctly placed in `htdocs` (e.g., `http://localhost/erp-calendar/erp-calendar/`).</li>
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
        <div className="container1 ">
          {/* CalendarHeader now receives dynamic props */}
          <CalendarHeader
            currentMonthYear={displayedMonthYear}
            onPrevWeek={goToPreviousWeek}
            onNextWeek={goToNextWeek}
          />
          {/* CalendarGrid now receives dynamic props for the week */}
          <CalendarGrid
            appointments={appointments}
            currentWeekStart={currentWeekStart}
            displayedDates={displayedDates}
            displayedFullDates={displayedFullDates} // Pass full date objects for robust filtering
          />
        </div>
        <div style={{ marginTop: "200px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;