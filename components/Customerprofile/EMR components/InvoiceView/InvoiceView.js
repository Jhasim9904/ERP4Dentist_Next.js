"use client";
import React, { useRef } from "react";
import styles from "./InvoiceView.module.css";

export default function InvoiceView({
  data = [],
  total = 0,
  patientinformations = [],
}) {
  console.log("✅ InvoiceView props:", { data, total, patientinformations }); // ❌ invalid here

  const printRef = useRef();
  const patient = patientinformations?.[0] || {};

  const handlePrint = () => {
    window.print();
  };

  const amountInWords = (num) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
    if (!num) return "0 rupees only";
    return `${formatter.format(num).replace("₹", "").trim()} rupees only`;
  };

  return (
    <div className={styles.invoiceContainer} ref={printRef}>
      <div className={styles.contentBlk}>
        {/* Header */}
        <header className={styles.clearfix}>
          <aside className={styles.clm}>
            <figure className={styles.logo}>
              <img
                src="/hospital_logo/1742551962.jpg"
                alt="Logo"
                style={{ width: "90px" }}
              />
            </figure>
          </aside>
          <aside className={styles.clm}>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <label className={styles.label}>Invoice Date & Time</label>:{" "}
                {new Date().toLocaleString()}
              </li>
            </ul>
          </aside>
        </header>

        {/* Clinic + Patient Info */}
        <div className={`${styles.patInfo} ${styles.clearfix}`}>
          {/* Clinic Info */}
          <aside className={`${styles.clm} ${styles.clm1}`}>
            <h3 className={styles.h3}>Dental Invoice</h3>
            <h4 className={styles.h4}>newmedical Clinic</h4>
            <ul>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>
                  Doctor Name
                </label>
                <p className={styles.patientListItemText}>
                  {data?.[0]?.doctor || "—"}
                </p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Address</label>
                <p className={styles.patientListItemText}>
                  23rd, Pattinathar Street, solainagar,
                  <br />
                  Puducherry, Tamil Nadu, India, 605104
                </p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Phone</label>
                <p className={styles.patientListItemText}>8525939833</p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>
                  Clinic Branch
                </label>
                <p className={styles.patientListItemText}>Teynampet</p>
              </li>
            </ul>
          </aside>

          {/* Patient Info */}
          <aside className={`${styles.clm} ${styles.clm2}`}>
            <h3 className={styles.h3}>Patient Information</h3>
            <ul>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Name</label>
                <p className={styles.patientListItemText}>
                  {`${patient.title || ""} ${patient.first_name || ""} ${
                    patient.second_name || ""
                  }`.trim() || "—"}
                </p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Mobile</label>
                <p className={styles.patientListItemText}>
                  {patient.contact || "—"}
                </p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Address</label>
                <p className={styles.patientListItemText}>
                  {[
                    patient.per_doorno,
                    patient.per_street,
                    patient.per_location,
                    patient.per_csc,
                    patient.per_pincode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </p>
              </li>
            </ul>
          </aside>
        </div>

        {/* Table of items */}
        <div className={`${styles.patInfo2} ${styles.clearfix}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={`${styles.th} ${styles.textCenter}`}>SI. No.</th>
                <th className={styles.th}>DATE & TIME</th>
                <th className={styles.th}>PLAN No.</th>
                <th className={styles.th}>PROCEDURE</th>
                <th className={styles.th}>TYPE</th>
                <th className={styles.th}>TRANSACTION ID.</th>
                <th className={styles.th}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td className={`${styles.td} ${styles.textCenter}`}>
                      {index + 1}
                    </td>
                    <td className={styles.td}>{item.created_at || "—"}</td>
                    <td className={styles.td}>{item.planunibill || "—"}</td>
                    <td className={styles.td}>{item.procedure || "—"}</td>
                    <td className={`${styles.td} ${styles.textCenter}`}>
                      {item.type || "—"}
                    </td>
                    <td className={`${styles.td} ${styles.textCenter}`}>
                      {item.cp_id || "—"}
                    </td>
                    <td className={styles.td}>₹ {item.invoice_amt || "0"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className={styles.td}
                    colSpan="7"
                    style={{ textAlign: "center" }}
                  >
                    No invoice data found.
                  </td>
                </tr>
              )}

              {/* total row */}
              <tr>
                <td className={styles.td} colSpan="5">
                  <strong>Amount in Words:</strong> {amountInWords(total)}
                </td>
                <td className={styles.td}>Total:</td>
                <td className={styles.td}>₹ {total || "0"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature */}
        <div className={`${styles.sig} ${styles.clearfix}`}>
          <p className={styles.signatureText}>Authorized Signature</p>
        </div>

        {/* Buttons */}
        <div className={`${styles.buttonRow} ${styles.noPrint}`}>
          <div className={styles.leftBtn}>
            <button className={styles.actionBtn}>
              <i className="fa-solid fa-reply"></i>
              <span>Send Whatsapp</span>
            </button>
          </div>
          <div className={styles.rightBtn}>
            <button onClick={handlePrint} className={styles.actionBtn}>
              <i className="fa-solid fa-print"></i>
              <span>Way To Print</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Thank you for your payment and for choosing newmedical Clinic!
          </p>
          <div className={styles.pageNo}>Page 1 of 1</div>
        </footer>
      </div>
    </div>
  );
}
