// context/AppointmentContext.js
"use client";
import { createContext, useState } from "react";

export const MyContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [editPatient, setEditPatient] = useState(null);

  const [patients, setPatients] = useState([
    {
      id: "P1001",
      firstName: "Aarav",
      lastName: "Sharma",
      name: "Aarav Sharma",
      phone: "91234 56789",
      email: "aarav@example.com",
      doctor: "Dr. Arjun Mehta",
      datetime: "26 June 2025, 09:00 AM",
      date: "2025-06-26",
      inTime: "09:00",
      outTime: "10:00",
      age: "25",
      gender: "Male",
      reason: "Cleaning",
      note: "First visit",
      title: "Mr.",
      status: "Active",
    },
  ]);

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

  return (
    <MyContext.Provider
      value={{
        editPatient,
        setEditPatient,
        patients,
        setPatients,
        doctors,
        setDoctors,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
