import React, { useState } from "react";
import "./PrescriptionModal.css";

const PrescriptionModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // 👈 Auto-filled date
    drug: "",
    type: "",
    dosage: "",
    duration: "",
    doctor: "",
    instructions: "",
    color: "#f28b82",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.drug.trim()) newErrors.drug = "Drug name is required";
    if (!formData.type.trim()) newErrors.type = "Drug type is required";
    if (!formData.dosage.trim()) newErrors.dosage = "Dosage is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.doctor.trim()) newErrors.doctor = "Doctor is required";
    if (!formData.instructions.trim())
      newErrors.instructions = "Instructions required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h5>Prescriptions</h5>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
                
              <label>Drug</label>
              <input
                type="text"
                className={`form-control ${errors.drug ? "is-invalid" : ""}`}
                placeholder="Enter Drug Name"
                name="drug"
                value={formData.drug}
                onChange={handleChange}
              />
              {errors.drug && (
                <div className="invalid-feedback">{errors.drug}</div>
              )}
            </div>

            <div className="form-group">
              <label>Drug Type</label>
              <input
                type="text"
                className={`form-control ${errors.type ? "is-invalid" : ""}`}
                placeholder="Enter Drug Frequency"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              {errors.type && (
                <div className="invalid-feedback">{errors.type}</div>
              )}
            </div>

            <div className="form-group">
              <label>Dosage</label>
              <input
                type="text"
                className={`form-control ${errors.dosage ? "is-invalid" : ""}`}
                placeholder="e.g. Morning - 0"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
              />
              {errors.dosage && (
                <div className="invalid-feedback">{errors.dosage}</div>
              )}
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                className={`form-control ${
                  errors.duration ? "is-invalid" : ""
                }`}
                placeholder="e.g. 5 days"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
              {errors.duration && (
                <div className="invalid-feedback">{errors.duration}</div>
              )}
            </div>

            <div className="form-group full">
              <label>Doctor</label>
              <select
                className={`form-control ${errors.doctor ? "is-invalid" : ""}`}
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              >
                <option value="">Select Doctor</option>
                <option value="sabari">sabari</option>
                <option value="pooja">pooja</option>
                <option value="giri">giri</option>
              </select>
              {errors.doctor && (
                <div className="invalid-feedback">{errors.doctor}</div>
              )}
            </div>

            <div className="form-group full">
              <label>Instructions</label>
              <textarea
                className={`form-control ${
                  errors.instructions ? "is-invalid" : ""
                }`}
                rows="2"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
              ></textarea>
              {errors.instructions && (
                <div className="invalid-feedback">{errors.instructions}</div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
