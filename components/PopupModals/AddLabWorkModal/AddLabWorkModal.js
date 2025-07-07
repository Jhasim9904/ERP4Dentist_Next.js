// components/AddLabWork/AddLabWorkModal.js
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AddLabWorkModal.module.css";

const permanentTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28,
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38,
];

export default function AddLabWorkModal({ onClose }) {
  const [selectedTeeth, setSelectedTeeth] = useState([]);

  const handleSelectTooth = (num) => {
    setSelectedTeeth((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const renderQuadrants = () => {
    const q1 = permanentTeeth.slice(0, 8);
    const q2 = permanentTeeth.slice(8, 16);
    const q3 = permanentTeeth.slice(16, 24);
    const q4 = permanentTeeth.slice(24, 32);

    return (
      <div className={styles.toothGridContainer}>
        <div className={styles.cross}></div>
        <div className={styles.quadrantRow}>
          <div className={styles.quadrantBox}>
            {q1.map((num) => (
              <div key={num} className={`${styles.toothWrapper} ${selectedTeeth.includes(num) ? styles.selected : ""}`} onClick={() => handleSelectTooth(num)}>
                <Image src={`/tooth/permanent/${num}.png`} alt={`Tooth ${num}`} width={50} height={50} className={styles.toothImage} />
                <div className={styles.toothLabel}>{num}</div>
              </div>
            ))}
          </div>
          <div className={styles.quadrantBox}>
            {q2.map((num) => (
              <div key={num} className={`${styles.toothWrapper} ${selectedTeeth.includes(num) ? styles.selected : ""}`} onClick={() => handleSelectTooth(num)}>
                <Image src={`/tooth/permanent/${num}.png`} alt={`Tooth ${num}`} width={50} height={50} className={styles.toothImage} />
                <div className={styles.toothLabel}>{num}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.quadrantRow}>
          <div className={styles.quadrantBox}>
            {q3.map((num) => (
              <div key={num} className={`${styles.toothWrapper} ${selectedTeeth.includes(num) ? styles.selected : ""}`} onClick={() => handleSelectTooth(num)}>
                <Image src={`/tooth/permanent/${num}.png`} alt={`Tooth ${num}`} width={50} height={50} className={styles.toothImage} />
                <div className={styles.toothLabel}>{num}</div>
              </div>
            ))}
          </div>
          <div className={styles.quadrantBox}>
            {q4.map((num) => (
              <div key={num} className={`${styles.toothWrapper} ${selectedTeeth.includes(num) ? styles.selected : ""}`} onClick={() => handleSelectTooth(num)}>
                <Image src={`/tooth/permanent/${num}.png`} alt={`Tooth ${num}`} width={50} height={50} className={styles.toothImage} />
                <div className={styles.toothLabel}>{num}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Lab Work</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                <label>Order Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col">
                <label>Completion Date</label>
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="mt-3">
              <select className="form-select mb-3">
                <option>Select Doctor</option>
              </select>
              <select className="form-select mb-3">
                <option>Select Lab</option>
              </select>
            </div>

            {renderQuadrants()}

            <div className="mt-2"><strong>Selected:</strong> {selectedTeeth.join(", ") || "None"}</div>

            <div className="mt-4 d-flex gap-3">
              {["All Upper Tooth", "Full Mouth", "All Lower Tooth"].map((label, idx) => (
                <div className="form-check" key={idx}>
                  <input className="form-check-input" type="checkbox" id={`chk-${idx}`} />
                  <label className="form-check-label" htmlFor={`chk-${idx}`}>{label}</label>
                </div>
              ))}
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Number of Teeth / Units</label>
                <input type="number" className="form-control" value={selectedTeeth.length} readOnly />
              </div>
              <div className="col-md-6">
                <label>Procedure</label>
                <select className="form-select"></select>
              </div>
            </div>

            <div className="mt-3">
              <label>Type</label>
              <select className="form-select"></select>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Cost per Teeth / Unit (₹)</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Total Cost (₹)</label>
                <input type="text" className="form-control" value={selectedTeeth.length * 0} readOnly />
              </div>
            </div>

            <div className="row mt-4">
              {["Occlusal/Incisal 1/3", "Middle 1/3", "Cervical 1/3"].map((label, i) => (
                <div className="col-md-4 form-check form-switch" key={i}>
                  <input className="form-check-input" type="checkbox" id={`region-${i}`} />
                  <label className="form-check-label" htmlFor={`region-${i}`}>{label}</label>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label>Special Instructions</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-check form-switch mt-4">
              <input className="form-check-input" type="checkbox" id="repeat" />
              <label className="form-check-label" htmlFor="repeat">Repeat</label>
            </div>

            <div className="form-check form-switch mt-2">
              <input className="form-check-input" type="checkbox" id="trial" />
              <label className="form-check-label" htmlFor="trial">Trial Required</label>
            </div>

            <label className="mt-4">Enclosures</label>
            <div className="row">
              {["Blood Pressure", "Diabetes", "Acidity/Ulcer", "Thyroid Problem", "Heart Problem"].map((label, idx) => (
                <div className="col-sm-4 form-check form-switch" key={idx}>
                  <input className="form-check-input" type="checkbox" id={`enclosure-${idx}`} />
                  <label className="form-check-label" htmlFor={`enclosure-${idx}`}>{label}</label>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label>Remark</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
