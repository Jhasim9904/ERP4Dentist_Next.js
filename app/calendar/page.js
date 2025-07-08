"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import CalendarGrid from "@/components/Calendar/CalendarGrid"; // Weekly view
import MonthlyCalendar from "@/components/Calendar/Month/MonthlyCalendar"; // Monthly view
import DayViewComponent from "@/components/Calendar/Day/DayViewComponent"; // Day view

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
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Primary date state, will be used for all views (month, week, day)
  // Initialize to a specific date for consistent testing, or new Date() for current date
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()); // Defaults to today

  // New state to manage the current calendar view: 'month', 'week', 'day'
  const [currentView, setCurrentView] = useState('month'); // Start with month view

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
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // --- Calendar Navigation Logic based on currentView ---

  // Memoized derived state for week view based on currentDisplayDate
  const currentWeekStart = useMemo(() => getStartOfWeek(currentDisplayDate), [currentDisplayDate]);
  const { dates: displayedDates, fullDateObjects: displayedFullDates } = useMemo(
    () => getDatesForWeek(currentWeekStart),
    [currentWeekStart]
  );

  // Function to get the display string for the header based on currentView
  const getHeaderDisplay = () => {
    switch (currentView) {
      case 'month':
        return currentDisplayDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      case 'week': {
        const start = currentWeekStart.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        const end = new Date(currentWeekStart);
        end.setDate(currentWeekStart.getDate() + 6); // End of the week

        const startYear = currentWeekStart.getFullYear();
        const endYear = end.getFullYear();

        // Format for week range, handling year and month transitions
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

  // Generic navigation handlers (prev/next) that adapt to the current view
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
            currentPeriodDisplay={getHeaderDisplay()} // Display string based on current view
            currentView={currentView} // Pass current view type ('month', 'week', 'day')
            onViewChange={setCurrentView} // Function to update the current view
            onPrev={handlePrev} // Generic previous handler
            onNext={handleNext} // Generic next handler
          />

          {currentView === 'month' && (
            <MonthlyCalendar
              appointments={appointments}
              currentDisplayDate={currentDisplayDate}
            />
          )}
          {currentView === 'week' && (
            <CalendarGrid
              appointments={appointments}
              currentWeekStart={currentWeekStart}
              displayedDates={displayedDates}
              displayedFullDates={displayedFullDates} // Pass full date objects for robustness
            />
          )}
          {currentView === 'day' && (
            <DayViewComponent
              appointments={appointments}
              currentDisplayDate={currentDisplayDate}
            />
          )}
        </div>
        <div style={{ marginTop: "200px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;