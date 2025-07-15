"use client";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const CustomerInfo = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointment_details, SetAppointment_details] = useState([]);
  const [patient_details, SetPatient_details] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
            intime: patient.intime,
            outtime: patient.outtime,
            countrycode: patient.countrycode,
            contact_no: patient.contact_no,
            email: patient.email,
            status: patient.status,
            appointmentcount: patient.appointmentcount,
            choose_doctor: patient.choose_doctor,
            reason_appointment: patient.reason_appointment,
            note: patient.note,
            chief_complaint: patient.chief_complaint,
            created_at: patient.created_at,
            updated_at: patient.updated_at,
            branch: patient.branch,
            appo_doc_id: patient.appo_doc_id,
            age: patient.age,
            gender: patient.gender,
            old_patient: patient.old_patient,
          };
        });

        SetAppointment_details(transformedData[0]); // ✅ FIXED: Store array, not just first item
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

        const transformedData = data.patientinformations.map((patient) => {
          return {
            id: patient.id,
            created_at: patient.created_at,
            updated_at: patient.updated_at,
            appointment_type: patient.appointment_type,
            appointmentsub_type: patient.appointmentsub_type,
            title: patient.title,
            first_name: patient.first_name,
            second_name: patient.second_name,
            dateofbirth: patient.dateofbirth,
            age: patient.age,
            gender: patient.gender,
            nationality: patient.nationality,
            country_pin: patient.country_pin,
            contact: patient.contact,
            mail: patient.mail,
            occupation: patient.contact,
            marriage_status: patient.marriage_status,
            lo_doorno: patient.lo_doorno,
            lo_street: patient.lo_street,
            lo_location: patient.lo_location,
            lo_csc: patient.lo_csc,
            lo_pincode: patient.lo_pincode,
            switch: patient.switch,
            per_doorno: patient.per_doorno,
            per_street: patient.per_street,
            per_location: patient.per_location,
            per_csc: patient.per_csc,
            per_pincode: patient.per_pincode,
            branch: patient.branch,
            branch_name: patient.branch,
            appo_id: patient.appo_id,
            medinfo: patient.medinfo,
          };
        });

        SetPatient_details(transformedData[0]); // ✅ FIXED: Store array, not just first item
        setError(null);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
        setError(err.message);
        SetPatient_details([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        patient_details,
        appointment_details,
        loading,
        error,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
