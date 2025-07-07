import React from "react";
import "./Receipts.css";
import { FaRegFileAlt } from "react-icons/fa";

const receiptData = [
  { receiptNo: 7, date: "2025-04-18", doctor: "Giri", billNo: 7, paymentMode: "Phone pe", amount: 200 },
  { receiptNo: 13, date: "2025-06-14", doctor: "Dr.X", billNo: 13, paymentMode: "Cash", amount: 100 },
  { receiptNo: 16, date: "2025-06-25", doctor: "pooja", billNo: 16, paymentMode: "Cash", amount: 100 },
  { receiptNo: 17, date: "2025-06-30", doctor: "gandhi", billNo: 17, paymentMode: "Cash", amount: 100 },
  { receiptNo: 23, date: "2025-06-30", doctor: "gandhi", billNo: 23, paymentMode: "Cash", amount: 50 },
  { receiptNo: 24, date: "2025-06-30", doctor: "gandhi", billNo: 24, paymentMode: "Cash", amount: 10 },
];

const Receipts = () => {
  return (
    <div className="receipts-container">
      <div className="receipt-summary-bar">
        <span>Total Estimated Plan Amount: ₹ 4200</span>
        <span>Total Confirmed Plan Amount: ₹ 4200</span>
      </div>

      <table className="receipt-table">
        <thead>
          <tr>
            <th>Receipt No</th>
            <th>Receipt Date</th>
            <th>Doctor</th>
            <th>Bill No</th>
            <th>Payment Mode</th>
            <th>Receipt Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {receiptData.map((item) => (
            <tr key={item.receiptNo}>
              <td>{item.receiptNo}</td>
              <td>{item.date}</td>
              <td>{item.doctor}</td>
              <td>{item.billNo}</td>
              <td>{item.paymentMode}</td>
              <td>₹ {item.amount}</td>
              <td>
                <button className="receipt-view-btn">
                  <FaRegFileAlt /> View Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="entries-text">Showing 1 to 6 of 6 Entries →</p>
    </div>
  );
};

export default Receipts;
