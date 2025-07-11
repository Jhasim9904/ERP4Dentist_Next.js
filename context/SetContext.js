// context/AppointmentContext.js

// "id": 7,
// "title": "Miss",
// "firstname": "praveen",
// "lastname": "sharma",
// "date_appointment": "2025-03-18",
// "intime": "12:36",
// "outtime": "12:39",
// "countrycode": "+91",
// "contact_no": "8525939833",
// "email": "muthu@bleap.in",
// "status": "1",
// "appointmentcount": "3",
// "choose_doctor": "sabari",
// "reason_appointment": "Checkup",
// "note": "fdas",
// "chief_complaint": "Food impaction",
// "created_at": "2025-03-18T06:06:18.000000Z",
// "updated_at": "2025-04-04T09:01:54.000000Z",
// "branch": 1,
// "appo_doc_id": null,
// "age": "30",
// "gender": "male",
// "old_patient": null,

"use client";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const AppointmentProvider = ({ children }) => {
  // Initialize patients as an empty array, it will be populated from the backend
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store any fetch errors

  // State for editing a patient
  const [editPatient, setEditPatient] = useState(null);

  // Hardcoded doctors data (can also be fetched from backend)
  const [doctors, setDoctors] = useState([
    {
      name: "Dr. Pooja",
      specialization: "Implant Consultant",
      role: "Surgery-Resident",
      phone: "8939719535",
      email: "pooja@bleap.in",
      date: "2025-05-27",
      status: "Active",
      img: "https://via.placeholder.com/50",
      color: "#3a6351",
    },
    {
      name: "Dr. Giri",
      specialization: "Implant Surgery-Resident Doctor",
      role: "",
      phone: "9840110960",
      email: "giri@gmail.com",
      date: "2025-04-16",
      status: "Active",
      img: "https://via.placeholder.com/50/ff6600/ffffff?text=G",
      color: "#ff6600",
    },
    {
      name: "Dr. Sabari",
      specialization: "Endodontics-Visiting Consultant",
      role: "",
      phone: "8525939833",
      email: "sinnamuthu98765@gmail.com",
      date: "2025-03-13",
      status: "Active",
      img: "https://via.placeholder.com/50/ff6600/ffffff?text=S",
      color: "#ff6600",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://testing.erp4dentist.com/api/calendar"
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
        const transformedData = data.appointment.map((patient) => {
            // Combine date_appointment (e.g., "2025-03-18") with inTime (e.g., "12:36")
            const fullStartTimeStr = `${patient.date_appointment}T${patient.intime}:00`; // Ensure seconds are added if not present
            const fullEndTimeStr = `${patient.date_appointment}T${patient.outtime}:00`; // Ensure seconds are added if not present

            // Use Date.parse for potentially better cross-browser compatibility with ISO format
            const startTime = new Date(fullStartTimeStr);
            const endTime = new Date(fullEndTimeStr);

            // Check if parsing resulted in Invalid Date
            if (isNaN(startTime.getTime())) {
                console.warn(`Invalid startTime for patient ID ${patient.id}: ${fullStartTimeStr}`);
                // Handle invalid date, e.g., set to null or a default
            }
            if (isNaN(endTime.getTime())) {
                console.warn(`Invalid endTime for patient ID ${patient.id}: ${fullEndTimeStr}`);
                // Handle invalid date
            }

            return {
                id: patient.id,
                title: patient.title,
                firstName: patient.firstname,
                lastName: patient.lastname,
                patientName: `${patient.firstname} ${patient.lastname}`, // Combine for display
                date: patient.date_appointment, // Keep the original date string
                inTime: patient.intime, // Keep original inTime string if needed elsewhere
                outTime: patient.outtime, // Keep original outTime string if needed elsewhere
                phone: patient.contact_no,
                email: patient.email,
                status: patient.status,
                appointmentcount: patient.appointmentcount,
                doctor: patient.choose_doctor, // Map to 'doctor'
                reason: patient.reason_appointment, // Map to 'reason'
                note: patient.note,
                treatment: patient.chief_complaint, // Map to 'treatment' as per your image/usage
                age: String(patient.age),
                gender: patient.gender,
                created_at: patient.created_at,
                updated_at: patient.updated_at,
                branch: patient.branch,
                appo_doc_id: patient.appo_doc_id,
                old_patient: patient.old_patient,
                // These are the crucial Date objects for sorting and display:
                startTime: startTime,
                endTime: endTime,
            };
        });

        setPatients(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(patients)

  return (
    <MyContext.Provider
      value={{
        editPatient,
        setEditPatient,
        patients,
        setPatients,
        doctors,
        setDoctors,
        loading,
        error,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};