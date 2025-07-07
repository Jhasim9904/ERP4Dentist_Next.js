"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/SetContext";
import Swal from "sweetalert2";
import "./Updateapt.css";

const Updateapt = () => {
  const router = useRouter();
  const { editPatient, setEditPatient, patients, setPatients } = useContext(MyContext);

  const [formData, setFormData] = useState({
    date: "",
    inTime: "",
    outTime: "",
    title: "Mr.",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    doctor: "",
    reason: "",
    note: "",
    status: "Active",
  });
  useEffect(() => {
    if (editPatient) {
      setFormData(editPatient);
      
    }
  }, [editPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData?.id) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === formData.id
            ? {
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
                datetime: `${formData.date}, ${formData.inTime}`,
              }
            : p
        )
      );
    }
    setEditPatient(null);
    Swal.fire({
      icon: "success",
      title: "Updated Successfully!",
      text: "The appointment has been updated.",
      confirmButtonColor: "#1669f2",
    });
    router.push("/appointment");
  };

  return (
    <div className="update-container">
      <h2>Update Appointment</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="update-form-group">
          <label>Title</label>
          <select name="title" value={formData.title} onChange={handleChange}>
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
          </select>
        </div>

        <div className="update-form-group">
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Last Name</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>In Time</label>
          <input type="time" name="inTime" value={formData.inTime} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Out Time</label>
          <input type="time" name="outTime" value={formData.outTime} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Gender</label>
          <input name="gender" value={formData.gender} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Contact Number</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Doctor</label>
          <select name="doctor" value={formData.doctor} onChange={handleChange}>
            <option>Dr. Surya</option>
            <option>Dr. Riya</option>
            <option>Dr. Sameer</option>
          </select>
        </div>

        <div className="update-form-group">
          <label>Reason</label>
          <select name="reason" value={formData.reason} onChange={handleChange}>
            <option>Checkup</option>
            <option>Cleaning</option>
            <option>Filling</option>
          </select>
        </div>

        <div className="update-form-group">
          <label>Note</label>
          <input name="note" value={formData.note} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="update-actions">
          <button type="button" className="back-btn" onClick={() => router.back()}>
            Back
          </button>
          <button type="submit" className="update-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Updateapt;
