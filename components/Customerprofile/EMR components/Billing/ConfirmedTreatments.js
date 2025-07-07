import React, { useState } from "react";
import "./ConfirmedTreatments.css";
import { FaEdit } from "react-icons/fa";

const ConfirmedTreatments = () => {
  const [selectedTab, setSelectedTab] = useState("confirmed");

  const data = [
    {
      planNo: 1,
      planDate: "2025-04-17",
      toothNumbers: "18, 17, 16, 42",
      procedureType: "Braces Consulting",
      cost: 700,
      discount: 100,
      treatmentCost: 700,
      invoicedAmount: 560,
      balanceAmount: 240,
      confirmed: true,
    },
  ];

  return (
    <div className="confirmed-container">
              <div className="summary-bar">
        <span>Total Treatment Cost: ₹ 700</span>
        <span>Balance Advance Amount: ₹ 560</span>
        <span>Total Invoiced Treatment Amount: ₹ 560</span>
        <span>Total Balance Treatment Amount: ₹ 240</span>
      </div>
      <table className="treatment-table">
        <thead>
          <tr>
            <th>Plan No</th>
            <th>Plan Date</th>
            <th>Tooth Number</th>
            <th>Procedure & Type</th>
            <th>Cost</th>
            <th>Discount</th>
            <th>Treatment Cost</th>
            <th>Invoiced Amount</th>
            <th>Balance Amount</th>
            <th>Confirmed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.planNo}>
              <td>{item.planNo}</td>
              <td>{item.planDate}</td>
              <td>{item.toothNumbers}</td>
              <td>{item.procedureType}</td>
              <td>₹ {item.cost}</td>
              <td>₹ {item.discount}</td>
              <td>₹ {item.treatmentCost}</td>
              <td>₹ {item.invoicedAmount}</td>
              <td>₹ {item.balanceAmount}</td>
              <td>
                <input type="checkbox" checked={item.confirmed} readOnly />
              </td>
              <td>
                <button className="edit-btn">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="entries-text">Showing 1 to 1 of 1 Entries →</p>
    </div>
  );
};

export default ConfirmedTreatments;
