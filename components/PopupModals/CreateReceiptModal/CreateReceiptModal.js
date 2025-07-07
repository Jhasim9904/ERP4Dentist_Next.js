"use client";

import { useState } from "react";
import styles from "./CreateReceiptModal.module.css";

export default function CreateReceiptModal({ onClose }) {
  const [receiptDate, setReceiptDate] = useState("");
  const [receiptAmount, setReceiptAmount] = useState("200");
  const [doctor, setDoctor] = useState("Dr.A");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const doctorOptions = ["sabari", "Giri", "pooja", "gandhi", "Dr.A"];
  const paymentMethods = [
    "Cash",
    "Cheque",
    "Credit Card",
    "Net Banking",
    "Insurance",
    "Phone pe",
    "Google Pay",
    "PayTM",
    "Bharat Pay",
    "Others",
  ];

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Receipt</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className="form-label">Receipt Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className="form-label">Receipt Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={receiptAmount}
                  onChange={(e) => setReceiptAmount(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className="form-label">Doctor</label>
                <select
                  className="form-select"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  {doctorOptions.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className="form-label">Payment Method</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
