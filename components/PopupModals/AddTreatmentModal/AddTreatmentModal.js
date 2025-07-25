// components\PopupModals\AddTreatmentModal\AddTreatmentModal.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import styles from "./AddTreatmentModal.module.css";

const permanentTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
  45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

const deciduousTeeth = [
  55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74,
  75,
];

export default function AddTreatmentModal({ onClose, obsId, appo_id, branch, switchToTreatmentTab  }) {
  const [selectedTab, setSelectedTab] = useState("permanent");
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [lockedTeeth, setLockedTeeth] = useState([]);
  const [hoveredTooth, setHoveredTooth] = useState(null);

  const [formData, setFormData] = useState({
    startDate: "",
    doctor: "",
    doctor_id: null,
    procedure: "",
    type: "",
    originalPrice: "",
    newPrice: 0,
    discount: 0,
  });

  useEffect(() => {
    if (obsId) {
      axios
        .get(`https://testing.erp4dentist.com/observ-teeth/${obsId}`)
        .then((res) => {
          const teethArray = res?.data?.teethData || [];
          setSelectedTeeth(teethArray);
          setLockedTeeth(teethArray);
        })
        .catch((err) => console.error("Failed to fetch selected teeth", err));
    }
  }, [obsId]);

  const handleSelectTooth = (num) => {
    if (!lockedTeeth.includes(num)) {
      Swal.fire({
        icon: "warning",
        title: "Not Allowed",
        text: "New Teeth Should Not Be Allowed",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setSelectedTeeth((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleSave = async () => {
    if (!formData.startDate || !formData.doctor || !formData.doctor_id) {
      return Swal.fire("Missing Fields", "Please fill all fields", "warning");
    }

    if (selectedTeeth.length === 0) {
      return Swal.fire(
        "No Teeth Selected",
        "Please select at least one locked tooth",
        "warning"
      );
    }

    const payload = {
      startDate: formData.startDate,
      doctor: formData.doctor,
      doctor_id: formData.doctor_id,
      procedure: formData.procedure,
      type: formData.type,
      price_proce: parseFloat(formData.originalPrice),
      disprice_proce: parseFloat(formData.newPrice),
      dicount: parseFloat(formData.discount),
      hidprice_proce: 100,
      price_balance: null,
      notu: selectedTeeth.length,
      appo_id,
      branch,
      branch_id: branch,
      observ_id: obsId,
      ...Object.fromEntries(selectedTeeth.map((num) => [`teeth_${num}`, 10])),
    };

    console.log("Submitting Plan Payload", payload);

    try {
      const res = await axios.post(
        "https://testing.erp4dentist.com/api/plan_emr",
        payload
      );

      if (res.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Plan Created Successfully",
          confirmButtonText: "OK",
        });

        // ✅ First switch to treatment tab
        if (typeof switchToTreatmentTab === "function") {
          switchToTreatmentTab();
        }

        // ✅ Then close modal and refresh
        if (typeof onClose === "function") {
          onClose(true);
        }

        // ✅ Optional smooth scroll into treatment section
        setTimeout(() => {
          document
            .querySelector(".treatment-container")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    } catch (error) {
      console.error("Failed to submit plan", error);
      Swal.fire("Error", "Failed to submit plan", "error");
    }
  };

  const renderQuadrants = (type) => {
    let q1 = [],
      q2 = [],
      q3 = [],
      q4 = [];

    if (type === "permanent") {
      const list = permanentTeeth;
      q1 = list.slice(0, 8);
      q2 = list.slice(8, 16);
      q3 = list.slice(16, 24);
      q4 = list.slice(24, 32);
    } else {
      q1 = deciduousTeeth.slice(0, 5);
      q2 = deciduousTeeth.slice(5, 10);
      q3 = deciduousTeeth.slice(10, 15);
      q4 = deciduousTeeth.slice(15, 20);
    }

    const getToothImageSrc = (num) => {
      const folder =
        selectedTeeth.includes(num) || hoveredTooth === num
          ? `${type}-blue`
          : type;
      return `/tooth/${folder}/${num}.png`;
    };

    const renderQuadrantBox = (teeth) =>
      teeth.map((num) => (
        <div
          key={num}
          className={styles.toothWrapper}
          onClick={() => handleSelectTooth(num)}
        >
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
          <div className={styles.quadrantBox}>{renderQuadrantBox(q1)}</div>
          <div className={styles.quadrantBox}>{renderQuadrantBox(q2)}</div>
        </div>
        <div className={styles.quadrantRow}>
          <div className={styles.quadrantBox}>{renderQuadrantBox(q3)}</div>
          <div className={styles.quadrantBox}>{renderQuadrantBox(q4)}</div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Plan</h5>
            <button
              className="btn-close"
              onClick={() => onClose(false)}
            ></button>
          </div>

          <div className="modal-body">
            {/* Date */}
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>

            {/* Doctor */}
            <div className="mb-3">
              <select
                className="form-select"
                value={formData.doctor}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
                    doctor: val,
                    doctor_id: val === "Dr. Smith" ? 10 : 11,
                  });
                }}
              >
                <option>Please Select Doctor</option>
                <option>Dr. Smith</option>
                <option>Dr. Lisa</option>
              </select>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    selectedTab === "permanent" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab("permanent")}
                >
                  Permanent
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    selectedTab === "deciduous" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab("deciduous")}
                >
                  Deciduous
                </button>
              </li>
            </ul>

            {renderQuadrants(selectedTab)}

            <div className="mt-3">
              <strong>Selected:</strong> {selectedTeeth.join(", ") || "None"}
            </div>

            {/* Form Fields */}
            <div className="mt-4">
              <label className="form-label">Procedure</label>
              <select
                className="form-select mb-3"
                value={formData.procedure}
                onChange={(e) =>
                  setFormData({ ...formData, procedure: e.target.value })
                }
              >
                <option>Select Procedure</option>
                <option>Filling</option>
                <option>Extraction</option>
              </select>

              <label className="form-label">Type</label>
              <select
                className="form-select mb-3"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option>Select Type</option>
                <option>Basic</option>
                <option>Advanced</option>
              </select>

              <label className="form-label">Number of Teeth / Units*</label>
              <input
                type="number"
                className="form-control mb-3"
                value={selectedTeeth.length}
                readOnly
              />

              <label className="form-label">Original Price</label>
              <input
                type="number"
                className="form-control mb-3"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
              />

              <label className="form-label">New Price</label>
              <input
                type="number"
                className="form-control mb-3"
                value={formData.newPrice}
                onChange={(e) =>
                  setFormData({ ...formData, newPrice: e.target.value })
                }
              />

              <label className="form-label">Discount</label>
              <input
                type="number"
                className="form-control mb-3"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
