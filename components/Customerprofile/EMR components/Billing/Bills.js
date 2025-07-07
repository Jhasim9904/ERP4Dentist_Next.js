import React from "react";
import "./Bills.css";
import { FaEdit } from "react-icons/fa";

const billData = [
  { billNo: 7, date: "2025-04-18", treatmentCost: 700, billAmount: 200, received: 200, balance: 500 },
  { billNo: 13, date: "2025-06-14", treatmentCost: 700, billAmount: 300, received: 100, balance: 400 },
  { billNo: 16, date: "2025-06-17", treatmentCost: 700, billAmount: 400, received: 100, balance: 400 },
  { billNo: 17, date: "2025-06-17", treatmentCost: 700, billAmount: 500, received: 100, balance: 300 },
  { billNo: 23, date: "2025-06-30", treatmentCost: 700, billAmount: 550, received: 50, balance: 250 },
  { billNo: 24, date: "2025-06-30", treatmentCost: 700, billAmount: 560, received: 10, balance: 240 },
];

const Bills = () => {
  return (
    <div className="bills-container">
      <div className="bill-summary-bar">
        <span>Total Estimated Plan Amount: ₹ 4200</span>
        <span>Total Confirmed Plan Amount: ₹ 4200</span>
      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Bill Date</th>
            <th>Treatment Cost</th>
            <th>Bill Amount</th>
            <th>Received Amount</th>
            <th>Balance Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {billData.map((item) => (
            <tr key={item.billNo}>
              <td>{item.billNo}</td>
              <td>{item.date}</td>
              <td>₹ {item.treatmentCost}</td>
              <td>₹ {item.billAmount}</td>
              <td>₹ {item.received}</td>
              <td>₹ {item.balance}</td>
              <td>
                <button className="edit-icon-btn">
                  <FaEdit />
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

export default Bills;
