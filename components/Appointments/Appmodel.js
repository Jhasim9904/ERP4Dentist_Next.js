import React from "react";
import './Appmodel.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const AppModel = ({ formData, handleChange, handleSubmit, onClose, errors = {} }) => {
  const renderInvalid = (field) => (errors[field] ? "is-invalid" : "");

  return (
    <div className="appmodel-overlay">
      <div className="appmodel-content">
        <h5>Book Appointment</h5>
        <div className="appmodel-grid">
          <div>
            <label>Date</label>
            <input name="date" type="date" value={formData.date} onChange={handleChange} className={`form-control ${renderInvalid("date")}`} />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>
          <div>
            <label>In Time</label>
            <input name="inTime" type="time" value={formData.inTime} onChange={handleChange} className={`form-control ${renderInvalid("inTime")}`} />
            {errors.inTime && <div className="invalid-feedback">{errors.inTime}</div>}
          </div>
          <div>
            <label>Out Time</label>
            <input name="outTime" type="time" value={formData.outTime} onChange={handleChange} className={`form-control ${renderInvalid("outTime")}`} />
            {errors.outTime && <div className="invalid-feedback">{errors.outTime}</div>}
          </div>
          <div>
            <label>Title</label>
            <select name="title" value={formData.title} onChange={handleChange} className="form-control">
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
            </select>
          </div>
          <div>
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} className={`form-control ${renderInvalid("firstName")}`} />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} className={`form-control ${renderInvalid("lastName")}`} />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          <div>
            <label>Age</label>
            <input name="age" value={formData.age} onChange={handleChange} className={`form-control ${renderInvalid("age")}`} />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>
          <div>
            <label>Gender</label>
            <input name="gender" value={formData.gender} onChange={handleChange} className="form-control" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${renderInvalid("email")}`} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className={`form-control ${renderInvalid("phone")}`} />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          <div>
            <label>Doctor</label>
            <select name="doctor" value={formData.doctor} onChange={handleChange} className={`form-control ${renderInvalid("doctor")}`}>
              <option value="">Select</option>
              <option>Dr. Surya</option>
              <option>Dr. Kavya Reddy</option>
            </select>
            {errors.doctor && <div className="invalid-feedback">{errors.doctor}</div>}
          </div>
          <div>
            <label>Reason</label>
            <input name="reason" value={formData.reason} onChange={handleChange} className={`form-control ${renderInvalid("reason")}`} />
            {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
          </div>
          <div>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="form-control">
              <option>Active</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="appmodel-full-width">
            <label>Note</label>
            <input name="note" value={formData.note} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="appmodel-actions">
          <button className="appmodel-cancel" onClick={onClose}>Close</button>
          <button className="appmodel-submit" onClick={handleSubmit}>Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default AppModel;
