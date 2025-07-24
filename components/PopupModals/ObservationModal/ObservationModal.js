// components\PopupModals\ObservationModal\ObservationModal.js
"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./ObservationModal.module.css";

const permanentTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

const deciduousTeeth = [
  55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75,
];

const doctorOptions = [
  { label: "Dr. Saritha", value: "Dr. Saritha", id: "1" },
  { label: "Dr. A", value: "Dr. A", id: "2" },
  { label: "Gandhi", value: "gandhi", id: "3" },
  { label: "Pooja", value: "pooja", id: "4" },
  { label: "Giri", value: "Giri", id: "6" },
  { label: "Sabari", value: "sabari", id: "7" },
];

export default function ObservationModal({ onClose, appo_id = "11", branch = "1" }) {
  const [selectedTab, setSelectedTab] = useState("permanent");
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [hoveredTooth, setHoveredTooth] = useState(null);
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [observation, setObservation] = useState("");
  const [note, setNote] = useState("");

  const handleSelectTooth = (num) => {
    setSelectedTeeth((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleBulkSelection = (type) => {
    let toSelect = [];

    if (selectedTab === "permanent") {
      if (type === "upper") toSelect = permanentTeeth.slice(0, 16);
      else if (type === "lower") toSelect = permanentTeeth.slice(16);
      else toSelect = permanentTeeth;
    } else {
      if (type === "upper") toSelect = deciduousTeeth.slice(0, 10);
      else if (type === "lower") toSelect = deciduousTeeth.slice(10);
      else toSelect = deciduousTeeth;
    }

    const allSelected = toSelect.every((t) => selectedTeeth.includes(t));
    setSelectedTeeth(allSelected
      ? selectedTeeth.filter((t) => !toSelect.includes(t))
      : [...new Set([...selectedTeeth, ...toSelect])]
    );
  };

  const renderQuadrants = (type) => {
    const [q1, q2, q3, q4] =
      type === "permanent"
        ? [permanentTeeth.slice(0, 8), permanentTeeth.slice(8, 16), permanentTeeth.slice(16, 24), permanentTeeth.slice(24, 32)]
        : [deciduousTeeth.slice(0, 5), deciduousTeeth.slice(5, 10), deciduousTeeth.slice(10, 15), deciduousTeeth.slice(15, 20)];

    const getToothImageSrc = (num) => {
      const folder = selectedTeeth.includes(num) || hoveredTooth === num ? `${type}-blue` : type;
      return `/tooth/${folder}/${num}.png`;
    };

    const renderBox = (teeth) =>
      teeth.map((num) => (
        <div key={num} className={styles.toothWrapper} onClick={() => handleSelectTooth(num)}>
          <Image
            src={getToothImageSrc(num)}
            alt={`Tooth ${num}`}
            width={50}
            height={50}
            className={styles.toothImage}
            onMouseEnter={() => setHoveredTooth(num)}
            onMouseLeave={() => setHoveredTooth(null)}
          />
          <div className={styles.toothLabel}>{num}</div>
        </div>
      ));

    return (
      <div className={styles.toothGridContainer}>
        <div className={styles.cross}></div>
        <div className={styles.quadrantRow}>
          <div className={styles.quadrantBox}>{renderBox(q1)}</div>
          <div className={styles.quadrantBox}>{renderBox(q2)}</div>
        </div>
        <div className={styles.quadrantRow}>
          <div className={styles.quadrantBox}>{renderBox(q3)}</div>
          <div className={styles.quadrantBox}>{renderBox(q4)}</div>
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!date || !doctor || !observation) {
      Swal.fire("Missing Fields", "Date, Doctor, and Observation are required", "warning");
      return;
    }

    const teethPayload = {};
    [...permanentTeeth, ...deciduousTeeth].forEach((num) => {
      teethPayload[`teeth_${num}`] = selectedTeeth.includes(num) ? "1" : "";
    });

    const payload = {
      startDate: date,
      doctor,
      doctor_id: doctorId,
      observation,
      note,
      appo_id,
      branch,
      ...teethPayload,
    };

    try {
      const res = await axios.post("https://testing.erp4dentist.com/api/observ_emr", payload);
      if (res.data?.status === "success") {
        Swal.fire("Success", "Observation saved successfully.", "success");
        onClose();
      } else {
        Swal.fire("Error", res.data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save observation", "error");
    }
  };

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Observation</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={doctor}
                onChange={(e) => {
                  const selected = doctorOptions.find((d) => d.value === e.target.value);
                  setDoctor(selected?.value || "");
                  setDoctorId(selected?.id || "");
                }}
              >
                <option value="">Please Select Doctor</option>
                {doctorOptions.map((doc) => (
                  <option key={doc.id} value={doc.value}>{doc.label}</option>
                ))}
              </select>
            </div>
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${selectedTab === "permanent" ? "active" : ""}`} onClick={() => setSelectedTab("permanent")}>Permanent</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${selectedTab === "deciduous" ? "active" : ""}`} onClick={() => setSelectedTab("deciduous")}>Deciduous</button>
              </li>
            </ul>

            {renderQuadrants(selectedTab)}

            <div className="mt-3">
              <strong>Selected:</strong> {selectedTeeth.join(", ") || "None"}
            </div>

            <div className="mt-4 d-flex gap-4">
              {["upper", "full", "lower"].map((id) => (
                <div key={id} className="form-check">
                  <input className="form-check-input" type="checkbox" id={id} onChange={() => handleBulkSelection(id)} />
                  <label className="form-check-label" htmlFor={id}>
                    {id === "upper" ? "All Upper Tooth" : id === "full" ? "Full Mouth" : "All Lower Tooth"}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <select className="form-select mb-3" value={observation} onChange={(e) => setObservation(e.target.value)}>
                <option value="">Select Observation</option>
                <option value="Attrition">Attrition</option>
                <option value="Cavity">Cavity</option>
                <option value="Missing Tooth">Missing Tooth</option>
              </select>

              <textarea className="form-control" placeholder="Notes" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
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
}
