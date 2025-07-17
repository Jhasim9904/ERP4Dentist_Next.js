// components\Customerprofile\EMR components\Billing\Receipts.js
import React from "react";
import "./Receipts.css";
import { FaRegFileAlt } from "react-icons/fa";

const Receipts = ({ data = [] }) => {
  return (
    <div className="receipts-container">
      <div className="receipt-summary-bar">
        <span>Total Estimated Plan Amount: ₹ {/* Optional Total */}</span>
        <span>Total Confirmed Plan Amount: ₹ {/* Optional Total */}</span>
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.getunibill_id}</td>
              <td>{item.reciept_date}</td>
              <td>{item.choose_doctor}</td>
              <td>{item.getunibill_id}</td>
              <td>{item.paymethod}</td>
              <td>₹ {item.getbalance_amt}</td>
              <td>
                <button className="receipt-view-btn">
                  <FaRegFileAlt /> View Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="entries-text">
        Showing 1 to {data.length} of {data.length} Entries →
      </p>
    </div>
  );
};

export default Receipts;
