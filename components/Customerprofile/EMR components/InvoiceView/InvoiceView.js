"use client";
import React, { useRef } from "react";
import styles from "./InvoiceView.module.css";

export default function InvoiceView() {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.invoiceContainer} ref={printRef}>
      <div className={styles.contentBlk}>
        {/* Header */}
        <header className={styles.clearfix}>
          <aside className={styles.clm}>
            <figure className={styles.logo}>
              <img src="/hospital_logo/1742551962.jpg" alt="Logo" style={{ width: "90px" }} />
            </figure>
          </aside>
          <aside className={styles.clm}>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <label className={styles.label}>Invoice Date & Time</label>: July 4, 2025, 3:39 PM
              </li>
            </ul>
          </aside>
        </header>

        {/* Patient + Clinic Info */}
        <div className={`${styles.patInfo} ${styles.clearfix}`}>
          <aside className={`${styles.clm} ${styles.clm1}`}>
            <h3 className={styles.h3}>Dental Invoice</h3>
            <h4 className={styles.h4}>newmedical Clinic</h4>
            <ul>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Doctor Name</label>
                <p className={styles.patientListItemText}>sabari</p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Address</label>
                <p className={styles.patientListItemText}>
                  23rd, Pattinathar Street, solainagar,<br />
                  Puducherry, Tamil Nadu, India, 605104
                </p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Phone</label>
                <p className={styles.patientListItemText}>8525939833</p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Clinic Branch</label>
                <p className={styles.patientListItemText}>Teynampet</p>
              </li>
            </ul>
          </aside>

          <aside className={`${styles.clm} ${styles.clm2}`}>
            <h3 className={styles.h3}>Patient Information</h3>
            <ul>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Name</label>
                <p className={styles.patientListItemText}>Choki dhani</p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Mobile</label>
                <p className={styles.patientListItemText}>8525939833</p>
              </li>
              <li className={styles.patientListItem}>
                <label className={styles.patientListItemLabel}>Address</label>
                <p className={styles.patientListItemText}>
                  47, varu village, Brahmnoli, tehsil, Maval,<br />
                  Pune, 411000
                </p>
              </li>
            </ul>
          </aside>
        </div>

        {/* Table */}
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
              <tr>
                <td className={`${styles.td} ${styles.textCenter}`}>1</td>
                <td className={styles.td}>2025-04-17 07:01:26</td>
                <td className={styles.td}>1</td>
                <td className={styles.td}>Braces Consulting</td>
                <td className={`${styles.td} ${styles.textCenter}`}>Adjustment</td>
                <td className={`${styles.td} ${styles.textCenter}`}>1P3</td>
                <td className={styles.td}>₹ 700</td>
              </tr>
              <tr>
                <td className={styles.td} colSpan="5">
                  <strong>Amount in Words:</strong> Seven hundred
                </td>
                <td className={styles.td}>Total:</td>
                <td className={styles.td}>₹ 700</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature */}
        <div className={`${styles.sig} ${styles.clearfix}`}>
          <p className={styles.signatureText}>Authorized Signature</p>
        </div>

        {/* Buttons inside invoice */}
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
