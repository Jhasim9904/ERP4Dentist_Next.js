"use client";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const initialFormState = {
  labName: '',
  contactName: '',
  contactMobile: '',
  contactAddress: '',
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
  ifscCode: '',
  branch: '',
  gstNumber: '',
  procedure: 'Aligners',
  type: '',
  units: 1,
  price: ''
};

const procedureOptions = [
  'Aligners', 'Bridges', 'Crowns', 'Denture',
  'Implants', 'Retainers', 'Veneers', 'Whitening Kit', 'Other'
];

const LabForm = ({ setShowForm, setLabs, editingLab }) => {
  const isEdit = !!editingLab;
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingLab) {
      setFormData(editingLab);
    }
  }, [editingLab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // clear the error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.labName.trim()) newErrors.labName = 'Lab Name is required.';
    if (!formData.contactMobile.trim()) newErrors.contactMobile = 'Mobile number is required.';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact Name is required.';
    if (!formData.contactAddress.trim()) newErrors.contactAddress = 'Address is required.';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank Name is required.';
    if (!formData.bankAccountName.trim()) newErrors.bankAccountName = 'Bank A/C Name is required.';
    if (!formData.bankAccountNumber.trim()) newErrors.bankAccountNumber = 'Bank A/C Number is required.';
    if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC Code is required.';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required.';
    if (!formData.type.trim()) newErrors.type = 'Please select a Type.';
    if (!formData.units || formData.units < 1) newErrors.units = 'Enter a valid number of units.';
    if (!formData.price.trim()) newErrors.price = 'Price is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    let labs = JSON.parse(localStorage.getItem('labs')) || [];

    if (isEdit) {
      labs = labs.map(lab =>
        lab.id === editingLab.id ? { ...formData, id: lab.id } : lab
      );
    } else {
      const nextId = labs.length > 0
        ? Math.max(...labs.map(l => l.id)) + 1
        : 1;
      labs.push({ ...formData, id: nextId });
    }

    localStorage.setItem('labs', JSON.stringify(labs));
    setLabs(labs);
    setShowForm(false);
  };

  return (
    <div className="form-overlay" >
      <div className="form-container">
        <h5 className="mb-4 fw-bold text-start">{isEdit ? 'Edit Lab' : 'Create Lab'}</h5>
        <div className="modal-body px-4">
          <div className="row gy-3">

            {[
              { label: "Lab Name", name: "labName" },
              { label: "Contact Name", name: "contactName" },
              { label: "Contact Mobile", name: "contactMobile" },
              { label: "Contact Address", name: "contactAddress" },
              { label: "Bank Name", name: "bankName" },
              { label: "Bank A/C Name", name: "bankAccountName" },
              { label: "Bank A/C Number", name: "bankAccountNumber" },
              { label: "Branch", name: "branch" },
              { label: "IFSC Code", name: "ifscCode" },
              { label: "GST Number (Optional)", name: "gstNumber", required: false }
            ].map(({ label, name, required = true }) => (
              <div className="col-xl-6" key={name}>
                <label className="form-label">{label}</label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                  placeholder={`Enter ${label}`}
                />
                {errors[name] && (
                  <div className="invalid-feedback">{errors[name]}</div>
                )}
              </div>
            ))}

            <div className="col-xl-4">
              <label className="form-label">Procedure</label>
              <select
                name="procedure"
                value={formData.procedure}
                onChange={handleChange}
                className="form-select"
              >
                {procedureOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="col-xl-4">
              <label className="form-label">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`form-select ${errors.type ? 'is-invalid' : ''}`}
              >
                <option value="">Select Type</option>
                <option value="Unit">Unit</option>
                <option value="Tooth">Single Arch</option>
              </select>
              {errors.type && <div className="invalid-feedback">{errors.type}</div>}
            </div>

            <div className="col-xl-2">
              <label className="form-label">Units</label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                className={`form-control ${errors.units ? 'is-invalid' : ''}`}
              />
              {errors.units && <div className="invalid-feedback">{errors.units}</div>}
            </div>

            <div className="col-xl-2">
              <label className="form-label">Price</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                placeholder="Price"
              />
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-secondary me-2" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {isEdit ? 'Update Lab' : 'Create Lab'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabForm;
