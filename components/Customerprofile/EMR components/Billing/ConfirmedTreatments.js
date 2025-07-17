"use client";
import React, { useState } from "react";
import "./ConfirmedTreatments.css";
import { FaEdit } from "react-icons/fa";
import CreateBillModal from "@/components/PopupModals/CreateBillModal/CreateBillModal";

const ConfirmedTreatments = ({ data = [] }) => {
  const [showModal, setShowModal] = useState(false);

  const getSelectedTeeth = (entry) => {
    return Object.keys(entry)
      .filter((key) => key.startsWith("teeth_") && entry[key] === 1)
      .map((key) => key.replace("teeth_", ""));
  };

  const totalCost = data.reduce((sum, item) => sum + Number(item.price_proce || 0), 0);
  const totalInvoiced = data.reduce((sum, item) => sum + Number(item.invoice_amt || 0), 0);
  const totalBalance = data.reduce((sum, item) => sum + Number(item.balance_amt || 0), 0);

  return (
    <div className="confirmed-container">
      <div className="summary-bar">
        <span>Total Treatment Cost: ₹ {totalCost}</span>
        <span>Balance Advance Amount: ₹ {totalInvoiced}</span>
        <span>Total Invoiced Treatment Amount: ₹ {totalInvoiced}</span>
        <span>Total Balance Treatment Amount: ₹ {totalBalance}</span>
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
          {data.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                No confirmed treatments found.
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const selectedTeeth = getSelectedTeeth(item).join(", ");
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.startDate}</td>
                  <td>{selectedTeeth}</td>
                  <td>{`${item.procedure} ${item.type || ""}`}</td>
                  <td>₹ {item.price_proce}</td>
                  <td>₹ {item.dicount}</td>
                  <td>₹ {item.price_proce}</td>
                  <td>₹ {item.invoice_amt}</td>
                  <td>₹ {item.balance_amt}</td>
                  <td>
                    <input type="checkbox" checked={item.planunibill === 1} readOnly />
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => setShowModal(true)}>
                      <FaEdit />
                    </button>
                    {showModal && (
                      <CreateBillModal onClose={() => setShowModal(false)} />
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <p className="entries-text">Showing {data.length} of {data.length} Entries →</p>
    </div>
  );
};

export default ConfirmedTreatments;
