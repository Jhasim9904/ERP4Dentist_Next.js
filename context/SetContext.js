// context/AppointmentContext.js

"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyContext = createContext();

export const AppointmentProvider = ({ children }) => {
  // Initialize patients as an empty array, it will be populated from the backend
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status for initial fetches
  const [error, setError] = useState(null); // State to store any fetch errors

  // State for editing a patient
  const [editPatient, setEditPatient] = useState(null);
  const [editDoctors, setEditDoctors] = useState(null);

  const [appointment_details, SetAppointment_details] = useState([]);

  // Doctors data state
  const [doctors, setDoctors] = useState([]);

  // State for loading/errors specifically for adding a doctor
  const [addingDocLoading, setAddingDocLoading] = useState(false);
  const [addingDocError, setAddingDocError] = useState(null);

  // Doctor GET API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set main loading for initial fetches
        const response = await fetch(
          "https://testing.erp4dentist.com/api/doctors"
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
        const transformedData = data.doctor.data.map((doctor) => {
          return {
            doc_id: doctor.doc_id,
            doc_name: doctor.doc_name,
            doc_type: doctor.doc_type,
            doc_speciality: doctor.doc_speciality,
            phone_prefix: doctor.phone_prefix,
            doc_mobile: doctor.doc_mobile,
            doc_email: doctor.doc_email,
            image: doctor.image,
            doc_cal_color: doctor.doc_cal_color,
            doc_join_date: doctor.doc_join_date,
            doc_termination_date: doctor.doc_termination_date,
            is_email_active: doctor.is_email_active,
            doc_status: doctor.doc_status,
            doc_branch: doctor.doc_branch,
            note: doctor.note,
            signature: doctor.signature,
            // Assuming your backend sends 'color' field for the doctor card border
            color: doctor.doc_cal_color, // Use doc_cal_color for the card border
          };
        });
        setDoctors(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors data:", err);
        setError(err.message);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Calendar GET API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set main loading for initial fetches

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
          const fullStartTimeStr = `${patient.date_appointment}T${patient.intime}:00`;
          const fullEndTimeStr = `${patient.date_appointment}T${patient.outtime}:00`;

          const startTime = new Date(fullStartTimeStr);
          const endTime = new Date(fullEndTimeStr);

          if (isNaN(startTime.getTime())) {
            console.warn(
              `Invalid startTime for patient ID ${patient.id}: ${fullStartTimeStr}`
            );
          }
          if (isNaN(endTime.getTime())) {
            console.warn(
              `Invalid endTime for patient ID ${patient.id}: ${fullEndTimeStr}`
            );
          }

          return {
            id: patient.id,
            title: patient.title,
            firstName: patient.firstname,
            lastName: patient.lastname,
            patientName: `${patient.firstname} ${patient.lastname}`,
            date: patient.date_appointment,
            inTime: patient.intime,
            outTime: patient.outtime,
            phone: patient.contact_no,
            email: patient.email,
            status: patient.status,
            appointmentcount: patient.appointmentcount,
            doctor: patient.choose_doctor,
            reason: patient.reason_appointment,
            note: patient.note,
            treatment: patient.chief_complaint,
            age: String(patient.age),
            gender: patient.gender,
            created_at: patient.created_at,
            updated_at: patient.updated_at,
            branch: patient.branch,
            appo_doc_id: patient.appo_doc_id,
            old_patient: patient.old_patient,
            startTime: startTime,
            endTime: endTime,
          };
        });

        setPatients(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
        setError(err.message);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set main loading for initial fetches

        const response = await fetch(
          "https://testing.erp4dentist.com/api/patientinfo/MTE="
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
        const transformedData = data.appointment_details.map((patient) => {
          const fullStartTimeStr = `${patient.date_appointment}T${patient.intime}:00`;
          const fullEndTimeStr = `${patient.date_appointment}T${patient.outtime}:00`;

          const startTime = new Date(fullStartTimeStr);
          const endTime = new Date(fullEndTimeStr);

          if (isNaN(startTime.getTime())) {
            console.warn(
              `Invalid startTime for patient ID ${patient.id}: ${fullStartTimeStr}`
            );
          }
          if (isNaN(endTime.getTime())) {
            console.warn(
              `Invalid endTime for patient ID ${patient.id}: ${fullEndTimeStr}`
            );
          }

          return {
            id: patient.id,
            title: patient.title,
            firstname: patient.firstname,
            lastname: patient.lastname,
            date_appointment: patient.date_appointment,
            intime: "11:02",
            outtime: "12:03",
            countrycode: "+91",
            contact_no: "8237108278",
            email: "chokidhani@gmail.com",
            status: "1",
            appointmentcount: "6",
            choose_doctor: "sabari",
            reason_appointment: "Checkup",
            note: null,
            chief_complaint: "Discolored teeth",
            created_at: "2025-04-17T05:33:49.000000Z",
            updated_at: "2025-04-17T05:33:49.000000Z",
            branch: 1,
            appo_doc_id: "1",
            age: "30",
            gender: "male",
            old_patient: null,
          };
        });
        SetAppointment_details(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
        setError(err.message);
        SetAppointment_details([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Doctor POST/PUT API (This function will be provided via context)
  // It's a regular async function, NOT a useEffect.
  const AddDoctorApi = async (jsonData) => {
    // Changed formData to jsonData
    console.log(jsonData);
    try {
      setAddingDocLoading(true);
      setAddingDocError(null); // Clear previous errors

      const url = "https://testing.erp4dentist.com/api/doctor/store"; // Add URL

      const response = await axios.post(url, jsonData, {
        // Send JSON directly
        headers: {
          "Content-Type": "application/json", // Set content type to application/json
        },
      });

      console.log("AddDoctorApi Response:", response.data);

      if (response.data && response.data.errors) {
        setAddingDocError(
          response.data.message || "Validation failed on server."
        );
        throw response.data.errors; // Re-throw specific validation errors as an object
      } else if (response.data && response.data.status === false) {
        setAddingDocError(
          response.data.message || "An error occurred on the server."
        );
        throw new Error(response.data.message || "An error occurred.");
      } else {
        // Success case: Add the new doctor to the list
        const newDoctor = response.data.doctor || response.data.data; // Adjust based on actual API response structure

        // Append to the existing list
        setDoctors((prevDoctors) => [
          ...prevDoctors,
          {
            doc_id: newDoctor.doc_id,
            doc_name: newDoctor.doc_name,
            doc_type: newDoctor.doc_type,
            doc_speciality: newDoctor.doc_speciality,
            phone_prefix: newDoctor.phone_prefix,
            doc_mobile: newDoctor.doc_mobile,
            doc_email: newDoctor.doc_email,
            image: newDoctor.image, // This will be the URL from the backend if it stores images
            doc_cal_color: newDoctor.doc_cal_color,
            doc_join_date: newDoctor.doc_join_date,
            doc_termination_date: newDoctor.doc_termination_date,
            is_email_active: newDoctor.is_email_active,
            doc_status: newDoctor.doc_status,
            doc_branch: newDoctor.doc_branch,
            note: newDoctor.note,
            signature: newDoctor.signature, // This will be the URL from the backend if it stores signatures
            color: newDoctor.doc_cal_color,
          },
        ]);
        return response.data; // Return success data
      }
    } catch (err) {
      console.error("Error adding doctor via API:", err);
      if (axios.isAxiosError(err) && err.response) {
        setAddingDocError(
          err.response.data.message || "Server error occurred."
        );
        if (err.response.data.errors) {
          throw err.response.data.errors; // Re-throw specific validation errors
        }
      } else if (err instanceof Error) {
        setAddingDocError(err.message);
      } else {
        setAddingDocError("Validation errors occurred.");
        throw err;
      }
    } finally {
      setAddingDocLoading(false);
    }
  };

  return (
    <MyContext.Provider
      value={{
        editPatient,
        setEditPatient,
        patients,
        setPatients,
        doctors,
        setDoctors,
        editDoctors,
        setEditDoctors,
        loading, // Initial fetch loading
        error, // Initial fetch error
        AddDoctorApi, // Provide the API function via context
        addingDocLoading, // Loading state for AddDoctorApi
        addingDocError, // Error state for AddDoctorApi
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
