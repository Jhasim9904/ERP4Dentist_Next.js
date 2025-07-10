// context/AppointmentContext.js
"use client";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const AppointmentProvider = ({ children }) => {
  // Initialize patients as an empty array, it will be populated from the backend
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);   // State to store any fetch errors

  // State for editing a patient
  const [editPatient, setEditPatient] = useState(null);

  // Hardcoded doctors data (can also be fetched from backend)
  const [doctors, setDoctors] = useState([
    {
      name: 'Dr. Pooja',
      specialization: 'Implant Consultant',
      role: 'Surgery-Resident',
      phone: '8939719535',
      email: 'pooja@bleap.in',
      date: '2025-05-27',
      status: 'Active',
      img: 'https://via.placeholder.com/50',
      color: '#3a6351'
    },
    {
      name: 'Dr. Giri',
      specialization: 'Implant Surgery-Resident Doctor',
      role: '',
      phone: '9840110960',
      email: 'giri@gmail.com',
      date: '2025-04-16',
      status: 'Active',
      img: 'https://via.placeholder.com/50/ff6600/ffffff?text=G',
      color: '#ff6600'
    },
    {
      name: 'Dr. Sabari',
      specialization: 'Endodontics-Visiting Consultant',
      role: '',
      phone: '8525939833',
      email: 'sinnamuthu98765@gmail.com',
      date: '2025-03-13',
      status: 'Active',
      img: 'https://via.placeholder.com/50/ff6600/ffffff?text=S',
      color: '#ff6600'
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading

        // IMPORTANT: Ensure this URL points to your correct PHP file (e.g., getPatients.php)
        const response = await fetch("http://localhost/erp-calendar/all_events.php"); 
        console.log("hi")

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

        console.log("Fetched raw data from PHP:", data); // For debugging

        // Transform data to match frontend expectations, including all fields
        const transformedData = data.map((patient) => ({
          id: patient.id, // This is patient_id from PHP, e.g., "P1001"
          firstName: patient.first_name,
          lastName: patient.last_name,
          name: patient.name, // This is already derived in PHP, or you can derive here: `${patient.first_name} ${patient.last_name}`
          phone: patient.phone,
          email: patient.email,
          doctor: patient.doctor,
          
          // Use the ISO string directly for 'datetime' and create Date objects
          datetime: patient.datetime, // Keep the ISO string for consistent parsing
          startTime: new Date(patient.datetime), // Create Date object for specific use
          
          // For endTime, combine the date part of datetime with the outTime string
          // Ensure outTime is in HH:MM:SS or HH:MM format from PHP
          endTime: new Date(`${patient.appointment_date}T${patient.outTime}:00`), // Create Date object for specific use

          date: patient.appointment_date, // 'date' is directly from DB
          inTime: patient.inTime,         // 'inTime' is directly from DB
          outTime: patient.outTime,       // 'outTime' is directly from DB

          age: String(patient.age),       // Ensure age is string if frontend expects it
          gender: patient.gender,
          reason: patient.reason,
          note: patient.note,
          title: patient.title,
          status: patient.status,         // Assuming this is "Active"/"Completed" string from PHP
          color: patient.color,           // Include color
          patientName: patient.patientName, // From old column
          treatment: patient.treatment,     // From old column
          hasMore: false, // Defaulting as no DB column for it
          hasDot: false,  // Defaulting as no DB column for it
          
          // If you *still* need hasMore/hasDot for your UI, and they aren't in the DB:

          // If you need the old patientName and treatment directly for some reason (less ideal for new schema):
        }));

        setPatients(transformedData);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message); // Set the error message
        setPatients([]); // Clear patients on error
      } finally {
        setLoading(false); // End loading, regardless of success or failure
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, []); // Empty dependency array means it runs once on mount

  // Log patients state after it's been updated
  console.log("Patients state:", patients);

  return (
    <MyContext.Provider
      value={{
        editPatient,
        setEditPatient,
        patients,
        setPatients,
        doctors,
        setDoctors,
        loading, // Expose loading state
        error,   // Expose error state
      }}
    >
      {children}
    </MyContext.Provider>
  );
};