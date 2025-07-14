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

const Appointments = () => {
  const router = useRouter();
  const [formData,setFormData] = useState({})
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // 🟢 Fetch Appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://testing.erp4dentist.com/api/appointment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    fetchAppointments();
  }, []);

  // 🔍 Search + Date Filter
  useEffect(() => {
    let results = appointments;

    if (searchTerm) {
      results = results.filter((p) =>
        `${p.firstname} ${p.lastname} ${p.contact_no} ${p.choose_doctor}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (startDate) {
      results = results.filter((p) => new Date(p.date_appointment) >= new Date(startDate));
    }

    if (endDate) {
      results = results.filter((p) => new Date(p.date_appointment) <= new Date(endDate));
    }

    setFilteredAppointments(results);
    setPage(1);
  }, [searchTerm, startDate, endDate, appointments]);

  // 📄 Pagination
  const indexOfLast = page * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);

  // 🗑️ Delete
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

  // ✏️ Edit
  const handleEdit = (item) => {
    console.log("this is item",item);
    setFormData({item});
    console.log("this is form data",formData);
    router.push("/updateapt");
  };

  return (
    <div className="appointment-container">
      {/* ✅ Header UI (Preserved from old version) */}
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

      {/* ✅ Table */}
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
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : currentRows.length === 0 ? (
              <tr><td colSpan={7}>No appointments found.</td></tr>
            ) : (
              currentRows.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.id || `P-${idx + 1}`}</td>
                  <td>{`${item.firstname || ""} ${item.lastname || ""}`}</td>
                  <td>{item.contact_no || "—"}</td>
                  <td>{item.choose_doctor || "—"}</td>
                  <td>{`${item.date_appointment || "—"} ${item.intime || ""}`}</td>
                  <td>
                    <span className={`status-badge ${item.status === "1" ? "active" : "inactive"}`}>
                      {item.status === "1" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link href="/customerprofile">
                      <button className="view-btn">
                        <Image src={Eyes} alt="view" /> View
                      </button>
                    </Link>
                    <button className="edit-btn ms-2" onClick={() => handleEdit(item)}>
                      <Image src={Edit} alt="edit" />
                    </button>
                    <button className="delete-btn ms-2" onClick={() => handleDelete(item.id)}>
                      <Image src={Delete} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container mt-4 d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <AppModel
          formData={{}}
          handleChange={() => {}}
          handleSubmit={() => {}}
          onClose={() => setShowModal(false)}
          errors={{}}
        />
      )}
    </div>
  );
};

export default Appointments;
