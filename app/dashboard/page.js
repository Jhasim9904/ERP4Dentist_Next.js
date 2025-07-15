"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

import CardGrid from "@/components/Dashboard/Cardgrid";
import PatientTable from "@/components/Dashboard/PatientTable";
import RightInfoCard from "@/components/Dashboard/RightInfoCard";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import AppModel from "@/components/Appointments/Appmodel";

import headingbtnlogo from "@/components/images/headingbtnlogo.png";
import arrow from "@/components/images/arrow.png";

import { useTour } from "@/context/TourContext";

const Dashboard = () => {
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
  const [isBooking, setIsBooking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const { startTour } = useTour();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const normalizeDoctor = (name) => name?.replace(/\s+/g, "").toLowerCase();
  const doctorIdMap = {
    "dr.saritha": 1,
    "dr.a": 2,
    gandhi: 3,
    pooja: 4,
    giri: 6,
    sabari: 7,
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

    const parseTime = (t) => new Date(`1970-01-01T${t}:00`);
    const newStart = parseTime(finalPayload.intime);
    const newEnd = parseTime(finalPayload.outtime);

    setIsBooking(true);
    try {
      const res = await fetch(
        "https://testing.erp4dentist.com/api/appointment"
      );
      const json = await res.json();
      const liveAppointments = json?.appointment?.data || [];

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
          text: `Selected time slot is already booked for ${finalPayload.choose_doctor}.`,
          icon: "error",
        });
        return;
      }

      const postRes = await fetch(
        "https://testing.erp4dentist.com/api/addappointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        }
      );

      const postResult = await postRes.json();

      if (postRes.ok && postResult.status === "success") {
        Swal.fire("Success", "Appointment added successfully", "success");
        setShowModal(false);
        setFormData({ ...initialFormData });
        setErrors({});
      } else {
        Swal.fire(
          "Error",
          postResult?.message || "Appointment failed",
          "error"
        );
      }
    } catch (err) {
      console.error("Add appointment failed:", err);
      Swal.fire("Error", "Failed to add appointment", "error");
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(
          "https://testing.erp4dentist.com/api/dashboard"
        );
        const json = await res.json();
        if (json && json.data) {
          setDashboardData(json.data);
        } else {
          console.error("Invalid dashboard response structure");
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const tutorialModal = document.getElementById("tutorialModal");
    const iframe = tutorialModal?.querySelector("iframe");

    const stopVideoOnClose = () => {
      if (iframe) {
        iframe.src = iframe.src;
      }
    };

    tutorialModal?.addEventListener("hidden.bs.modal", stopVideoOnClose);

    return () => {
      tutorialModal?.removeEventListener("hidden.bs.modal", stopVideoOnClose);
    };
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="container1">
          <div
            style={{
              marginRight: "20px",
              display: "flex",
              flexDirection: "column",
              height: "70px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <h2
                  style={{
                    margin: 0,
                    fontWeight: "600",
                    fontSize: "24px",
                    color: "#333",
                  }}
                >
                  Welcome Sinnamuth
                </h2>
                <button
                  className="btn custom-watch-btn d-flex align-items-center gap-2 "
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#tutorialModal"
                >
                  <i className="fas fa-play-circle fa-lg"></i>
                  Watch Tutorial
                </button>

              </div>

              <div className="d-flex gap-2">
                <button
                  id="add-appointment"
                  className="btn btn-primary d-flex align-items-center"
                  onClick={() => setShowModal(true)}
                >
                  <Image
                    src={headingbtnlogo}
                    alt="Add Icon"
                    width={20}
                    height={20}
                    style={{ marginRight: "6px" }}
                  />
                  Add Appointment
                </button>

                <button
                  id="start-tour-btn"
                  onClick={startTour}
                  className="btn btn-outline-primary d-flex align-items-center"
                >
                  Start Tour
                  <Image
                    src={arrow}
                    alt="Arrow Icon"
                    width={25}
                    height={25}
                    style={{ marginLeft: "6px" }}
                  />
                </button>
              </div>
            </div>

            <p style={{ color: "#555", fontSize: "15px" }}>
              Track your appointments
            </p>
          </div>

          <div
            className="d-flex"
            style={{
              padding: "0px 0px 0px 5px",
              gap: "20px",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <div style={{ flex: 1 }}>
              <CardGrid dashboardCounts={dashboardData || {}} />
              <PatientTable appointments={dashboardData?.appointment || []} />
            </div>
            <RightInfoCard appointments={dashboardData?.appointment || []} />
          </div>
        </div>

        <Footer />

        <div
          className="modal fade"
          id="tutorialModal"
          tabIndex="-1"
          aria-labelledby="tutorialModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="tutorialModalLabel">
                  Video Tutorial
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/pguTCgMeGqg?si=OVOXvgTWhCJfToUJ"
                    title="YouTube tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <AppModel
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClose={() => setShowModal(false)}
            errors={errors}
            isBooking={isBooking}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
