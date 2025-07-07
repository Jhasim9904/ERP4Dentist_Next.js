"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AppModel from "@/components/Appointments/Appmodel";
import headingbtnlogo from "@/components/images/headingbtnlogo.png";
import Delete from "@/components/Appointments/images/Delete.png";
import Edit from "@/components/Appointments/images/Edit.png";
import Eyes from "@/components/Appointments/images/Eyes.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import "./Appointments.css";
import { useContext } from "react";
import { MyContext } from "@/context/SetContext";


const Appointments = () => {
  const router = useRouter();
const { patients, setPatients, setEditPatient } = useContext(MyContext);



  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the appointment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPatients(patients.filter((p) => p.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The appointment has been deleted.",
          confirmButtonColor: "#1669f2",
        });
      }
    });
  };

  // ✅ Update patient on return from updateapt
  useEffect(() => {
    try {
      const updated = localStorage.getItem("updatedPatient");
      if (updated) {
        const updatedPatient = JSON.parse(updated);
        if (updatedPatient?.id) {
          setPatients((prev) =>
            prev.map((p) =>
              p.id === updatedPatient.id
                ? {
                    ...updatedPatient,
                    name: `${updatedPatient.firstName} ${updatedPatient.lastName}`,
                    datetime: `${updatedPatient.date}, ${updatedPatient.inTime}`,
                  }
                : p
            )
          );
        }
        localStorage.removeItem("updatedPatient");
      }
    } catch (err) {
      console.error("Error parsing updatedPatient from localStorage:", err);
    }
  }, []);

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

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newPatient = {
      ...formData,
      id: `P${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${formData.firstName} ${formData.lastName}`,
      datetime: `${formData.date}, ${formData.inTime}`,
    };

    setPatients([...patients, newPatient]);
    setShowModal(false);
    setFormData({
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
    setErrors({});

    Swal.fire({
      icon: "success",
      title: "Appointment Booked!",
      text: "The appointment has been successfully added.",
      confirmButtonColor: "#1669f2",
    });
  };

  const handleEdit = (item) => {
    setEditPatient(item);
    router.push("/updateapt");
  };

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.phone} ${p.doctor}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="appointment-container">
      <div className="appointment-header d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center">
          <h4 className="appointment-title mb-0 me-2">Appointment</h4>
          <span className="count-badge">
            {patients.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: "25px" }}
        >
          <div className="search-wrapper d-flex align-items-center">
            <input
              className="form-control search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="date-filter d-flex align-items-center">
            <label className="me-2" style={{ color: "#8F90A6" }}>
              Start Date
            </label>
            <input className="form-control date-input" type="date" />
          </div>

          <div className="date-filter d-flex align-items-center">
            <label className="me-2" style={{ color: "#8F90A6" }}>
              End Date
            </label>
            <input className="form-control date-input" type="date" />
          </div>

          <button
            className="btn btn-primary add-btn d-flex align-items-center"
            onClick={() => setShowModal(true)}
          >
            <Image src={headingbtnlogo} alt="Add" width={18} className="me-2" />
            Add Appointment
          </button>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Contact No</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((item, idx) => (
              <tr key={idx} className={idx % 2 !== 0 ? "striped" : ""}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.doctor}</td>
                <td>{item.datetime}</td>
                <td>
                  <span className="status-badge">{item.status}</span>
                </td>
                <td>
                  <Link href="/customerprofile">
                    <button className="view-btn">
                      <Image src={Eyes} alt="view" /> View Patient
                    </button>
                  </Link>
                  <button
                    className="edit-btn ms-2"
                    onClick={() => handleEdit(item)}
                  >
                    <Image src={Edit} alt="edit" />
                  </button>
                  <button
                    className="delete-btn ms-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Image src={Delete} alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Appointments;
