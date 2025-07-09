

"use client";
import React, { useState, useEffect } from "react";
import "./DrugStyles.css";

const initialForm = {
  name: "",
  type: "",
  strength: "",
  instructions: "",
};

const DrugForm = ({ setShowForm, setDrugs, editingDrug }) => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const isEdit = !!editingDrug;

  useEffect(() => {
    if (editingDrug) {
      setFormData(editingDrug);
    }
  }, [editingDrug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Drug Name is required.";
    if (!formData.type.trim()) newErrors.type = "Drug Type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    let drugs = JSON.parse(localStorage.getItem("drugs")) || [];

    if (isEdit) {
      drugs = drugs.map((d) =>
        d.id === editingDrug.id ? { ...formData, id: d.id } : d
      );
    } else {
      const nextId = drugs.length > 0 ? Math.max(...drugs.map((d) => d.id)) + 1 : 1;
      drugs.push({ ...formData, id: nextId });
    }

    localStorage.setItem("drugs", JSON.stringify(drugs));
    setDrugs(drugs);
    setShowForm(false);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h5>{isEdit ? "Edit Drug" : "Add Drug to Catalog"}</h5>
          <button className="btn-close" onClick={() => setShowForm(false)} />
        </div>

        <div className="modal-body">
          <div className="row gy-3">
            <div className="col-md-6">
              <label className="form-label">Drug Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter Drug Name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Drug Type</label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`form-control ${errors.type ? "is-invalid" : ""}`}
                placeholder="Tablet"
              />
              {errors.type && <div className="invalid-feedback">{errors.type}</div>}
            </div>

            <div className="col-12">
              <label className="form-label">Strength</label>
              <input
                name="strength"
                value={formData.strength}
                onChange={handleChange}
                className="form-control"
                placeholder="Strength"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="form-control"
                rows={2}
                placeholder="Instructions"
              />
            </div>
          </div>

          <div className="form-footer mt-4">
            <button className="btn btn-light me-2" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="btn btn-purple" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugForm;
