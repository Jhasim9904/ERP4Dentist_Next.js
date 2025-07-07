"use client";
import React, { useState } from "react";
import "./CreateDoctor.css";

const CreateDoctor = ({ onClose, onCreate }) => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    type: "",
    specialization: "",
    email: "",
    contactNumber: "",
    joinDate: "",
    status: "",
    profileImage: "",
    note: "",
    color: "#3a6351",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });

    // Clear the error message as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleColorChange = (e) => {
    setDoctorData({ ...doctorData, color: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDoctorData({ ...doctorData, profileImage: ev.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!doctorData.name.trim()) newErrors.name = "Name is required";
    if (!doctorData.type.trim()) newErrors.Type = "Type is required";
    if (!doctorData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!doctorData.email.trim()) newErrors.email = "Email is required";
    if (!doctorData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!doctorData.joinDate.trim()) newErrors.joinDate = "Join date is required";
    if (!doctorData.status.trim()) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCreate(doctorData);
    onClose();
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h3>Create Doctor</h3>
        <div className="form-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div className="row">
              <div className="col">
                <label>Doctor Name</label>
                <input
                  type="text"
                  placeholder="Doctor Name"
                  className={`input-field ${errors.name ? "error-border" : ""}`}
                  name="name"
                  value={doctorData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}

                <label>Specification</label>
                <input
                  type="text"
                  placeholder="Specialization"
                  className={`input-field ${errors.specialization ? "error-border" : ""}`}
                  name="specialization"
                  value={doctorData.specialization}
                  onChange={handleChange}
                />
                {errors.specialization && <span className="error-text">{errors.specialization}</span>}
              </div>

              <div className="col">
                <label>Type</label>
                <input
                  type="text"
                  placeholder="Type"
                  className={`input-field ${errors.name ? "error-border" : ""}`}
                  name="type"
                  value={doctorData.type}
                  onChange={handleChange}
                />
                {errors.Type && <span className="error-text">{errors.Type}</span>}
                <div>

                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className={`input-field ${errors.email ? "error-border" : ""}`}
                  name="email"
                  value={doctorData.email}
                  onChange={handleChange}
                  />
                {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Contact Number</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className={`input-field ${errors.contactNumber ? "error-border" : ""}`}
                  name="contactNumber"
                  value={doctorData.contactNumber}
                  onChange={handleChange}
                />
                {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
              </div>

              <div className="col">
                <label>Join Date</label>
                <input
                  type="date"
                  className={`input-field ${errors.joinDate ? "error-border" : ""}`}
                  name="joinDate"
                  value={doctorData.joinDate}
                  onChange={handleChange}
                />
                {errors.joinDate && <span className="error-text">{errors.joinDate}</span>}
              </div>

              <div className="col">
                <label>Choose Color</label>
                <input
                  type="color"
                  value={doctorData.color}
                  onChange={handleColorChange}
                  className="color-input"
                />
              </div>

              <div className="row">
                <div className="col">
                  <label>Status</label>
                  <input
                    type="text"
                    placeholder="Status"
                    className="input-field"
                    name="status"
                    value={doctorData.status}
                    onChange={handleChange}
                  />
                {errors.status && <span className="error-text">{errors.status}</span>}
                </div>

                <div className="col">
                  <label>Profile</label>
                  <input type="file" onChange={handleFileChange} />
                </div>
              </div>
            </div>

            <textarea
              placeholder="Note"
              className="input-field"
              rows={3}
              name="note"
              value={doctorData.note}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="create-btn" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;
