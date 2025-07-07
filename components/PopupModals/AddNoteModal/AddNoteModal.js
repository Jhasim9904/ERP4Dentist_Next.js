"use client";

import { useState } from "react";
import styles from "./AddNoteModal.module.css";

export default function AddNoteModal({ onClose }) {
  const [date, setDate] = useState("");
  const [toothNumber, setToothNumber] = useState("");
  const [doctor, setDoctor] = useState("");
  const [procedure, setProcedure] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Note</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className={styles.row}>
              <div className={styles.column}>
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className={styles.column}>
                <label className="form-label">Tooth Number</label>
                <textarea
                  className="form-control"
                  value={toothNumber}
                  onChange={(e) => setToothNumber(e.target.value)}
                  placeholder="e.g. 18,17,16,42"
                  rows={1}
                />
              </div>

              <div className={styles.column}>
                <label className="form-label">Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  placeholder="e.g. sabari"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.column}>
                <label className="form-label">Procedure</label>
                <input
                  type="text"
                  className="form-control"
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  placeholder="e.g. Braces Consulting"
                />
              </div>

              <div className={styles.column}>
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="e.g. Adjustment"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Clinical Notes</label>
              <input
                type="text"
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter clinical notes..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
