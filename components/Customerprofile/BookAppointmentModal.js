import React, { useState } from "react";
import "./BookAppointmentModal.css";

const BookAppointmentModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    doctor: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booked Appointment:", formData);
    onClose();
  };

  return (
    <div className="appointment-overlay">
      <div className="appointment-modal">
        <div className="modal-header">
          <h5 className="modal-title">Book Appointment</h5>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

                <div className="form-group">
                <label>Chief</label>
                <input
                  type="text"
                  name="text"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>In-Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

                <div className="form-group">
                <label>Out-Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Doctor</label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Doctor</option>
                  <option value="sabari">sabari</option>
                  <option value="pooja">pooja</option>
                  <option value="giri">giri</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows="2"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn book-btn">
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
