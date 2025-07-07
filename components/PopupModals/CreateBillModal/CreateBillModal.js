"use client";

import { useState } from "react";
import styles from "./CreateBillModal.module.css";

export default function CreateBillModal({ onClose }) {
  const [totalAmount, setTotalAmount] = useState("700");
  const [balanceAmount, setBalanceAmount] = useState("240");
  const [advanceAmount, setAdvanceAmount] = useState("0");
  const [amountToBePaid, setAmountToBePaid] = useState("");

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Bill</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className="form-label">Total Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className="form-label">Balance Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className="form-label">Advance amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className="form-label">Amount To Be Paid</label>
                <input
                  type="text"
                  className="form-control"
                  value={amountToBePaid}
                  onChange={(e) => setAmountToBePaid(e.target.value)}
                />
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
    