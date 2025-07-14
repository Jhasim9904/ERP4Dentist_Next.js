import React from "react";
import "./Appmodel.css";
import "bootstrap/dist/css/bootstrap.min.css";

const normalizeDoctor = (name) => name?.replace(/\s+/g, "").toLowerCase();

const doctorIdMap = {
  "dr.saritha": 1,
  "dr.a": 2,
  gandhi: 3,
  pooja: 4,
  giri: 6,
  sabari: 7,
};

const AppModel = ({
  formData,
  handleChange,
  handleSubmit,
  onClose,
  errors = {},
  isBooking = false,
}) => {
  const renderInvalid = (field) => (errors[field] ? "is-invalid" : "");

  return (
    <div className="appmodel-overlay">
      <div className="appmodel-content">
        <h5>Book Appointment</h5>
        <div className="appmodel-grid">
          <div>
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={formData.date ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("date")}`}
            />
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>
          <div>
            <label>In Time</label>
            <input
              name="inTime"
              type="time"
              value={formData.inTime ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("inTime")}`}
            />
            {errors.inTime && (
              <div className="invalid-feedback">{errors.inTime}</div>
            )}
          </div>
          <div>
            <label>Out Time</label>
            <input
              name="outTime"
              type="time"
              value={formData.outTime ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("outTime")}`}
            />
            {errors.outTime && (
              <div className="invalid-feedback">{errors.outTime}</div>
            )}
          </div>
          <div>
            <label>Title</label>
            <select
              name="title"
              value={formData.title ?? "Mr"}
              onChange={handleChange}
              className="form-control"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
            </select>
          </div>
          <div>
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("firstName")}`}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div>
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("lastName")}`}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div>
            <label>Age</label>
            <input
              name="age"
              value={formData.age ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("age")}`}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender ?? "male"}
              onChange={handleChange}
              className="form-control"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Country Code</label>
            <select
              name="countryCode"
              value={formData.countryCode ?? "+91"}
              onChange={handleChange}
              className="form-control"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
          </div>
          <div>
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("phone")}`}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("email")}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div>
            <label>Branch</label>
            <select
              name="branch"
              value={formData.branch ?? "1"}
              onChange={handleChange}
              className="form-control"
            >
              <option value={1}>Main Branch</option>
              <option value={2}>Branch 2</option>
            </select>
          </div>
          <div>
            <label>Doctor</label>
            <select
              name="doctor"
              value={formData.doctor ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("doctor")}`}
            >
              <option value="">Select</option>
              <option value="Dr.Saritha">Dr.Saritha</option>
              <option value="Dr.A">Dr.A</option>
              <option value="gandhi">gandhi</option>
              <option value="pooja">pooja</option>
              <option value="Giri">Giri</option>
              <option value="sabari">sabari</option>
            </select>
            {errors.doctor && (
              <div className="invalid-feedback">{errors.doctor}</div>
            )}
          </div>
          <div>
            <label>Reason</label>
            <input
              name="reason"
              value={formData.reason ?? ""}
              onChange={handleChange}
              className={`form-control ${renderInvalid("reason")}`}
            />
            {errors.reason && (
              <div className="invalid-feedback">{errors.reason}</div>
            )}
          </div>
          <div>
            <label>Chief Complaint</label>
            <input
              name="chiefComplaint"
              value={formData.chiefComplaint ?? ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={formData.status ?? "Active"}
              onChange={handleChange}
              className="form-control"
            >
              <option value="Active">Active</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="appmodel-full-width">
            <label>Note</label>
            <input
              name="note"
              value={formData.note ?? ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="appmodel-actions">
          <button className="appmodel-cancel" onClick={onClose}>
            Close
          </button>
          <button
            className="appmodel-submit"
            onClick={(e) => {
              e.preventDefault();
              const payload = {
                date_appointment: formData.date,
                intime: formData.inTime,
                outtime: formData.outTime,
                title: formData.title,
                firstname: formData.firstName,
                lastname: formData.lastName,
                status: formData.status === "Active" ? 1 : 0,
                age: Number(formData.age),
                chief_complaint: formData.chiefComplaint || "",
                gender: formData.gender,
                countrycode: formData.countryCode,
                contact_no: formData.phone,
                branch: parseInt(formData.branch),
                email: formData.email,
                choose_doctor: formData.doctor,
                reason_appointment: formData.reason,
                note: formData.note,
                appo_doc_id: doctorIdMap[normalizeDoctor(formData.doctor)] || 6,
              };
              handleSubmit(payload);
            }}
          >
            Book Appointment
          </button>
        </div>

        {isBooking && (
          <div className="appmodel-loading-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Booking...</span>
            </div>
            <div className="loading-text">Booking Appointment...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppModel;
