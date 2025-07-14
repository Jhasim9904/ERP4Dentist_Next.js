"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import AppModel from "@/components/Appointments/Appmodel";
import headingbtnlogo from "@/components/images/headingbtnlogo.png";
import Delete from "@/components/Appointments/images/Delete.png";
import Edit from "@/components/Appointments/images/Edit.png";
import Eyes from "@/components/Appointments/images/Eyes.png";
import "./Appointments.css";

const normalizeDoctor = (name) => name?.replace(/\s+/g, "").toLowerCase();

const doctorIdMap = {
  "dr.saritha": 1,
  "dr.a": 2,
  gandhi: 3,
  pooja: 4,
  giri: 6,
  sabari: 7,
};

const Appointments = () => {
  const router = useRouter();
  // const [formData,setFormData] = useState({})
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const initialFormData = {
    date: "",
    inTime: "",
    outTime: "",
    title: "Mr",
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    countryCode: "+91",
    phone: "",
    email: "",
    doctor: "",
    reason: "",
    chiefComplaint: "",
    branch: "1",
    status: "Active",
    note: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://testing.erp4dentist.com/api/appointment"
      );
      const data = res.data?.appointment?.data || [];
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      Swal.fire("Error", "Failed to load appointments.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let results = [...appointments];

  if (searchTerm) {
    results = results.filter((p) =>
      `${p.firstname} ${p.lastname} ${p.contact_no} ${p.choose_doctor}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  if (startDate || endDate) {
  results = results.filter((p) => {
    if (!p.date_appointment) return false;

    const appointmentDate = new Date(`${p.date_appointment}T00:00:00`);
    const fromDate = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const toDate = endDate ? new Date(`${endDate}T23:59:59`) : null;

    if (fromDate && appointmentDate < fromDate) return false;
    if (toDate && appointmentDate > toDate) return false;

    return true;
  });
}

  setFilteredAppointments(results);
  setPage(1);
}, [searchTerm, startDate, endDate, appointments]);


  const indexOfLast = page * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the appointment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = appointments.filter((p) => p.id !== id);
        setAppointments(updated);
        setFilteredAppointments(updated);
        Swal.fire("Deleted!", "The appointment has been deleted.", "success");
      }
    });
  };

  const handleEdit = (item) => {
    console.log("this is item",item);
    setFormData({item});
    console.log("this is form data",formData);
    router.push("/updateapt");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.inTime) newErrors.inTime = "In Time is required";
    if (!formData.outTime) newErrors.outTime = "Out Time is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.doctor) newErrors.doctor = "Doctor is required";
    if (!formData.reason) newErrors.reason = "Reason is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (payloadFromModal) => {
    const finalPayload = payloadFromModal || {
      title: formData.title,
      firstname: formData.firstName,
      lastname: formData.lastName,
      age: Number(formData.age),
      gender: formData.gender,
      countrycode: formData.countryCode,
      contact_no: formData.phone,
      email: formData.email,
      choose_doctor: formData.doctor,
      appo_doc_id: doctorIdMap[normalizeDoctor(formData.doctor)] || 6,
      reason_appointment: formData.reason,
      chief_complaint: formData.chiefComplaint || "",
      status: formData.status === "Active" ? 1 : 0,
      date_appointment: formData.date,
      intime: formData.inTime,
      outtime: formData.outTime,
      note: formData.note,
      branch: parseInt(formData.branch),
    };

    // Convert time strings to Date objects for comparison
    const parseTime = (t) => new Date(`1970-01-01T${t}:00`);

    const newStart = parseTime(finalPayload.intime);
    const newEnd = parseTime(finalPayload.outtime);

    try {
      // ✅ Always get latest appointments from live API
      const res = await axios.get(
        "https://testing.erp4dentist.com/api/appointment"
      );
      const liveAppointments = res.data?.appointment?.data || [];

      const hasClash = liveAppointments.some((appt) => {
        const isSameDate =
          appt.date_appointment === finalPayload.date_appointment;
        const isSameDoctor = appt.choose_doctor === finalPayload.choose_doctor;

        if (!isSameDate || !isSameDoctor) return false;

        const existingStart = parseTime(appt.intime);
        const existingEnd = parseTime(appt.outtime);

        return newStart < existingEnd && newEnd > existingStart;
      });

      if (hasClash) {
        Swal.fire({
          title: "Time Slot Unavailable",
          text: `Selected time slot is already booked for ${finalPayload.choose_doctor}. Please choose a different time.`,
          icon: "error",
          customClass: {
            container: "custom-swal-container",
          },
        });
        return;
      }

      // ✅ No clash, proceed to add appointment
      const postRes = await axios.post(
        "https://testing.erp4dentist.com/api/addappointment",
        finalPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (postRes.status === 200 || postRes.data?.status === "success") {
        await fetchAppointments(); // refresh local state
        Swal.fire("Success", "Appointment added successfully", "success");
        setShowModal(false);
        setFormData({ ...initialFormData });
        setErrors({});
      } else {
        Swal.fire(
          "Error",
          postRes.data?.message || "Appointment failed",
          "error"
        );
      }
    } catch (err) {
      console.error("Add appointment failed:", err);
      Swal.fire("Error", "Failed to add appointment", "error");
    }
  };

  return (
    <div className="appointment-container">
      {/* Header */}
      <div className="appointment-header d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center">
          <h4 className="appointment-title mb-0 me-2">Appointment</h4>
          <span className="count-badge">
            {appointments.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: "25px" }}
        >
          <div className="search-wrapper d-flex align-items-center">
            <input
              className="form-control search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="date-filter d-flex align-items-center">
            <label className="me-2" style={{ color: "#8F90A6" }}>
              Start Date
            </label>
            <input
              className="form-control date-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="date-filter d-flex align-items-center">
            <label className="me-2" style={{ color: "#8F90A6" }}>
              End Date
            </label>
            <input
              className="form-control date-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary add-btn d-flex align-items-center"
            onClick={() => setShowModal(true)}
          >
            <Image src={headingbtnlogo} alt="Add" width={18} className="me-2" />
            Add Appointment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive mt-4">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Contact No</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan={7}>No appointments found.</td>
              </tr>
            ) : (
              currentRows.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.id || `P-${idx + 1}`}</td>
                  <td>{`${item.firstname || ""} ${item.lastname || ""}`}</td>
                  <td>{item.contact_no || "—"}</td>
                  <td>{item.choose_doctor || "—"}</td>
                  <td>{`${item.date_appointment || "—"} ${
                    item.intime || ""
                  }`}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "1" ? "active" : "inactive"
                      }`}
                    >
                      {item.status === "1" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link href="/customerprofile">
                      <button className="view-btn">
                        <Image src={Eyes} alt="view" /> View
                      </button>
                    </Link>
                    <button
                      className="edit-btn ms-2"
                      onClick={() => handleEdit(item)}
                    >
                      <Image src={Edit} alt="edit" />
                    </button>
                    <button
                      className="delete-btn ms-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Image src={Delete} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container mt-4 d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AppModel
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          errors={errors}
        />
      )}
    </div>
  );
};

export default Appointments;
