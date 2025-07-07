import React, { useState } from 'react';
import './Procedure.css'; // <-- Make sure you update styles accordingly

const ProcedureForm = ({ setProcedures, procedures, setShowForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    unit: '1',
    price: '',
    tax: false
  });

  const [errors, setErrors] = useState({});
  const [tempProcedures, setTempProcedures] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Procedure is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.unit || isNaN(formData.unit) || Number(formData.unit) <= 0) {
      newErrors.unit = 'Valid unit is required';
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTempSave = () => {
    if (!validateForm()) return;

    const newEntry = { ...formData, id: Date.now() };
    setTempProcedures(prev => [...prev, newEntry]);

    setFormData({
      name: '',
      type: '',
      unit: '1',
      price: '',
      tax: false
    });
    setErrors({});
  };

  const handleCreate = () => {
    const isValid = validateForm();
    if (tempProcedures.length === 0 && !isValid) return;

    const nextId = procedures.length > 0 ? Math.max(...procedures.map(p => p.id)) + 1 : 1;

    const finalEntries =
      tempProcedures.length > 0
        ? tempProcedures.map((p, i) => ({ ...p, id: nextId + i }))
        : [{ ...formData, id: nextId }];

    const updated = [...procedures, ...finalEntries];
    setProcedures(updated);
    localStorage.setItem('procedures', JSON.stringify(updated));
    setShowForm(false);
  };

  const handleDeleteTemp = (id) => {
    setTempProcedures(tempProcedures.filter(p => p.id !== id));
  };

  return (
    <div className="procedure-overlay">
      <div className="procedure-form-container">
        <h5 className="procedure-form-title mb-3 text-start">Create Procedure</h5>

        <div className="row fw-semibold mb-2 px-2">
          <div className="col">Procedure</div>
          <div className="col">Type</div>
          <div className="col">Per Teeth/Units</div>
          <div className="col">Price</div>
          <div className="col d-flex justify-content-start">Tax</div>
          <div className="col-auto"></div>
        </div>

        <div className="row align-items-start px-2 gx-2">
          <div className="col">
            <select
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Braces">Braces</option>
              <option value="Composite filling">Composite filling</option>
              <option value="Recementation of crown">Recementation of crown</option>
            </select>
            {errors.name && <div className="procedure-invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col">
            <select
              name="type"
              className={`form-control ${errors.type ? 'is-invalid' : ''}`}
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Metal Basic">Metal Basic</option>
              <option value="Front Tooth">Front Tooth</option>
              <option value="With GIC">With GIC</option>
            </select>
            {errors.type && <div className="procedure-invalid-feedback">{errors.type}</div>}
          </div>

          <div className="col">
            <input
              type="number"
              name="unit"
              className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
              value={formData.unit}
              onChange={handleChange}
            />
            {errors.unit && <div className="procedure-invalid-feedback">{errors.unit}</div>}
          </div>

          <div className="col">
            <input
              type="number"
              name="price"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <div className="procedure-invalid-feedback">{errors.price}</div>}
          </div>

          <div className="col d-flex align-items-center pt-2">
            <input
              type="checkbox"
              name="tax"
              checked={formData.tax}
              onChange={handleChange}
            />
          </div>

          <div className="col-auto">
            <button className="btn btn-sm btn-primary px-3" onClick={handleTempSave}>
              Save
            </button>
          </div>
        </div>

        {tempProcedures.map((p) => (
          <div key={p.id} className="row align-items-start px-2 gx-2 mt-2">
            <div className="col"><input className="form-control" value={p.name} disabled /></div>
            <div className="col"><input className="form-control" value={p.type} disabled /></div>
            <div className="col"><input className="form-control" value={p.unit} disabled /></div>
            <div className="col"><input className="form-control" value={p.price} disabled /></div>
            <div className="col d-flex align-items-center justify-content-start"><span>-</span></div>
            <div className="col-auto d-flex align-items-center">
              <i
                className="fa fa-trash-o text-danger"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteTemp(p.id)}
              ></i>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-light me-2" onClick={() => setShowForm(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcedureForm;
