"use client";
import React, { useState } from 'react';
import styles from './EditPrescriptionModal.module.css';

const EditPrescriptionModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    drug: initialData?.drug || '',
    frequency: initialData?.frequency || '',
    doctor: initialData?.doctor || '',
    intake: initialData?.intake || 'Before Food',
    duration: initialData?.duration || '1 days',
    instructions: initialData?.instructions || ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.drug.trim()) newErrors.drug = 'Drug is required';
    if (!formData.frequency.trim()) newErrors.frequency = 'Dosage & Frequency is required';
    if (!formData.doctor.trim()) newErrors.doctor = 'Doctor is required';
    if (!formData.intake.trim()) newErrors.intake = 'Intake selection is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration selection is required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Prescription</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label>Drug</label>
                <input
                  type="text"
                  className={`form-control ${errors.drug ? 'is-invalid' : ''}`}
                  name="drug"
                  value={formData.drug}
                  onChange={handleChange}
                  placeholder="Enter Drug Name"
                />
                {errors.drug && <div className="invalid-feedback">{errors.drug}</div>}
              </div>

              <div className="col-md-12 mb-3">
                <label>Dossage & Frequency</label>
                <input
                  type="text"
                  className={`form-control ${errors.frequency ? 'is-invalid' : ''}`}
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  placeholder="Enter Drug Frequency"
                />
                {errors.frequency && <div className="invalid-feedback">{errors.frequency}</div>}
              </div>

              <div className="col-md-12 mb-3">
                <label>Doctor</label>
                <input
                  type="text"
                  className={`form-control ${errors.doctor ? 'is-invalid' : ''}`}
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                />
                {errors.doctor && <div className="invalid-feedback">{errors.doctor}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label>In take</label>
                <select
                  className={`form-control ${errors.intake ? 'is-invalid' : ''}`}
                  name="intake"
                  value={formData.intake}
                  onChange={handleChange}
                >
                  <option>Before Food</option>
                  <option>After Food</option>
                </select>
                {errors.intake && <div className="invalid-feedback">{errors.intake}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Duration</label>
                <select
                  className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  {[...Array(7)].map((_, i) => (
                    <option key={i}>{`${i + 1} days`}</option>
                  ))}
                </select>
                {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
              </div>

              <div className="col-md-12 mb-3">
                <label>Instructions</label>
                <textarea
                  className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                />
                {errors.instructions && (
                  <div className="invalid-feedback">{errors.instructions}</div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPrescriptionModal;
